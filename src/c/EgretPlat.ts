namespace hzzxsdk.c {
  export class EgretPlat implements IPlat {
    public findStorageByKey(key: string): any {
      try {
        let data = egret.localStorage.getItem(Global.storagePrefix + key);
        return data ? JSON.parse(data) : '';
      } catch (e) {
        return '';
      }
    };

    public putStorage(key: string, data: any): void {
      egret.localStorage.setItem(Global.storagePrefix + key, JSON.stringify(data));
    };

    public httpRequest(url: string, params?: any, method = 'get', retryTimes = 2): Promise<any> {
      let requestParams = '';
      if (params) {
        for (let key in params) {
          requestParams += key + '=' + params[key] + '&';
        }
        if (requestParams) {
          requestParams = requestParams.substr(0, requestParams.length - 1);
          if (method == 'get') {
            url += url.indexOf('?') == -1 ? '?' : '&'
            url += requestParams;
          }
        }
      }
      return new Promise((resolve, reject) => {
        let responseHandler = function (event: any) {
          let response = event.currentTarget.response;
          try {
            resolve(JSON.parse(response));
          } catch (e) {
            resolve(response);
          }
        };
        let errorHandler = function (event: any) {
         
        };
        let request = new egret.HttpRequest();
        request.once(egret.Event.COMPLETE, responseHandler, null);
        request.once(egret.IOErrorEvent.IO_ERROR, errorHandler, null);
        if (method == 'get') {
          request.open(url, egret.HttpMethod.GET);
          request.send();
        } else {
          request.open(url, egret.HttpMethod.POST);
          request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
          request.send(requestParams);
        }
      });
    }

    public getUser(enterOptions: IEnterOptions): Promise<IUser> {
      return new Promise((resolve,reject)=>{
        resolve({ openid: 'debug-egret-user-openid' });
      });
    }

    public async getUserInfo(): Promise<IUserInfo> {
      return { nickName: "debug-nick-name", avatarUrl: '', gender: -1 };
    }

    public getSystemInfo(): ISystemInfo {
      return { platform: egret.Capabilities.os,model:'' };
    }

    public getEnterOptions(): IEnterOptions {
      return { scene: 0, query: {} };
    }

    public async navigateTo(app: IAd) {
    }

    public async navigateToSync(app: IAd, launchToCallback: any) {
    }

    public getShareObject(shareInfo: IShareInputObject): any {
    }

    public getLocalCacheResUrl(targetUrl: string, waitDownloaded = false): Promise<string> {
      return Promise.resolve(targetUrl);
    }

    public setTimeout(callback: any, timeout: number): any {
      return setTimeout(callback, timeout);
    }

    public setInterval(callback: any, timeout: number): any {
      return setInterval(callback, timeout);
    }

    public clearTimeout(t: any): void {
      clearTimeout(t);
    }

    public clearInterval(t: any): void {
      clearInterval(t);
    }
    public preHandleInit() {
    }
  
  }
}