namespace hzzxsdk.c {
  export class DefaultPlat implements IPlat {
    public findStorageByKey(key: string): any {
      try {
        let data = window.localStorage.getItem(Global.storagePrefix + key);
        return data ? JSON.parse(data) : '';
      } catch (e) {
        return '';
      }
    };

    public putStorage(key: string, data: any): void {
      window.localStorage.setItem(Global.storagePrefix + key, JSON.stringify(data));
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
        let request = new XMLHttpRequest();
        request.onreadystatechange = function () {
          if (request.readyState == 4) {
            if (request.status == 200) {
              try {
                resolve(JSON.parse(request.responseText));
              } catch (e) {
                resolve(request.responseText);
              }
            } else {
              reject('HTTP request fail，status =' + request.status);
            }
          }
        }
        if (method == 'get') {
          request.open('GET', url);
          request.send();
        } else {
          request.open('POST', url);
          request.send(requestParams);
        }
      });
    }

    public async getUser(enterOptions: IEnterOptions): Promise<IUser> {
      return { openid: 'debug-user-openid' }
    }

    public async getUserInfo(): Promise<IUserInfo> {
      return { nickName: "debug-nick-name", avatarUrl: '', gender: -1 };
    }

    public getSystemInfo(): ISystemInfo {
      return { platform: navigator.platform,model:'' };
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