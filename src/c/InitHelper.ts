namespace hzzxsdk.c {
  export class InitHelper {
    private static preHandelInitParams(pid: string, isNeedUnionid: boolean = false): boolean {
      if (c.Global.isInit) {
        CommHelper.log('multiple init sdk.');
        return true;
      }
      Global.pid = pid;
      Global.appResPath = pid;
      Global.enterOptions = BasePlat.instance.getEnterOptions();
      c.Global.isNeedUnionid = isNeedUnionid;
      Global.isInit = true;
      CommHelper.log('sdk init begin, pid=', pid, 'enterOptions', JSON.stringify(Global.enterOptions));
      Global.totalCount = Number(c.BasePlat.instance.findStorageByKey(Global.totalKey) || 0);
      Global.gapCount = Number(c.BasePlat.instance.findStorageByKey(Global.gapKey) || 0);
      Global.lastAddUpDate = c.BasePlat.instance.findStorageByKey(Global.lastAddUpDataKey);
      c.CommHelper.resetTotalCount(c.Global.lastAddUpDate);
      c.BasePlat.instance.setInterval(c.ReportHelper.addUpGapOnlineTime, 1000);
      // 预加载配置
      c.ShareHelper.loadSharePicData();
      c.AdHelper.preLoadAdData();
      c.GameConfigHelper.getGameConfig();
      return false;
    }

    public static init(pid: string, isNeedUnionid: boolean = false): Promise<any> {

      if (c.InitHelper.preHandelInitParams(pid, isNeedUnionid)) {
        CommHelper.log('multiple init sdk.');
        return c.UserHelper.getUserAsyn().then(user => user.openid);
      }

      c.BasePlat.instance.preHandleInit();

      return new Promise((resolve, reject) => {
        c.BasePlat.instance.getUser(c.Global.enterOptions).then(user => {
          if (c.UserHelper.setUser(user)) {
            c.ReportHelper.appRunEvent(c.Global.enterOptions);
            CommHelper.log('init success. openid=' + user.openid);
            resolve(user.openid);
          } else {
            CommHelper.log('init fail.');
            reject();
          }
        }).catch(err => {
          CommHelper.log('init error.' , err);
          reject();
        });
      });
    }

    public static initWithThirdUser(pid: string, user: IUser) {
      if (c.InitHelper.preHandelInitParams(pid)) {
        CommHelper.log('multiple init sdk.');
        return c.UserHelper.getUserAsyn().then(user => user.openid);
      }

      c.BasePlat.instance.preHandleInit();

      return new Promise((resolve, reject) => {
        c.UserHelper.thirdLogin(user).then(resultUser => {
          c.ReportHelper.appRunEvent(c.Global.enterOptions);
          resolve(resultUser.openid);
          CommHelper.log('init with third user success. openid=' + resultUser.openid);
        }).catch((err) => {
          CommHelper.log('init with third user error.' , err);
          reject();
        });

        

      });
    }
  }
}