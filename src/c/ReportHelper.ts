namespace hzzxsdk.c {

  export class ReportHelper {
    /**
     * 自定义打点
     * @param id 
     * @param customParam1
     * @param customParam2
     */
    public static customEvent(id = 0, customParam1 = '', customParam2 = '') {
      if (!Global.isInit) {
        return;
      }
      UserHelper.getUserAsyn().then(account => {
        let data = {
          product_id: Global.pid,
          openid: account.openid,
          event_id: id,
          custom_param_1: encodeURIComponent(customParam1),
          custom_param_2: encodeURIComponent(customParam2)
        };
        BasePlat.instance.httpRequest(Global.server_report + '/log/event.do', data, 'post').then(res => {
          CommHelper.log('custom event report success. eventid:' + id);
        });
      }).catch((e) => {
        CommHelper.log('custom event report fail. eventid:' + id + ", err@" + e);
      });
    }

    /**
     * 分享进入事件
     * @param partakeId 分享ID
     * @param partakeUser 谁分享的
     * @param shareTicket 
     * @param customParam1 
     * @param customParam2 
     */
    private static partakeIntoEvent(partakeId: string | number, partakeUser: string, shareTicket: string, customParam1 = '', customParam2 = '') {
      if (!Global.isInit) {
        return;
      }
      UserHelper.getUserAsyn().then(user => {
        let uid = user.openid;
        let data = {
          product_id: Global.pid,
          openid: uid,
          from_id: partakeId,
          from_type: shareTicket ? 1 : 0,
          from_userid: partakeUser,
          custom_param_1: customParam1,
          custom_param_2: customParam2
        };
        BasePlat.instance.httpRequest(Global.server_report + '/log/partakeInto.do', data, 'post').then(res => {
          CommHelper.log('report partakeInto event success. partakeId=' + partakeId);
        });
      }).catch(() => {
        CommHelper.log('report partakeInto event fail. partakeId=' + partakeId);
      });
    }

    /**
     * 广告进入事件
     * page=/pages/index/index?type=link&adid=ad_${gameid}_${序号}
     * @param id 广告ID
     * @param appId enterOptions.referrerInfo.appId
     * @param param1 扩展参数
     */
    private static adIntoEvent(id: string | number, appId: string, param1 = '') {
      if (!Global.isInit) {
        return;
      }
      UserHelper.getUserAsyn().then(user => {
        let userid = user.openid;
        let data = {
          product_id: Global.pid,
          openid: userid,
          custom_ad_id: id,
          from_appid: appId
        };
        BasePlat.instance.httpRequest(Global.server_report + '/log/linkIn.do', data, 'post').then(res => {
          CommHelper.log('report ad into success. adid=' + id);
        });
      }).catch(() => {
        CommHelper.log('report ad into fail. adid=' + id);
      });
    }

    /**
     * 分享事件
     * @param sceneCode int 分享点场景编号
     * @param imgId 分享图ID
     * @param shareTicket 
     * @param customParam1 
     * @param customParam2 
     */
    public static partakeOutletEvent(sceneCode: number, imgId = '', shareTicket = '', customParam1 = '', customParam2 = ''): void {
      if (!Global.isInit) {
        return;
      }

      UserHelper.getUserAsyn().then(user => {
        let shareWordsId = 'share_' + Global.pid + '_' + sceneCode;
        let userid = user.openid;
        let data = {
          product_id: Global.pid,
          openid: userid,
          share_words_id: shareWordsId,
          share_photo_id: imgId,
          share_type: shareTicket,
          custom_param_1: customParam1,
          custom_param_2: customParam2
        };
        BasePlat.instance.httpRequest(Global.server_report + '/log/partakeOutlet.do', data, 'post').then((res) => {
          CommHelper.log('report PartakeOutlet event success. imageId=' + imgId);
        });
      }).catch(() => {
        CommHelper.log('report PartakeOutlet event fail. imageId=' + imgId);
      });
    }

    protected static lastAddUpTime: number = 0;
    private static MAX_DAY_TIME: number = 24 * 60 * 60;
    public static async addUpGapOnlineTime() {

      try {
        CommHelper.resetTotalCount(Global.lastAddUpDate);

        if (Global.totalCount >= this.MAX_DAY_TIME) {
          Global.totalCount = this.MAX_DAY_TIME - 1;
        }

        const totalTimeCount = Global.totalCount + 1;//累计时长
        const gapTimeCount = Global.gapCount + 1;//当前分段时长

        Global.totalCount = totalTimeCount;
        Global.gapCount = gapTimeCount;
        BasePlat.instance.putStorage(Global.totalKey, totalTimeCount, false);
        BasePlat.instance.putStorage(Global.gapKey, gapTimeCount, false);
        if (!Global.isInit) {
          return;
        }
        let d = new Date();
        if (d.getTime() - ReportHelper.lastAddUpTime < 59 * 1000) {
          return;
        }
        const quickReport = totalTimeCount < 5 * 60 && gapTimeCount > 60;
        const slowReport = totalTimeCount >= 5 * 60 && gapTimeCount > 5 * 60;

        if (!quickReport && !slowReport) {
          return;
        }

        ReportHelper.lastAddUpTime = d.getTime();
        BasePlat.instance.putStorage(Global.lastAddUpDataKey, Global.lastAddUpDate, false);

        const user = await UserHelper.getUserAsyn();

        let channelType = user.channel_type;
        let channelId = user.channel_id;
        let uid = user.openid;
        let unionid = user.unionid?user.unionid:'';
        let data = {
          product_id: Global.pid,
          openid: uid,
          unionid:unionid,
          channel_type:channelType,
          channel_id:channelId,
          total_time:gapTimeCount
        };
        Global.gapCount = 0;
        if (totalTimeCount <= 0 || Global.totalCount <= 0) {
          return;
        }
        BasePlat.instance.httpRequest(Global.server_report + '/log/onlineTime.do', data,'post').then((res: { totalTime: number, error: number }) => {
          BasePlat.instance.putStorage(Global.gapKey, 0, false);
          CommHelper.log('add up online time success.', 'gap time', gapTimeCount);

        }).catch(res => {
        });
      } catch (error) {
        CommHelper.log('add up online time error:', error);
      }
    }

    public static async addUpGapOnlineTimeOnHide() {
      try {
        CommHelper.resetTotalCount(Global.lastAddUpDate);
        if (Global.totalCount >= this.MAX_DAY_TIME) {
          Global.totalCount = this.MAX_DAY_TIME - 1;
        }

        const totalTimeCount = Global.totalCount;
        const gapTimeCount = Global.gapCount;

        if (totalTimeCount <= 0) {
          Global.totalCount = 0;
          return;
        }
        if (!Global.isInit) {
          return;
        }

        BasePlat.instance.putStorage('last_report_date', Global.lastAddUpDate, false);

        const user = await UserHelper.getUserAsyn();
        
        let channelType = user.channel_type;
        let channelId = user.channel_id;
        let uid = user.openid;
        let unionid = user.unionid?user.unionid:'';
        let data = {
          product_id: Global.pid,
          openid: uid,
          unionid:unionid,
          channel_type:channelType,
          channel_id:channelId,
          total_time:gapTimeCount
        };
        
        Global.gapCount = 0;
        BasePlat.instance.httpRequest(Global.server_report + '/log/onlineTime.do', data,'post').then((res: { totalTime: number, error: number }) => {
          BasePlat.instance.putStorage(Global.gapKey, 0, false);
          CommHelper.log('add up online time(hide) success.', 'gap time', gapTimeCount);

        }).catch(res => {
        });
      } catch (error) {
        CommHelper.log('add up online time(hide). error:', error);
      }
    }

    /**
     * 热启动事件
     * @param enterOptions 
     */
    public static hotLaunchEvent(enterOptions: IEnterOptions) {
      if (!Global.isInit || !enterOptions) {
        return;
      }
      Promise.all([UserHelper.getUserAsyn(), GameConfigHelper.getGameVerContrLevel('')]).then(([user, verContrData]) => {
        let currentIp = verContrData && verContrData.ip ? verContrData.ip : "";
        let accountSource = CommHelper.parseUserChannel(enterOptions);
        let channelType = accountSource.channelType;
        let channelId = accountSource.channelId;
        let systemInfo = BasePlat.instance.getSystemInfo();
        let model = systemInfo.model ? systemInfo.model : '';
        let uid = user.openid;
        let unionid = user.unionid?user.unionid:'';
        let data = {
          product_id: Global.pid,
          openid: uid,
          unionid: unionid,
          channel_type: channelType, 
          channel_id: channelId, 
          ip: currentIp,
          model: encodeURIComponent(model),
          behavior_id: 1
        };

        BasePlat.instance.httpRequest(Global.server_report + '/log/login.do', data,'post').then(res => {
          CommHelper.log('hot run event success');
        });

      }).catch((e) => {
        CommHelper.log('hot run event error. ', e);
      });
    }



    /**
     * 视频播放和点击次数
     * 视频播放结束上报
     * @param isClick 有点击视频=true|无点击=false
     */
    public static videoShowAndClickCountEvent(isClick = false) {
      if (!Global.isInit) {
        return;
      }
      UserHelper.getUserAsyn().then(user => {
        let channelType = user.channel_type;
        let channelId = user.channel_id;
        let uid = user.openid;
        let unionid = user.unionid?user.unionid:'';
        let data = {
          product_id: Global.pid,
          openid: uid,
          unionid:unionid,
          channel_type:channelType,
          channel_id:channelId,
          total_count:1,
          total_click_count: isClick ? 1 : 0
        };
        BasePlat.instance.httpRequest(Global.server_report + '/log/videoCount.do', data,'post').then(res => {
          CommHelper.log('video end event success.');
        });
      }).catch((err) => {
        CommHelper.log('video end event error.'+err);
      });
    }

    public static batchShowEvent(adList: IAd[]): void {
      if (!Global.isInit) {
        return;
      }

      UserHelper.getUserAsyn().then(user => {
        let openid = user.openid;
        //构造批量数据
        let productIds: string[] = [], adIds: string[] = [], customParams: string[] = [];
        for (let ad of adList) {
          productIds[productIds.length] = ad.pid;
          adIds[adIds.length] = ad.id;
          customParams[customParams.length] = ad.category.toString();
        }
        let data = {
          product_id: Global.pid,
          openid: openid,
          spread_game_id: productIds.join(','),
          custom_ad_id: adIds.join(','),
          custom_param_1: customParams.join(','),
        };

        BasePlat.instance.httpRequest(Global.server_report + '/log/spread.do', data, 'post').then(res => {
          CommHelper.log('report batch show event success. adIds=' + adIds);
        });
      }).catch(() => {
        CommHelper.log('report batch show event error');
      });
    }

    /**
     * 上报AD点击事件
     * @param ad 广告数据
     * @param sceneCode 点击广告的位置(cp自定)
     */
    public static clickEvent(ad: IAd, sceneCode = 0): void {
      if (!Global.isInit) {
        return;
      }
      let adid = ad.id;
      let pid = ad.pid;
      UserHelper.getUserAsyn().then(user => {
        let openid = user.openid;
        let data = {
          product_id: Global.pid,
          openid: openid,
          target_to_product_id: pid,
          custom_ad_id: adid,
          custom_param_1: sceneCode
        };
        BasePlat.instance.httpRequest(Global.server_report + '/log/linkEvent.do', data,'post').then(res => {
          CommHelper.log('report ad click event success . adid = ' + adid);
        });
      }).catch(() => {
        CommHelper.log('report ad click event error. adid=' + adid);
      });
    }

    /**
     * 上报AD跳转事件
     * @param ad 广告数据
     * @param sceneCode 点击广告的位置(cp自定)
     */
    public static adJumpEvent(ad: IAd, sceneCode = 0): void {
      if (!Global.isInit) {
        return;
      }
      let pid = ad.pid;
      let adid = ad.id;
      UserHelper.getUserAsyn().then(user => {
        let openid = user.openid;
        let data = {
          product_id: Global.pid,
          openid: openid,
          leapt_to_game_id: pid,
          custom_ad_id: adid,
          custom_param_1: sceneCode
        };
        BasePlat.instance.httpRequest(Global.server_report + '/log/leapt.do', data, 'post').then(res => {
          CommHelper.log('report ad jump event success. adid=' + adid);
        });
      }).catch(() => {
        CommHelper.log('report ad jump event error. adid=' + adid);
      });
    }

    /**
     * 启动事件
     * @param enterOptions 启动参数
     */
     public static appRunEvent(enterOptions: IEnterOptions) {
      if (enterOptions.query.t == 'partake') { //t=partake&sid=&uid=&imgId=&partakeTime=
        this.partakeIntoEvent(enterOptions.query.sid, enterOptions.query.uid, enterOptions.shareTicket || '', enterOptions.query.imgId || '', enterOptions.query.partakeTime || '');
      } else if (enterOptions.query.t) {//t=inner&a=adid    t=ad&a=adid  
        this.adIntoEvent(enterOptions.query.a, enterOptions.referrerInfo ? enterOptions.referrerInfo.appId : '');
      }
    }
  }
}