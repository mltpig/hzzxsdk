namespace hzzxsdk.c {
  export class AdHelper {
    private static adConfPromise: Promise<any>;
    private static readonly AD_TYPE_RECOMMED: number = 1;
    private static readonly AD_TYPE_ICON: number = 2;
    private static readonly AD_TYPE_REWARDED: number = 3;
    private static readonly AD_TYPE_BANNER: number = 4;

    private static readonly AD_TYPE_KEY_RECOMMED = "RECOMMED";
    private static readonly AD_TYPE_KEY_ICON = "ICON";
    private static readonly AD_TYPE_KEY_REWARDED = "REWARDED";
    private static readonly AD_TYPE_KEY_BANNER = "BANNER";

    private static iconDataList: IAd[];
    private static recommedDataList: IAd[];
    private static rewardDataList: IAd[];
    private static bannerDataList: IAd[];
    private static mFilterData: any;

    public static getRecommedList(isRandomSort = false, count = 0, score = 0): Promise<IAd[]> {
      return this.getAdList(isRandomSort, count, score, this.AD_TYPE_KEY_RECOMMED);
    }

    public static getBannerList(isRandomSort = false, count = 0, score = 0): Promise<IAd[]> {
      return this.getAdList(isRandomSort, count, score, this.AD_TYPE_KEY_BANNER);
    }

    public static getRewardedList(isRandomSort = false, count = 0, score = 0): Promise<IAd[]> {
      return this.getAdList(isRandomSort, count, score, this.AD_TYPE_KEY_REWARDED);
    }

    public static getIconAd(score = 0): Promise<IAd> {
      return new Promise((resolve, reject) => {

        let dataList = this.iconDataList;

        if (dataList == null || dataList == undefined || !dataList.length) {
          CommHelper.log('get icon ad , No qualified ad item.');
          resolve();
          return;
        }

        this.handleResCache(dataList).then(cacheDataList => {
          let ad: IAd = CommHelper.roundTableSort(cacheDataList, 'table');
          ReportHelper.batchShowEvent([ad]);
          resolve(ad);
        });
      });
    }

    public static preLoadAdData(): void {
      this.loadAdConfData();
    }

    public static loadAdConfData(): Promise<IAd[]> {
      if (this.adConfPromise) {
        return this.adConfPromise;
      }
      this.adConfPromise = new Promise((resolve, reject) => {
        let localAdList = BasePlat.instance.findStorageByKey('hzzxAdConfData') || [];
        this.checkAdConfVersion().then(currVer => {
          if (currVer) {
            this.fetchAdConfByVersion(currVer).then(adList => {
              if (adList) {
                this.fixAdData(adList);
                resolve(adList);
                BasePlat.instance.putStorage('hzzxAdConfVersion', currVer);
                BasePlat.instance.putStorage('hzzxAdConfData', adList);
                CommHelper.log('update ad config data success.',adList);
                return;
              }
            });
          }
          this.fixAdData(localAdList);
          resolve(localAdList);
        });
      });
      return this.adConfPromise;
    }
    // https://cdnht.tianjinyuren.cn/cdn/conf/1159/v.conf
    private static checkAdConfVersion(): Promise<any> {
      return new Promise((resolve, reject) => {
        let url = Global.server_res + '/cdn/conf/' + Global.appResPath + '/v.conf';
        let ver = undefined;
        BasePlat.instance.httpRequest(url).then(res => {
          let localVer = BasePlat.instance.findStorageByKey('hzzxAdConfVersion');
          CommHelper.log('check ad config version: res=' , res);
          if (typeof res != 'object') {
            CommHelper.log('check ad config version fail.');
          } else if (localVer == res.ver) {
            CommHelper.log('check ad config version success, update=false. localVer=' + localVer + '; currVer=' + res.ver);
          } else {
            ver = res.ver;
            CommHelper.log('check ad config version success, update=true. localVer=' + localVer + '; currVer=' + res.ver);
          }
          resolve(ver);
        }).catch(res => {
          CommHelper.log('check ad config version error. ' , res);
          resolve(ver);
        });
      });
    }

    private static fetchAdConfByVersion(ver: string): Promise<IAd[]> {
      return new Promise((resolve, reject) => {
        let url = Global.server_res + '/cdn/conf/' + Global.appResPath + '/' + ver;
        BasePlat.instance.httpRequest(url).then(res => {
          if (typeof res != 'object') {
            CommHelper.log('fetch ad conf fail. res=', res);
            resolve();
            return;
          }
          resolve(res);
          CommHelper.log('fetch ad conf success. len=' + res.length);
        }).catch(err => {
          CommHelper.log('fetch ad conf error. ' , err);
          resolve();
        });
      });
    }

    private static fixAdData(dataList: IAd[]): Promise<void> {
      return new Promise((resolve, reject) => {
        Promise.all([GameConfigHelper.getGameVerContrLevel(''), this.loadFilterData()])
          .then(([verContrData, filterData]) => {
            this.mFilterData = filterData;

            let iterationList: IAd[] = JSON.parse(JSON.stringify(dataList));
            for (let ad of iterationList) {
              //修复数据
              this.reviseAd(ad, this.mFilterData.gender);
              //分类别
              this.classifyAd(ad, filterData, verContrData);
            }
            resolve();
          }).catch((res) => {
            resolve();
          });
      });
    }

    private static classifyAd(ad: IAd, filterData: { os: string, gender: number }, verContrData: IVerContrLevel) {
      if (ad.platform && filterData.os && ad.platform != filterData.os && filterData.os != 'devtools') {
        return;
      } else if (ad.sex && ad.sex != 3 && ad.sex != filterData.gender) {
        return;
      }
      if (this.isCityInvisible(verContrData, ad.city_hide)) {
        CommHelper.log('check city hide：', ad.city_hide, ' ; id:', ad.id);
        return;
      }

      if (!this.isCityVisible(verContrData, ad.city_show)) {
        CommHelper.log('check city show：', ad.city_show, ' ; id:', ad.id);
        return;
      }
      if (ad.category == this.AD_TYPE_ICON) {
        if(!this.iconDataList){
          this.iconDataList = [];
        }
        this.iconDataList.push(ad);
      } else if (ad.category == this.AD_TYPE_REWARDED) {
        if(!this.rewardDataList){
          this.rewardDataList = [];
        }
        this.rewardDataList.push(ad);
      } else if (ad.category == this.AD_TYPE_BANNER) {
        if(!this.bannerDataList){
          this.bannerDataList = [];
        }
        this.bannerDataList.push(ad);
      } else if (ad.category == this.AD_TYPE_RECOMMED) {
        if(!this.recommedDataList){
          this.recommedDataList = [];
        }
        this.recommedDataList.push(ad);
      }
    }

    private static reviseAd(ad: IAd, gender: number): IAd {
    
      if (!ad.start_time || !ad.end_time || !ad.plan_number) {
        ad.page += ad.page.indexOf('?') == -1 ? '?' : '&';
        ad.page += 't=inner&a=' + ad.id + '&gender=' + gender + '&pid=' + Global.pid;
      }
    
      let bridge_appid = CommHelper.getHttpQueryValueByKey(ad.page, 'bridge_appid');
      let bridge_path = CommHelper.getHttpQueryValueByKey(ad.page, 'bridge_path');
      if (bridge_appid) {
        ad.page = bridge_path + '?' + ad.page
          .replace('bridge_appid=' + bridge_appid, 'bridge2appid=' + ad.appid)
          .replace('bridge_path=' + bridge_path, 'bridge2path=' + ad.page.split('?')[0])
          .split('?')[1];
        ad.appid = bridge_appid;
      }
      
      if (ad.ad_image && ad.ad_image.indexOf('http') != 0) {
        ad.ad_image = Global.server_res + '/cdn/images/' + ad.ad_image;
      }
      if (ad.icon && ad.icon.indexOf('http') != 0) {
        ad.icon = Global.server_res + '/cdn/images/' + ad.icon;
      }
      if (ad.image && ad.image.indexOf('http') != 0) {
        ad.image = Global.server_res + '/cdn/images/' + ad.image;
      }
      if (ad.banner && ad.banner.indexOf('http') != 0) {
        ad.banner = Global.server_res + '/cdn/images/' + ad.banner;
      }

      ad.clicked = !this.checkFirstClick(Number(ad.id));
      if (ad.clicked) {
        ad.table = Number(ad.table) / 2;
      }
      return ad;
    }

    /**
     * gender: -1=不限制性别|1=男|2=女|0=未知
     */
    private static loadFilterData(): Promise<{ os: string, gender: number }> {
      return new Promise((resolve, reject) => {
        BasePlat.instance.getUserInfo().then(userInfo => {
          resolve({
            os: BasePlat.instance.getSystemInfo().platform,
            gender: Number(userInfo.gender)
          });
        }).catch(() => {
          resolve({
            os: BasePlat.instance.getSystemInfo().platform,
            gender: -1
          });
        });
      });
    }

    

    /**
     * 获取AD列表
     * @param isRandomSort 是否使用权重算法排序后返回，否则按后台配置原样返回。默认为false,即按后台配置原样返回。
     * @param count 返回数量，如果全部返回可设置为0.默认全部返回
     * @param score 根据需要传入当前玩家的等级|分数|游戏时长等数值
     * @param adType 
     * @returns 
     */
    private static getAdList(isRandomSort = false, count = 0, score = 0, adType = ''): Promise<IAd[]> {
      return new Promise((resolve, reject) => {
        let dataList = this.recommedDataList;
        if (adType == this.AD_TYPE_KEY_REWARDED) {
          dataList = this.rewardDataList;
        } else if (adType == this.AD_TYPE_KEY_ICON) {
          dataList = this.iconDataList;
        } else if (adType == this.AD_TYPE_KEY_RECOMMED) {
          dataList = this.recommedDataList;
        } else if (adType == this.AD_TYPE_KEY_BANNER) {
          dataList = this.bannerDataList;
        }
        
        if (dataList == null || dataList == undefined || !dataList.length) {
          CommHelper.log('get ad list, No qualified ad item, ad list is null. adType = ' + adType);
          resolve();
          return;
        }

        this.handleResCache(dataList).then(cacheDataList => {
          let adList = isRandomSort ? CommHelper.roundTableSort(cacheDataList, 'table', false) :cacheDataList ;
          if (count) {
            adList = adList.slice(0, count);
          }
          ReportHelper.batchShowEvent(adList);
          resolve(adList);
          CommHelper.log('get ad list, adType=',adType,' , data list = ' ,adList);
        });
      });
    }

    private static isCityVisible(verContrData: IVerContrLevel, city?: string): boolean {
      const currProvince:any = verContrData.province;
      const currentCity:any = verContrData.city;
      return (!city || city == 'all') && !CommHelper.isAbroadCity(verContrData)
        || city && currentCity && city.indexOf(currentCity) != -1
        || city && currProvince && city.indexOf(currProvince) != -1;
    }

    private static isCityInvisible(verContrData: IVerContrLevel, city?: string): boolean {   
      const currProvince:any = verContrData.province;
      const currCity:any = verContrData.city;

      return city == 'all'
        || CommHelper.isAbroadCity(verContrData)
        || city && currCity && city.indexOf(currCity) != -1
        || city && currProvince && city.indexOf(currProvince) != -1;
    }

    private static async handleResCache(adList: IAd[], isForceCheck = false): Promise<IAd[]> {
      if (!adList) {
        return adList;
      }
      let len = adList.length;
      for (let i = 0; i < len; i++) {
        let ad = adList[i];
        this.handleResCacheByKey('ad_image', ad, isForceCheck);
        this.handleResCacheByKey('icon', ad, isForceCheck);
        this.handleResCacheByKey('image', ad, isForceCheck);
        this.handleResCacheByKey('banner', ad, isForceCheck);
      }
      return adList;
    }

    private static async handleResCacheByKey(key: string, ad: IAd, isForceCheck = false): Promise<IAd> {
      let targetValue = ad[key];
      if (targetValue && targetValue.indexOf("://usr/hzzxsdk/") == -1) {
        if (isForceCheck) {
          ad[key] = await BasePlat.instance.getLocalCacheResUrl(targetValue, false);
        } else {
          ad[key] = CommHelper.getResFromMemoryCache(targetValue);
          if (!ad[key]) {
            ad[key] = targetValue;
            BasePlat.instance.getLocalCacheResUrl(ad[key], false);
          }
        }
      }
      return ad;
    }

    /**
     * 点击广告并跳转
     * @param ad 广告数据
     * @param sceneCode 点击广告的位置
     * @returns Promise<{navigateTo:true,firstClick:true}>
     */
    public static clickAndNavigate(ad: IAd, sceneCode = 0): Promise<any> {
      return new Promise((resolve, reject) => {
        wx.getNetworkType({
          success: (res: any) => {
            if (res.networkType == 'none') {
              wx.showToast({ title: 'network error,navigate to app fail.', icon: 'none' });
              resolve({ navigateTo: false, firstClick: false });
              return;
            }

            ReportHelper.clickEvent(ad, sceneCode);
            BasePlat.instance.navigateTo(ad).then(res => {
              let isFristClick = this.checkFirstClick(Number(ad.id), true);
              resolve({ navigateTo: true, firstClick: isFristClick });
              ReportHelper.adJumpEvent(ad, sceneCode)
            }).catch(res => {
              resolve({ navigateTo: false, firstClick: false });
            });
          },
          fail: () => {
            resolve({ navigateTo: false, firstClick: false });
          }
        });
      });
    }

    private static checkFirstClick(adId: number, isSave = false): boolean {
      let isFirstClick = false;
      let localClickRecord: number[] = BasePlat.instance.findStorageByKey('hzzxadClick') || [];
      if (localClickRecord.indexOf(adId) == -1) {
        isFirstClick = true;
        if (isSave) {
          localClickRecord.push(adId);
          BasePlat.instance.putStorage('hzzxadClick', localClickRecord);
        }
      }
      return isFirstClick;
    }

  }
}