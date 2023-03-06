namespace hzzxsdk.c {
  export class WXPlat implements IPlat {
    public findStorageByKey(key: string): any {
      return wx.getStorageSync(Global.storagePrefix + key);
    }

    public putStorage(key: string, data: any, isSync = true): void {
      try {
        if (isSync) {
          wx.setStorageSync(Global.storagePrefix + key, data);
        } else {
          wx.setStorage({
            key: Global.storagePrefix + key,
            data: data
          })
        }
      } catch (e) {

      }

    }

    public async httpRequest(url: string, params?: any, method = 'get', retryTimes = 2): Promise<any> {
      const network = await new Promise<{ networkType: string }>((resolve, reject) => {
        wx.getNetworkType({
          success: function (res) { resolve(res) },
          fail: function (res) { reject(res) }
        });
      });
      if (network.networkType == 'none') {
        throw 'current network type is none';
      }
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
      return await new Promise((resolve, reject) => {
        let requestOptions: any = {
          url: url,
          header: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        };
        if (method != 'get') {
          requestOptions['method'] = 'post';
          requestOptions['data'] = params;
        }
        let retryCount = 0;
        let retrySend = function (reason?): boolean {
          if (++retryCount <= retryTimes) {
            wx.request(requestOptions);
            return true;
          }
          reject(reason);
          return false;
        }
        requestOptions.success = function (response: any) {
          if (response.statusCode && response.statusCode >= 200 && response.statusCode < 400) {
            resolve(response.data);
          } else {
            retrySend(response);
          }
        };
        requestOptions.fail = function (reason: any) {
          retrySend(reason);
        }
        wx.request(requestOptions);
      });
    }
    public getUser(enterOptions: IEnterOptions): Promise<IUser> {
      return new Promise((resolve, reject) => {
        this.getUserByCode(enterOptions).then(user => {
          resolve(user);
        }).catch(e => {
          this.getUserByCode(enterOptions).then(user => {
            resolve(user);
          }).catch(e => {
            this.getUserByCode(enterOptions).then(user => {
              resolve(user);
            }).catch(e => {
              reject(e);
            });
          });
        });
      });
    }

    private getUserByCode(enterOptions: IEnterOptions): Promise<IUser> {
      return new Promise((resolve, reject) => {
        wx.login({
          success: (loginRes: { code: string }) => {
            let credentialData = {
              code: loginRes.code,
              encryptedData: '',
              iv: ''
            }
            if (!Global.isNeedUnionid) {
              this.loginByCredentialData(credentialData, enterOptions).then(user => {
                resolve(user);
              }).catch(e => {
                reject(e);
              });
              return;
            }
            wx.getSetting({
              success: (settingRes: { authSetting: any }) => {
                if (settingRes.authSetting['scope.userInfo']) {
                  wx.getUserInfo({
                    withCredentials: true,
                    success: (userInfoResult: { encryptedData: string, iv: string }) => {
                      credentialData.encryptedData = userInfoResult.encryptedData;
                      credentialData.iv = userInfoResult.iv;
                      this.loginByCredentialData(credentialData, enterOptions).then(user => {
                        resolve(user);
                      }).catch(e => {
                        reject(e);
                      });
                    }
                  });
                }
                else {
                  this.loginByCredentialData(credentialData, enterOptions).then(user => {
                    resolve(user);
                  }).catch(e => {
                    reject(e);
                  });
                }
              },
              fail: (res) => {
                this.loginByCredentialData(credentialData, enterOptions).then(user => {
                  resolve(user);
                }).catch(e => {
                  reject(e);
                });
              }
            });
          },
          fail: (res) => {
            reject(res);
          }
        });
      });
    }
    protected loginByCredentialData(credentialData: any, enterOptions: IEnterOptions): Promise<IUser> {
      let userChannel = CommHelper.parseUserChannel(enterOptions);
      return new Promise((resolve, reject) => {
        let data = {
          product_id: Global.pid,
          code: credentialData.code,
          unionid: credentialData.encryptedData && credentialData.iv ? 'true' : 'false',
          channel_type: userChannel.channelType,
          channel_id: userChannel.channelId,
          channel_openid: CommHelper.paraseChannelUserId(enterOptions),
          encryptedData: encodeURIComponent(credentialData.encryptedData),
          iv: encodeURIComponent(credentialData.iv),
          model: encodeURIComponent(this.getSystemInfo().model)
        };

        let url = Global.server_login + '/server/login.do';

        this.httpRequest(url, data, 'post', 0).then(response => {

          if (response && response.code == 200 && response.result && response.result.openid) {
            CommHelper.log('login success. ', response);
            resolve(response.result);
          } else {
            CommHelper.log('login fail, openid is null. ', response);
            reject('login fail.');
          }

        }).catch(err => {
          CommHelper.log('login error.', err);
          reject(err);
        });
      });
    }

    public getUserInfo(): Promise<IUserInfo> {
      return new Promise((resolve, reject) => {
        wx.getSetting({
          fail: (res: any) => {
            reject();
          },
          success: (settingResult: { authSetting: any }) => {
            if (settingResult.authSetting['scope.userInfo']) {
              wx.getUserInfo({
                fail: (res: any) => {
                  reject();
                },
                success: (userInfoResult: { userInfo: IUserInfo }) => {
                  resolve(userInfoResult.userInfo);
                }
              });
            } else {
              reject();
            }
          }
        });
      });
    }

    public getSystemInfo(): ISystemInfo {
      let sys = wx.getSystemInfoSync();
      return { platform: sys.platform, model: sys.model }
    }

    public getEnterOptions(): IEnterOptions {
      return wx.getLaunchOptionsSync();
    }

    public navigateTo(app: IAd): Promise<any> {
      return new Promise((resolve, reject) => {
        if (!wx.redirectTo && CommHelper.compareVersionTx(wx.getSystemInfoSync().SDKVersion, '2.2.0') == -1) {
          CommHelper.log('navigateTo app fail，appId=', app.appid, 'path=', app.page, 'SDKVersion=', wx.getSystemInfoSync().SDKVersion);
          resolve();
          return;
        }

        wx.showLoading({ title: 'waiting...', mask: true });
        setTimeout(wx.hideLoading, 5 * 1000);//5秒后超时隐藏
        wx.navigateToMiniProgram({
          appId: app.appid,
          path: app.page,
          success: (res: any) => {
            wx.hideLoading();
            resolve();
            CommHelper.log('navigateTo app success，appId=', app.appid, 'path=', app.page);
          },
          fail: (res: any) => {
            wx.hideLoading();
            if (app.ad_image && ['.jpg', '.gif', '.png'].indexOf(app.ad_image.substr(-4)) != -1) {
              wx.previewImage({ urls: [app.ad_image] });
              resolve();
              CommHelper.log('navigateTo app fail,open image，appId=', app.appid, 'path=', app.page);
            } else {
              reject();
              CommHelper.log('navigateTo app fail,image is null，appId=', app.appid, 'path=', app.page, JSON.stringify(res));
            }
          }
        });
      });
    }




    public navigateToSync(app: IAd, launchToCallback: any) {
      if (!wx.redirectTo && CommHelper.compareVersionTx(wx.getSystemInfoSync().SDKVersion, '2.2.0') == -1) {
        launchToCallback(true);
        return;
      }
      wx.showLoading({ title: 'waiting...', mask: true });
      setTimeout(wx.hideLoading, 5 * 1000);//5秒后超时隐藏
      wx.navigateToMiniProgram({
        appId: app.appid,
        path: app.page,
        success: (res: any) => {
          wx.hideLoading();
          launchToCallback(true);
        },
        fail: (res: any) => {
          wx.hideLoading();
          if (app.ad_image && ['.jpg', '.gif', '.png'].indexOf(app.ad_image.substr(-4)) != -1) {
            wx.previewImage({ urls: [app.ad_image] });
            launchToCallback(true);
          } else {
            launchToCallback(false);
          }
        }
      });

    }

    public getShareObject(shareInputObject: IShareInputObject): IShareOutObject {

      const ranShareObject = ShareHelper.getRandomShareObject(shareInputObject);

      const info: IShareOutObject = {};

      info.title = ranShareObject.title;
      
      info.imageUrl = ranShareObject.imageUrl;

      let tempQuery='';
      let imgId =ranShareObject.imageId?ranShareObject.imageId:'';
      if (wx.redirectTo) {
        info.path = ShareHelper.genSharePath(shareInputObject.sceneCode, shareInputObject.path || '/pages/index/index', shareInputObject.params || {}, imgId);
        tempQuery=info.path;
      } else {
        info.query = ShareHelper.genShareQuery(ranShareObject.sceneCode, ranShareObject.params || {}, imgId);
        tempQuery=info.query;
      }
      
      let shareTime = tempQuery? CommHelper.getHttpQueryValueByKey(tempQuery, 'partakeTime'):'';

      ReportHelper.partakeOutletEvent(shareInputObject.sceneCode, imgId.toString(), '', '', shareTime);
      CommHelper.log('get share object :', JSON.stringify(info));
      return info;
    }

    public static downloadQueue: string[] = [];

    public getLocalCacheResUrl(targetUrl: string, waitDownloaded = false): Promise<string> {
      return new Promise((resolve, reject) => {
        if (targetUrl.substr(0, 8).toLowerCase() !== 'https://') {
          resolve(targetUrl);
          return;
        }

        if (WXPlat.downloadQueue.indexOf(targetUrl) >= 0) {
          resolve(targetUrl);
          return;
        }
        const cacheFile = wx.env.USER_DATA_PATH + '/hzzxsdk/' + targetUrl.substr(8);
        const fs = wx.getFileSystemManager();
        try {
          fs.accessSync(cacheFile);
          if (fs.statSync(cacheFile).isFile()) {
            resolve(cacheFile);
            CommHelper.addRes2MemoryCache(cacheFile);
            return;
          } else {
            fs.rmdirSync(cacheFile);
          }
        } catch (e) {

        }

        !waitDownloaded && resolve(targetUrl);

        WXPlat.downloadQueue.push(targetUrl);
        wx.downloadFile({
          targetUrl,
          success: res => {
            if (res.statusCode === 200) {
              this.mkdirRecursiveSync(cacheFile.substring(0, cacheFile.lastIndexOf('/')));
              fs.saveFileSync(res.tempFilePath, cacheFile);
              CommHelper.addRes2MemoryCache(cacheFile);
              waitDownloaded && resolve(cacheFile);
            } else {
              waitDownloaded && resolve(targetUrl);
            }
          },
          fail: () => {
            waitDownloaded && resolve(targetUrl);
          },
          complete: () => {
            WXPlat.downloadQueue.splice(WXPlat.downloadQueue.indexOf(targetUrl), 1);
          }
        });

      });
    }
    public mkdirRecursiveSync(dirPath: string): string {
      const fs = wx.getFileSystemManager();
      const dirLevel = dirPath.replace(wx.Global.USER_DATA_PATH, '').split('/');
      let currentDir = wx.Global.USER_DATA_PATH;
      for (let dirName of dirLevel) {
        if (!dirName) {
          continue;
        }
        currentDir += '/' + dirName;
        try {
          fs.accessSync(currentDir);
          if (!fs.statSync(currentDir).isDirectory()) {
            fs.unlinkSync(currentDir);
            fs.mkdirSync(currentDir);
          }
        } catch (e) {
          fs.mkdirSync(currentDir);
        }
      }
      return currentDir;
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

      try {
        wx.onAppShow(options => {
          ReportHelper.appRunEvent(options);
          ReportHelper.hotLaunchEvent(options);
        });

        wx.onAppHide((options) => {
          ReportHelper.addUpGapOnlineTimeOnHide();

        });
      } catch (e) {
      }
      try {
        wx.onShow((options) => {
          ReportHelper.appRunEvent(options);
          ReportHelper.hotLaunchEvent(options);
        });
        wx.onHide((options) => {
          ReportHelper.addUpGapOnlineTimeOnHide();

        });
      } catch (e) {
      }

    }
    public handleAfterLogin(account: IUser, launchOptions: IEnterOptions) {

    }
  }
}
