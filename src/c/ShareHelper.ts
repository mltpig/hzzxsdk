namespace hzzxsdk.c {
  export class ShareHelper {
    private static sharePicPromise: Promise<any>;
    private static sharePicConfig: ISharePicConfig[] = [];

    public static loadSharePicData(): Promise<any> {
      if (this.sharePicPromise) {
        return this.sharePicPromise;
      }
      this.sharePicPromise = new Promise((resolve, reject) => {
        this.sharePicConfig = BasePlat.instance.findStorageByKey(Global.sharePicDataKey) || [];
        let url = Global.server_res + '/cdn/conf/' + Global.appResPath + '/share_photo.conf';
        BasePlat.instance.httpRequest(url).then(res => {
          if (typeof res == 'object') {
            this.sharePicConfig = res;
            BasePlat.instance.putStorage(Global.sharePicDataKey, res);
            CommHelper.log('load share pic data success.');
          } else {
            CommHelper.log('load share pic data fail.', res);
          }
          resolve(this.sharePicConfig);
        }).catch(() => {
          resolve(this.sharePicConfig);
        });
      });
      return this.sharePicPromise;
    }

    /**
     * 随机获取分享图信息
     * @param defaultShareObj 默认分享对象，指定imageId=0或者服务器未配置时返回默认分享对象。
     * @returns 
     */
    public static getRandomShareObject(defaultShareObj: IShareInputObject): IShareInputObject {
      if (!this.sharePicConfig || !this.sharePicConfig.length || typeof this.sharePicConfig != 'object') {
        CommHelper.log('get share object fail. sharePicConfig is null or error.');
        return defaultShareObj;
      }

      if (defaultShareObj.imageId == 0) {
        CommHelper.log('get share object success. imageId=0.');
        return defaultShareObj;
      }

      if (defaultShareObj.imageId) {
        CommHelper.log('get share object , imageId=' + defaultShareObj.imageId);
        let shareImageInfo = this.findShareObjectByImageId(defaultShareObj);
        if (shareImageInfo) {
          return shareImageInfo;
        }
      }

      return this.findShareObjectByRandom(this.filterSecondary(defaultShareObj), defaultShareObj);
    }

    private static filterSecondary(defaultShareObj): any {

      const shareImageList = this.sharePicConfig.filter(item => {
        if (item.ver) {
          if (!defaultShareObj.version || item.ver != defaultShareObj.version) {
            return false;
          }
        } else {
          if (defaultShareObj.version) {
            return false;
          }
        }
        return this.filterOtherParam(item, defaultShareObj);

      }, this);

      let filterShareImageList = shareImageList;
      if (!shareImageList.length && defaultShareObj.version) {
        filterShareImageList = this.sharePicConfig.filter(item => {
          if (item.ver) {
            return false;
          }
          return this.filterOtherParam(item, defaultShareObj);
        }, this);

      }
      return filterShareImageList;
    }
    private static findShareObjectByRandom(filterShareImageList, defaultShareObj): any {

      if (!filterShareImageList || filterShareImageList.length == 0) {
        CommHelper.log('get share object1 : filter share image list is null');
        return defaultShareObj;
      }

      const shareImage: ISharePicConfig = CommHelper.roundTableSort(filterShareImageList, 'weight');
      if (!shareImage) {
        CommHelper.log('get share object3 : random share image is null');
        return defaultShareObj;
      }

      return this.getShareImageInfo(shareImage, defaultShareObj);
    }

    private static findShareObjectByImageId(defaultShareObj): any {
      let shareImage: ISharePicConfig | undefined;
      let len = this.sharePicConfig.length;
      for (let i = 0; i < len; i++) {
        if (this.sharePicConfig[i].pic_id == defaultShareObj.imageId) {
          shareImage = this.sharePicConfig[i];
          CommHelper.log('find share object imageId = ',defaultShareObj.imageId,' , shareImage = ',shareImage);
          break;
        }
      }
      return this.getShareImageInfo(shareImage, defaultShareObj);

    }

    private static getShareImageInfo(shareImage, defaultShareObj): any {
      if (!shareImage) {
        CommHelper.log('get share image info : share image is null.');
        return undefined;
      }
      const shareInfo = { ...defaultShareObj };
      shareInfo.title = (shareInfo.nickName ? shareImage.text.replace('{nickname}', shareInfo.nickName) : shareImage.text);
      shareInfo.imageUrl = shareImage.pic;
      shareInfo.imageId = shareImage.pic_id;
      delete shareInfo.nickName;
      delete shareInfo.scoreValue;

      // CommHelper.log('get share image info :', JSON.stringify(shareInfo));
      return shareInfo;
    }

    private static filterOtherParam(item: ISharePicConfig, defaultShareInfo): boolean {

      if (Number(item.shield) === 1 && !GameConfigHelper.checkFission()) {
        CommHelper.log('pic filter--shield=',item.shield,' , id=',item.pic_id);
        return false;
      }
      const currentScore = defaultShareInfo.scoreValue || 0;
      const limitScore: number = Number(item.number) || 0;
      if (currentScore < limitScore) {
        CommHelper.log('pic filter--number=',item.number,' , id=',item.pic_id);
        return false;
      }
      if (!this.checkMoreOpenPeriodLimit(item.time_show)) {
        CommHelper.log('pic filter--time_show=',item.time_show,' , id=',item.pic_id);
        return false;
      }

      if (!GameConfigHelper.gameVerContrData) {
        CommHelper.log('pic filter--version controller config is null',' , id=',item.pic_id);
        return true;
      }
      if (Number(item.shield) === 1 && Number(GameConfigHelper.gameVerContrData.check) === 1) {
        CommHelper.log('pic filter--shield=',item.shield,', version controller config check=1 , id=',item.pic_id);
        return false;
      }

      if (item.city) {
        const currentCity: any = GameConfigHelper.gameVerContrData.city;
        const currentProvince: any = GameConfigHelper.gameVerContrData.province;
        if (CommHelper.isAbroadCity(GameConfigHelper.gameVerContrData)) {
          CommHelper.log('pic filter--city=',item.city,', id=',item.pic_id);
          return false;
        }

        if (currentCity && item.city.indexOf(currentCity) != -1) {
          CommHelper.log('pic filter--city=',item.city,', current city=',currentCity,', id=',item.pic_id);
          return false;
        } else if (currentProvince && item.city.indexOf(currentProvince) != -1) {
          CommHelper.log('pic filter--city=',item.city,', current province=',currentProvince,', id=',item.pic_id);
          return false;
        }
      }
      return true;
    }

    private static checkMoreOpenPeriodLimit(showTimes: string): boolean {
      if (!showTimes) {
        return true;
      }

      let openTimesArray = showTimes.split(',');
      for (let i = 0; i < openTimesArray.length; i++) {
        if (this.checkOpenTimes(openTimesArray[i])) {
          return true;
        }
      }

      return false;
    }

    private static checkOpenTimes(showTime: string): boolean {
      let isTimeLimit = false;
      if (showTime) {
        const [timeStart, timeEnd] = showTime.indexOf('_') > 0 ? showTime.split('_', 2) : showTime.split('-', 2);
        const hour = new Date().getHours();
        if (parseInt(timeStart || '0') <= hour && hour <= parseInt(timeEnd || '24')) {
          isTimeLimit = true;
        }
      }
      return isTimeLimit;
    }

    /**
     * 生成小程序分享链接
     * @param sceneCode 分享点
     * @param path 小程序页面路径
     * @param query 其他自定义参数键值对
     * @param imgId iamgeid
     */
    public static genSharePath(sceneCode: number, path = '/pages/index/index', query?: Object, imgId?: string | number): string {
      return path + '?' + this.genShareQuery(sceneCode, query, imgId);
    }

    /**
     * 生成分享请求参数(形如a=b&c=d)
     * @param sceneCode 分享点序号
     * @param query 其他自定义参数键值对
     * @param imgId 
     */
    public static genShareQuery(sceneCode: number, query?: any, imgId?: string | number): string {
      if (typeof query != 'object') {
        query = {};
      }
      query['t'] = 'partake';
      query['sid'] = 'partake_' + Global.pid + '_' + sceneCode;
      query['uid'] = UserHelper.getUser().openid;
      query['partakeTime'] = new Date().getTime();
      if (imgId) { query['imgId'] = imgId; }

      return CommHelper.buildHttpQuery(query);
    }
  }
}