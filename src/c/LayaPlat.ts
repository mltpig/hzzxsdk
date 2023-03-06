namespace hzzxsdk.c {
  export class LayaPlat implements IPlat {
    public findStorageByKey(key: string): any {
      try {
        let data = window.localStorage.getItem(Global.storagePrefix + key);
        return data ? JSON.parse(data) : '';
      } catch (e) {
        return '';
      }
    }

    public putStorage(key: string, data: any): void {
      window.localStorage.setItem(Global.storagePrefix + key, JSON.stringify(data));
    }

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
        let responseHandler = function (data: any) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            resolve(data);
          }
        };
        let errorHandler = function (event: any) {

        };
        let xhr: Laya.HttpRequest = new Laya.HttpRequest();
        xhr.once(Laya.Event.COMPLETE, this, responseHandler);
        xhr.once(Laya.Event.ERROR, this, errorHandler);
        if (method == 'get') {
          xhr.send(url, "", "get", "text");
        } else {
          xhr.send(url, requestParams, "post", "text");
        }
      });
    }

    

    public getUser(enterOptions: IEnterOptions): Promise<IUser> {
      return new Promise((resolve,reject)=>{
        resolve({ openid: 'debug-laya-user-openid' });
      });
    }

    public async getUserInfo(): Promise<IUserInfo> {
      return { nickName: "debug-nick-name", avatarUrl: '', gender: -1 };
    }

    public getSystemInfo(): ISystemInfo {
      return { platform:'laya',model:'' };
    }

    public getEnterOptions(): IEnterOptions {
      return { scene: 0, query: {} };
    }

    public async navigateTo(app: IAd) {
    }

    public async navigateToSync(app: IAd,launchToCallback:any) {
    }

    public getShareObject(shareInfo: IShareInputObject): any {
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

    public getLocalCacheResUrl(targetUrl: string, waitDownloaded = false): Promise<string> {
      return Promise.resolve(targetUrl);
    }

    public preHandleInit() {
    }
  }
}