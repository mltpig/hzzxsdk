namespace hzzxsdk.c {
  export class GameConfigHelper {

    private static gameConfigPromise: Promise<any>;
    private static gameVerContrPromise: Promise<any>;

    public static gameVerContrData: IVerContrLevel;

    public static getGameConfig(pid?: string): Promise<any> {
      return new Promise((resolve, reject) => {
        pid = pid || Global.pid;
        if (!pid) {
          CommHelper.log('fetch game config fail. pid is null.）');
          resolve();
          return;
        }

        if (!this.gameConfigPromise) {
          let url = Global.server_login + '/conf/pull.do?product_id=' + pid;
          this.gameConfigPromise = BasePlat.instance.httpRequest(url);
        }
        this.gameConfigPromise.then(res => {
          if (200 == res.code && res.result && (typeof res.result == 'object')) {
            CommHelper.log('fetch game config success. res=',res.result);
            resolve(res.result);
          } else {
            CommHelper.log('fetch game config fail. res=', res);
            resolve();
          }
        }).catch((err) => {
          CommHelper.log('fetch game config error.', err);
          resolve();
        });
      });
    }

    /**
     * 获取版本控制等级
     * 
     * @param codeVersion 程序代码版本
     * @param pid 
     * @returns 
     */
    public static getGameVerContrLevel(codeVersion: string, pid?: string): Promise<IVerContrLevel> {
      return new Promise<IVerContrLevel>((resolve, reject) => {
        Global.appCodeVersion = codeVersion ? codeVersion : "";
        pid = pid || Global.pid;
        let data = {
          check: 1
        }
        if (!pid) {
          CommHelper.log('fetch game version controller level fail. pid is null.');

          resolve(data);
          if (codeVersion) {
            this.gameVerContrData = data;
          }
        } else {
          if (!this.gameVerContrPromise) {
            let url = Global.server_login + '/server/shield.do?product_id=' + pid + '&ver=' + codeVersion;
            this.gameVerContrPromise = BasePlat.instance.httpRequest(url);
          }

          this.gameVerContrPromise.then(res => {
            if (200 == res.code && res.result && (typeof res.result == 'object')) {
              CommHelper.log('fetch game version controller level success. res=' , res.result);
              data = res.result;
              resolve(res.result);
            } else {
              CommHelper.log('fetch game version controller level fail. res=' , res);
              resolve({ check: 1 });
            }
            if (codeVersion) {
              this.gameVerContrData = data;
            }

          }).catch((err) => {
            CommHelper.log('fetch game version controller level error.' , err);
            resolve(data);
            if (codeVersion) {
              this.gameVerContrData = data;
            }
          });
        }
      });
    }

    /**
     * 检查裂变--分享或者视频
     * @returns true=可以强裂变，false=不可以强裂变
     */
    public static checkFission(): boolean {
      let sceneArray = [1031, 1032, 1042, 1011, 1012, 1013, 1017, 1047, 1049, 1053, 1054, 1084, 1106, 2001, 2970, 1000, 1005, 1006, 1025, 1027, 1030];
      if (!this.checkCurrentScene(sceneArray)) {
        return false;
      }
      return this.checkHistoryScene(sceneArray);
    }

    private static checkHistoryScene(sceneArray) {
      let historyScene = UserHelper.getUser().channel_id ? Number(UserHelper.getUser().channel_id) : 0;

      if (1048 == historyScene) {
        CommHelper.log('check history scene , fission1=false , history scene = ' + historyScene);
        return false;
      }

      let isHistoryFission = sceneArray.indexOf(historyScene) == -1
      CommHelper.log('check history scene , fission2=', isHistoryFission, ', history scene = ' + historyScene);
      return isHistoryFission;
    }

    private static checkCurrentScene(sceneArray): boolean {
      // small program assistant APPID
      const spaAppId = 'wxcff7381e631cf54e';
      if (Global.enterOptions && Global.enterOptions.scene == '1037' && Global.enterOptions.referrerInfo && spaAppId == Global.enterOptions.referrerInfo.appId) {
        CommHelper.log('check current scene , fission1=false');
        return false;
      }

      if (Global.enterOptions && 1048 == Global.enterOptions.scene && (!Global.enterOptions.query || !Global.enterOptions.query.type)) {
        CommHelper.log('check current scene , fission2=false , current scene = ' + Global.enterOptions.scene);
        return false;
      }

      // 1027,1053,1084,2001,2970

      let isLoaclFission = sceneArray.indexOf(Global.enterOptions.scene) == -1;
      if (!isLoaclFission) {
        CommHelper.log('check current scene , fission3=false , current scene = ' + Global.enterOptions.scene);
        return false;
      }

      return true;
    }

  }
}