var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var hzzxsdk;
(function (hzzxsdk) {
    var c;
    (function (c) {
        var Global = /** @class */ (function () {
            function Global() {
            }
            Global.sdkVersion = '1.0.6';
            Global.sdkBuildTimeStamp = '2022829173519';
            Global.storagePrefix = 'hzzxsdk_';
            Global.server_login = 'https://sdk.jinkezhexin.com';
            Global.server_report = 'https://sdk.jinkezhexin.com';
            Global.server_res = 'https://cdnht.tianjinyuren.cn';
            Global.isInit = false;
            Global.totalCount = 0;
            Global.gapCount = 0;
            Global.lastAddUpDate = "";
            Global.totalKey = 'hzzx_ol_time_total';
            Global.gapKey = 'hzzx_ol_time_count';
            Global.lastAddUpDataKey = 'hzzx_ol_last_add_up_date';
            Global.sharePicDataKey = 'hzzx_share_pic_data';
            return Global;
        }());
        c.Global = Global;
    })(c = hzzxsdk.c || (hzzxsdk.c = {}));
})(hzzxsdk || (hzzxsdk = {}));
var hzzxsdk;
(function (hzzxsdk) {
    var c;
    (function (c) {
        var WXPlat = /** @class */ (function () {
            function WXPlat() {
            }
            WXPlat.prototype.findStorageByKey = function (key) {
                return wx.getStorageSync(c.Global.storagePrefix + key);
            };
            WXPlat.prototype.putStorage = function (key, data, isSync) {
                if (isSync === void 0) { isSync = true; }
                try {
                    if (isSync) {
                        wx.setStorageSync(c.Global.storagePrefix + key, data);
                    }
                    else {
                        wx.setStorage({
                            key: c.Global.storagePrefix + key,
                            data: data
                        });
                    }
                }
                catch (e) {
                }
            };
            WXPlat.prototype.httpRequest = function (url, params, method, retryTimes) {
                if (method === void 0) { method = 'get'; }
                if (retryTimes === void 0) { retryTimes = 2; }
                return __awaiter(this, void 0, void 0, function () {
                    var network, requestParams, key;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                                    wx.getNetworkType({
                                        success: function (res) { resolve(res); },
                                        fail: function (res) { reject(res); }
                                    });
                                })];
                            case 1:
                                network = _a.sent();
                                if (network.networkType == 'none') {
                                    throw 'current network type is none';
                                }
                                requestParams = '';
                                if (params) {
                                    for (key in params) {
                                        requestParams += key + '=' + params[key] + '&';
                                    }
                                    if (requestParams) {
                                        requestParams = requestParams.substr(0, requestParams.length - 1);
                                        if (method == 'get') {
                                            url += url.indexOf('?') == -1 ? '?' : '&';
                                            url += requestParams;
                                        }
                                    }
                                }
                                return [4 /*yield*/, new Promise(function (resolve, reject) {
                                        var requestOptions = {
                                            url: url,
                                            header: {
                                                'Content-Type': 'application/json;charset=UTF-8'
                                            }
                                        };
                                        if (method != 'get') {
                                            requestOptions['method'] = 'post';
                                            requestOptions['data'] = params;
                                        }
                                        var retryCount = 0;
                                        var retrySend = function (reason) {
                                            if (++retryCount <= retryTimes) {
                                                wx.request(requestOptions);
                                                return true;
                                            }
                                            reject(reason);
                                            return false;
                                        };
                                        requestOptions.success = function (response) {
                                            if (response.statusCode && response.statusCode >= 200 && response.statusCode < 400) {
                                                resolve(response.data);
                                            }
                                            else {
                                                retrySend(response);
                                            }
                                        };
                                        requestOptions.fail = function (reason) {
                                            retrySend(reason);
                                        };
                                        wx.request(requestOptions);
                                    })];
                            case 2: return [2 /*return*/, _a.sent()];
                        }
                    });
                });
            };
            WXPlat.prototype.getUser = function (enterOptions) {
                var _this = this;
                return new Promise(function (resolve, reject) {
                    _this.getUserByCode(enterOptions).then(function (user) {
                        resolve(user);
                    }).catch(function (e) {
                        _this.getUserByCode(enterOptions).then(function (user) {
                            resolve(user);
                        }).catch(function (e) {
                            _this.getUserByCode(enterOptions).then(function (user) {
                                resolve(user);
                            }).catch(function (e) {
                                reject(e);
                            });
                        });
                    });
                });
            };
            WXPlat.prototype.getUserByCode = function (enterOptions) {
                var _this = this;
                return new Promise(function (resolve, reject) {
                    wx.login({
                        success: function (loginRes) {
                            var credentialData = {
                                code: loginRes.code,
                                encryptedData: '',
                                iv: ''
                            };
                            if (!c.Global.isNeedUnionid) {
                                _this.loginByCredentialData(credentialData, enterOptions).then(function (user) {
                                    resolve(user);
                                }).catch(function (e) {
                                    reject(e);
                                });
                                return;
                            }
                            wx.getSetting({
                                success: function (settingRes) {
                                    if (settingRes.authSetting['scope.userInfo']) {
                                        wx.getUserInfo({
                                            withCredentials: true,
                                            success: function (userInfoResult) {
                                                credentialData.encryptedData = userInfoResult.encryptedData;
                                                credentialData.iv = userInfoResult.iv;
                                                _this.loginByCredentialData(credentialData, enterOptions).then(function (user) {
                                                    resolve(user);
                                                }).catch(function (e) {
                                                    reject(e);
                                                });
                                            }
                                        });
                                    }
                                    else {
                                        _this.loginByCredentialData(credentialData, enterOptions).then(function (user) {
                                            resolve(user);
                                        }).catch(function (e) {
                                            reject(e);
                                        });
                                    }
                                },
                                fail: function (res) {
                                    _this.loginByCredentialData(credentialData, enterOptions).then(function (user) {
                                        resolve(user);
                                    }).catch(function (e) {
                                        reject(e);
                                    });
                                }
                            });
                        },
                        fail: function (res) {
                            reject(res);
                        }
                    });
                });
            };
            WXPlat.prototype.loginByCredentialData = function (credentialData, enterOptions) {
                var _this = this;
                var userChannel = c.CommHelper.parseUserChannel(enterOptions);
                return new Promise(function (resolve, reject) {
                    var data = {
                        product_id: c.Global.pid,
                        code: credentialData.code,
                        unionid: credentialData.encryptedData && credentialData.iv ? 'true' : 'false',
                        channel_type: userChannel.channelType,
                        channel_id: userChannel.channelId,
                        channel_openid: c.CommHelper.paraseChannelUserId(enterOptions),
                        encryptedData: encodeURIComponent(credentialData.encryptedData),
                        iv: encodeURIComponent(credentialData.iv),
                        model: encodeURIComponent(_this.getSystemInfo().model)
                    };
                    var url = c.Global.server_login + '/server/login.do';
                    _this.httpRequest(url, data, 'post', 0).then(function (response) {
                        if (response && response.code == 200 && response.result && response.result.openid) {
                            c.CommHelper.log('login success. ', response);
                            resolve(response.result);
                        }
                        else {
                            c.CommHelper.log('login fail, openid is null. ', response);
                            reject('login fail.');
                        }
                    }).catch(function (err) {
                        c.CommHelper.log('login error.', err);
                        reject(err);
                    });
                });
            };
            WXPlat.prototype.getUserInfo = function () {
                return new Promise(function (resolve, reject) {
                    wx.getSetting({
                        fail: function (res) {
                            reject();
                        },
                        success: function (settingResult) {
                            if (settingResult.authSetting['scope.userInfo']) {
                                wx.getUserInfo({
                                    fail: function (res) {
                                        reject();
                                    },
                                    success: function (userInfoResult) {
                                        resolve(userInfoResult.userInfo);
                                    }
                                });
                            }
                            else {
                                reject();
                            }
                        }
                    });
                });
            };
            WXPlat.prototype.getSystemInfo = function () {
                var sys = wx.getSystemInfoSync();
                return { platform: sys.platform, model: sys.model };
            };
            WXPlat.prototype.getEnterOptions = function () {
                return wx.getLaunchOptionsSync();
            };
            WXPlat.prototype.navigateTo = function (app) {
                return new Promise(function (resolve, reject) {
                    if (!wx.redirectTo && c.CommHelper.compareVersionTx(wx.getSystemInfoSync().SDKVersion, '2.2.0') == -1) {
                        c.CommHelper.log('navigateTo app fail，appId=', app.appid, 'path=', app.page, 'SDKVersion=', wx.getSystemInfoSync().SDKVersion);
                        resolve();
                        return;
                    }
                    wx.showLoading({ title: 'waiting...', mask: true });
                    setTimeout(wx.hideLoading, 5 * 1000); //5秒后超时隐藏
                    wx.navigateToMiniProgram({
                        appId: app.appid,
                        path: app.page,
                        success: function (res) {
                            wx.hideLoading();
                            resolve();
                            c.CommHelper.log('navigateTo app success，appId=', app.appid, 'path=', app.page);
                        },
                        fail: function (res) {
                            wx.hideLoading();
                            if (app.ad_image && ['.jpg', '.gif', '.png'].indexOf(app.ad_image.substr(-4)) != -1) {
                                wx.previewImage({ urls: [app.ad_image] });
                                resolve();
                                c.CommHelper.log('navigateTo app fail,open image，appId=', app.appid, 'path=', app.page);
                            }
                            else {
                                reject();
                                c.CommHelper.log('navigateTo app fail,image is null，appId=', app.appid, 'path=', app.page, JSON.stringify(res));
                            }
                        }
                    });
                });
            };
            WXPlat.prototype.navigateToSync = function (app, launchToCallback) {
                if (!wx.redirectTo && c.CommHelper.compareVersionTx(wx.getSystemInfoSync().SDKVersion, '2.2.0') == -1) {
                    launchToCallback(true);
                    return;
                }
                wx.showLoading({ title: 'waiting...', mask: true });
                setTimeout(wx.hideLoading, 5 * 1000); //5秒后超时隐藏
                wx.navigateToMiniProgram({
                    appId: app.appid,
                    path: app.page,
                    success: function (res) {
                        wx.hideLoading();
                        launchToCallback(true);
                    },
                    fail: function (res) {
                        wx.hideLoading();
                        if (app.ad_image && ['.jpg', '.gif', '.png'].indexOf(app.ad_image.substr(-4)) != -1) {
                            wx.previewImage({ urls: [app.ad_image] });
                            launchToCallback(true);
                        }
                        else {
                            launchToCallback(false);
                        }
                    }
                });
            };
            WXPlat.prototype.getShareObject = function (shareInputObject) {
                var ranShareObject = c.ShareHelper.getRandomShareObject(shareInputObject);
                var info = {};
                info.title = ranShareObject.title;
                info.imageUrl = ranShareObject.imageUrl;
                var tempQuery = '';
                var imgId = ranShareObject.imageId ? ranShareObject.imageId : '';
                if (wx.redirectTo) {
                    info.path = c.ShareHelper.genSharePath(shareInputObject.sceneCode, shareInputObject.path || '/pages/index/index', shareInputObject.params || {}, imgId);
                    tempQuery = info.path;
                }
                else {
                    info.query = c.ShareHelper.genShareQuery(ranShareObject.sceneCode, ranShareObject.params || {}, imgId);
                    tempQuery = info.query;
                }
                var shareTime = tempQuery ? c.CommHelper.getHttpQueryValueByKey(tempQuery, 'partakeTime') : '';
                c.ReportHelper.partakeOutletEvent(shareInputObject.sceneCode, imgId.toString(), '', '', shareTime);
                c.CommHelper.log('get share object :', JSON.stringify(info));
                return info;
            };
            WXPlat.prototype.getLocalCacheResUrl = function (targetUrl, waitDownloaded) {
                var _this = this;
                if (waitDownloaded === void 0) { waitDownloaded = false; }
                return new Promise(function (resolve, reject) {
                    if (targetUrl.substr(0, 8).toLowerCase() !== 'https://') {
                        resolve(targetUrl);
                        return;
                    }
                    if (WXPlat.downloadQueue.indexOf(targetUrl) >= 0) {
                        resolve(targetUrl);
                        return;
                    }
                    var cacheFile = wx.env.USER_DATA_PATH + '/hzzxsdk/' + targetUrl.substr(8);
                    var fs = wx.getFileSystemManager();
                    try {
                        fs.accessSync(cacheFile);
                        if (fs.statSync(cacheFile).isFile()) {
                            resolve(cacheFile);
                            c.CommHelper.addRes2MemoryCache(cacheFile);
                            return;
                        }
                        else {
                            fs.rmdirSync(cacheFile);
                        }
                    }
                    catch (e) {
                    }
                    !waitDownloaded && resolve(targetUrl);
                    WXPlat.downloadQueue.push(targetUrl);
                    wx.downloadFile({
                        targetUrl: targetUrl,
                        success: function (res) {
                            if (res.statusCode === 200) {
                                _this.mkdirRecursiveSync(cacheFile.substring(0, cacheFile.lastIndexOf('/')));
                                fs.saveFileSync(res.tempFilePath, cacheFile);
                                c.CommHelper.addRes2MemoryCache(cacheFile);
                                waitDownloaded && resolve(cacheFile);
                            }
                            else {
                                waitDownloaded && resolve(targetUrl);
                            }
                        },
                        fail: function () {
                            waitDownloaded && resolve(targetUrl);
                        },
                        complete: function () {
                            WXPlat.downloadQueue.splice(WXPlat.downloadQueue.indexOf(targetUrl), 1);
                        }
                    });
                });
            };
            WXPlat.prototype.mkdirRecursiveSync = function (dirPath) {
                var fs = wx.getFileSystemManager();
                var dirLevel = dirPath.replace(wx.Global.USER_DATA_PATH, '').split('/');
                var currentDir = wx.Global.USER_DATA_PATH;
                for (var _i = 0, dirLevel_1 = dirLevel; _i < dirLevel_1.length; _i++) {
                    var dirName = dirLevel_1[_i];
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
                    }
                    catch (e) {
                        fs.mkdirSync(currentDir);
                    }
                }
                return currentDir;
            };
            WXPlat.prototype.setTimeout = function (callback, timeout) {
                return setTimeout(callback, timeout);
            };
            WXPlat.prototype.setInterval = function (callback, timeout) {
                return setInterval(callback, timeout);
            };
            WXPlat.prototype.clearTimeout = function (t) {
                clearTimeout(t);
            };
            WXPlat.prototype.clearInterval = function (t) {
                clearInterval(t);
            };
            WXPlat.prototype.preHandleInit = function () {
                try {
                    wx.onAppShow(function (options) {
                        c.ReportHelper.appRunEvent(options);
                        c.ReportHelper.hotLaunchEvent(options);
                    });
                    wx.onAppHide(function (options) {
                        c.ReportHelper.addUpGapOnlineTimeOnHide();
                    });
                }
                catch (e) {
                }
                try {
                    wx.onShow(function (options) {
                        c.ReportHelper.appRunEvent(options);
                        c.ReportHelper.hotLaunchEvent(options);
                    });
                    wx.onHide(function (options) {
                        c.ReportHelper.addUpGapOnlineTimeOnHide();
                    });
                }
                catch (e) {
                }
            };
            WXPlat.prototype.handleAfterLogin = function (account, launchOptions) {
            };
            WXPlat.downloadQueue = [];
            return WXPlat;
        }());
        c.WXPlat = WXPlat;
    })(c = hzzxsdk.c || (hzzxsdk.c = {}));
})(hzzxsdk || (hzzxsdk = {}));
var hzzxsdk;
(function (hzzxsdk) {
    var c;
    (function (c) {
        var EgretPlat = /** @class */ (function () {
            function EgretPlat() {
            }
            EgretPlat.prototype.findStorageByKey = function (key) {
                try {
                    var data = egret.localStorage.getItem(c.Global.storagePrefix + key);
                    return data ? JSON.parse(data) : '';
                }
                catch (e) {
                    return '';
                }
            };
            ;
            EgretPlat.prototype.putStorage = function (key, data) {
                egret.localStorage.setItem(c.Global.storagePrefix + key, JSON.stringify(data));
            };
            ;
            EgretPlat.prototype.httpRequest = function (url, params, method, retryTimes) {
                if (method === void 0) { method = 'get'; }
                if (retryTimes === void 0) { retryTimes = 2; }
                var requestParams = '';
                if (params) {
                    for (var key in params) {
                        requestParams += key + '=' + params[key] + '&';
                    }
                    if (requestParams) {
                        requestParams = requestParams.substr(0, requestParams.length - 1);
                        if (method == 'get') {
                            url += url.indexOf('?') == -1 ? '?' : '&';
                            url += requestParams;
                        }
                    }
                }
                return new Promise(function (resolve, reject) {
                    var responseHandler = function (event) {
                        var response = event.currentTarget.response;
                        try {
                            resolve(JSON.parse(response));
                        }
                        catch (e) {
                            resolve(response);
                        }
                    };
                    var errorHandler = function (event) {
                    };
                    var request = new egret.HttpRequest();
                    request.once(egret.Event.COMPLETE, responseHandler, null);
                    request.once(egret.IOErrorEvent.IO_ERROR, errorHandler, null);
                    if (method == 'get') {
                        request.open(url, egret.HttpMethod.GET);
                        request.send();
                    }
                    else {
                        request.open(url, egret.HttpMethod.POST);
                        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                        request.send(requestParams);
                    }
                });
            };
            EgretPlat.prototype.getUser = function (enterOptions) {
                return new Promise(function (resolve, reject) {
                    resolve({ openid: 'debug-egret-user-openid' });
                });
            };
            EgretPlat.prototype.getUserInfo = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, { nickName: "debug-nick-name", avatarUrl: '', gender: -1 }];
                    });
                });
            };
            EgretPlat.prototype.getSystemInfo = function () {
                return { platform: egret.Capabilities.os, model: '' };
            };
            EgretPlat.prototype.getEnterOptions = function () {
                return { scene: 0, query: {} };
            };
            EgretPlat.prototype.navigateTo = function (app) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/];
                    });
                });
            };
            EgretPlat.prototype.navigateToSync = function (app, launchToCallback) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/];
                    });
                });
            };
            EgretPlat.prototype.getShareObject = function (shareInfo) {
            };
            EgretPlat.prototype.getLocalCacheResUrl = function (targetUrl, waitDownloaded) {
                if (waitDownloaded === void 0) { waitDownloaded = false; }
                return Promise.resolve(targetUrl);
            };
            EgretPlat.prototype.setTimeout = function (callback, timeout) {
                return setTimeout(callback, timeout);
            };
            EgretPlat.prototype.setInterval = function (callback, timeout) {
                return setInterval(callback, timeout);
            };
            EgretPlat.prototype.clearTimeout = function (t) {
                clearTimeout(t);
            };
            EgretPlat.prototype.clearInterval = function (t) {
                clearInterval(t);
            };
            EgretPlat.prototype.preHandleInit = function () {
            };
            return EgretPlat;
        }());
        c.EgretPlat = EgretPlat;
    })(c = hzzxsdk.c || (hzzxsdk.c = {}));
})(hzzxsdk || (hzzxsdk = {}));
var hzzxsdk;
(function (hzzxsdk) {
    var c;
    (function (c) {
        var CocosPlat = /** @class */ (function () {
            function CocosPlat() {
            }
            CocosPlat.prototype.findStorageByKey = function (key) {
                try {
                    var data = cc.sys.localStorage.getItem(c.Global.storagePrefix + key);
                    return data ? JSON.parse(data) : '';
                }
                catch (e) {
                    return '';
                }
            };
            ;
            CocosPlat.prototype.putStorage = function (key, data) {
                cc.sys.localStorage.setItem(c.Global.storagePrefix + key, JSON.stringify(data));
            };
            ;
            CocosPlat.prototype.httpRequest = function (url, params, method, retryTimes) {
                if (method === void 0) { method = 'get'; }
                if (retryTimes === void 0) { retryTimes = 2; }
                var requestParams = '';
                if (params) {
                    for (var key in params) {
                        requestParams += key + '=' + params[key] + '&';
                    }
                    if (requestParams) {
                        requestParams = requestParams.substr(0, requestParams.length - 1);
                        if (method == 'get') {
                            url += url.indexOf('?') == -1 ? '?' : '&';
                            url += requestParams;
                        }
                    }
                }
                return new Promise(function (resolve, reject) {
                    var xhr = cc.loader.getXMLHttpRequest();
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
                            try {
                                resolve(JSON.parse(xhr.responseText));
                            }
                            catch (e) {
                                resolve(xhr.responseText);
                            }
                        }
                        else {
                        }
                    };
                    if (method == 'get') {
                        xhr.open("GET", url, true);
                        xhr.send();
                    }
                    else {
                        xhr.open("POST", url, true);
                        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                        xhr.send(requestParams);
                    }
                });
            };
            CocosPlat.prototype.getUser = function (enterOptions) {
                return new Promise(function (resolve, reject) {
                    resolve({ openid: 'debug-cocos-user-openid' });
                });
            };
            CocosPlat.prototype.getUserInfo = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, { nickName: "debug-nick-name", avatarUrl: '', gender: -1 }];
                    });
                });
            };
            CocosPlat.prototype.getSystemInfo = function () {
                return { platform: cc.sys.os, model: '' };
            };
            CocosPlat.prototype.getEnterOptions = function () {
                return { scene: 0, query: {} };
            };
            CocosPlat.prototype.navigateTo = function (app) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/];
                    });
                });
            };
            CocosPlat.prototype.navigateToSync = function (app, launchToCallback) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/];
                    });
                });
            };
            CocosPlat.prototype.getShareObject = function (shareInfo) {
            };
            CocosPlat.prototype.getLocalCacheResUrl = function (targetUrl, waitDownloaded) {
                if (waitDownloaded === void 0) { waitDownloaded = false; }
                return Promise.resolve(targetUrl);
            };
            CocosPlat.prototype.setTimeout = function (callback, timeout) {
                return setTimeout(callback, timeout);
            };
            CocosPlat.prototype.setInterval = function (callback, timeout) {
                return setInterval(callback, timeout);
            };
            CocosPlat.prototype.clearTimeout = function (t) {
                clearTimeout(t);
            };
            CocosPlat.prototype.clearInterval = function (t) {
                clearInterval(t);
            };
            CocosPlat.prototype.preHandleInit = function () {
            };
            return CocosPlat;
        }());
        c.CocosPlat = CocosPlat;
    })(c = hzzxsdk.c || (hzzxsdk.c = {}));
})(hzzxsdk || (hzzxsdk = {}));
var hzzxsdk;
(function (hzzxsdk) {
    var c;
    (function (c) {
        var LayaPlat = /** @class */ (function () {
            function LayaPlat() {
            }
            LayaPlat.prototype.findStorageByKey = function (key) {
                try {
                    var data = window.localStorage.getItem(c.Global.storagePrefix + key);
                    return data ? JSON.parse(data) : '';
                }
                catch (e) {
                    return '';
                }
            };
            LayaPlat.prototype.putStorage = function (key, data) {
                window.localStorage.setItem(c.Global.storagePrefix + key, JSON.stringify(data));
            };
            LayaPlat.prototype.httpRequest = function (url, params, method, retryTimes) {
                var _this = this;
                if (method === void 0) { method = 'get'; }
                if (retryTimes === void 0) { retryTimes = 2; }
                var requestParams = '';
                if (params) {
                    for (var key in params) {
                        requestParams += key + '=' + params[key] + '&';
                    }
                    if (requestParams) {
                        requestParams = requestParams.substr(0, requestParams.length - 1);
                        if (method == 'get') {
                            url += url.indexOf('?') == -1 ? '?' : '&';
                            url += requestParams;
                        }
                    }
                }
                return new Promise(function (resolve, reject) {
                    var responseHandler = function (data) {
                        try {
                            resolve(JSON.parse(data));
                        }
                        catch (e) {
                            resolve(data);
                        }
                    };
                    var errorHandler = function (event) {
                    };
                    var xhr = new Laya.HttpRequest();
                    xhr.once(Laya.Event.COMPLETE, _this, responseHandler);
                    xhr.once(Laya.Event.ERROR, _this, errorHandler);
                    if (method == 'get') {
                        xhr.send(url, "", "get", "text");
                    }
                    else {
                        xhr.send(url, requestParams, "post", "text");
                    }
                });
            };
            LayaPlat.prototype.getUser = function (enterOptions) {
                return new Promise(function (resolve, reject) {
                    resolve({ openid: 'debug-laya-user-openid' });
                });
            };
            LayaPlat.prototype.getUserInfo = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, { nickName: "debug-nick-name", avatarUrl: '', gender: -1 }];
                    });
                });
            };
            LayaPlat.prototype.getSystemInfo = function () {
                return { platform: 'laya', model: '' };
            };
            LayaPlat.prototype.getEnterOptions = function () {
                return { scene: 0, query: {} };
            };
            LayaPlat.prototype.navigateTo = function (app) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/];
                    });
                });
            };
            LayaPlat.prototype.navigateToSync = function (app, launchToCallback) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/];
                    });
                });
            };
            LayaPlat.prototype.getShareObject = function (shareInfo) {
            };
            LayaPlat.prototype.setTimeout = function (callback, timeout) {
                return setTimeout(callback, timeout);
            };
            LayaPlat.prototype.setInterval = function (callback, timeout) {
                return setInterval(callback, timeout);
            };
            LayaPlat.prototype.clearTimeout = function (t) {
                clearTimeout(t);
            };
            LayaPlat.prototype.clearInterval = function (t) {
                clearInterval(t);
            };
            LayaPlat.prototype.getLocalCacheResUrl = function (targetUrl, waitDownloaded) {
                if (waitDownloaded === void 0) { waitDownloaded = false; }
                return Promise.resolve(targetUrl);
            };
            LayaPlat.prototype.preHandleInit = function () {
            };
            return LayaPlat;
        }());
        c.LayaPlat = LayaPlat;
    })(c = hzzxsdk.c || (hzzxsdk.c = {}));
})(hzzxsdk || (hzzxsdk = {}));
var hzzxsdk;
(function (hzzxsdk) {
    var c;
    (function (c) {
        var DefaultPlat = /** @class */ (function () {
            function DefaultPlat() {
            }
            DefaultPlat.prototype.findStorageByKey = function (key) {
                try {
                    var data = window.localStorage.getItem(c.Global.storagePrefix + key);
                    return data ? JSON.parse(data) : '';
                }
                catch (e) {
                    return '';
                }
            };
            ;
            DefaultPlat.prototype.putStorage = function (key, data) {
                window.localStorage.setItem(c.Global.storagePrefix + key, JSON.stringify(data));
            };
            ;
            DefaultPlat.prototype.httpRequest = function (url, params, method, retryTimes) {
                if (method === void 0) { method = 'get'; }
                if (retryTimes === void 0) { retryTimes = 2; }
                var requestParams = '';
                if (params) {
                    for (var key in params) {
                        requestParams += key + '=' + params[key] + '&';
                    }
                    if (requestParams) {
                        requestParams = requestParams.substr(0, requestParams.length - 1);
                        if (method == 'get') {
                            url += url.indexOf('?') == -1 ? '?' : '&';
                            url += requestParams;
                        }
                    }
                }
                return new Promise(function (resolve, reject) {
                    var request = new XMLHttpRequest();
                    request.onreadystatechange = function () {
                        if (request.readyState == 4) {
                            if (request.status == 200) {
                                try {
                                    resolve(JSON.parse(request.responseText));
                                }
                                catch (e) {
                                    resolve(request.responseText);
                                }
                            }
                            else {
                                reject('HTTP request fail，status =' + request.status);
                            }
                        }
                    };
                    if (method == 'get') {
                        request.open('GET', url);
                        request.send();
                    }
                    else {
                        request.open('POST', url);
                        request.send(requestParams);
                    }
                });
            };
            DefaultPlat.prototype.getUser = function (enterOptions) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, { openid: 'debug-user-openid' }];
                    });
                });
            };
            DefaultPlat.prototype.getUserInfo = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, { nickName: "debug-nick-name", avatarUrl: '', gender: -1 }];
                    });
                });
            };
            DefaultPlat.prototype.getSystemInfo = function () {
                return { platform: navigator.platform, model: '' };
            };
            DefaultPlat.prototype.getEnterOptions = function () {
                return { scene: 0, query: {} };
            };
            DefaultPlat.prototype.navigateTo = function (app) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/];
                    });
                });
            };
            DefaultPlat.prototype.navigateToSync = function (app, launchToCallback) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/];
                    });
                });
            };
            DefaultPlat.prototype.getShareObject = function (shareInfo) {
            };
            DefaultPlat.prototype.getLocalCacheResUrl = function (targetUrl, waitDownloaded) {
                if (waitDownloaded === void 0) { waitDownloaded = false; }
                return Promise.resolve(targetUrl);
            };
            DefaultPlat.prototype.setTimeout = function (callback, timeout) {
                return setTimeout(callback, timeout);
            };
            DefaultPlat.prototype.setInterval = function (callback, timeout) {
                return setInterval(callback, timeout);
            };
            DefaultPlat.prototype.clearTimeout = function (t) {
                clearTimeout(t);
            };
            DefaultPlat.prototype.clearInterval = function (t) {
                clearInterval(t);
            };
            DefaultPlat.prototype.preHandleInit = function () {
            };
            return DefaultPlat;
        }());
        c.DefaultPlat = DefaultPlat;
    })(c = hzzxsdk.c || (hzzxsdk.c = {}));
})(hzzxsdk || (hzzxsdk = {}));
/// <reference path="WXPlat.ts" />
/// <reference path="EgretPlat.ts" />
/// <reference path="CocosPlat.ts" />
/// <reference path="LayaPlat.ts" />
/// <reference path="DefaultPlat.ts" />
var hzzxsdk;
(function (hzzxsdk) {
    var c;
    (function (c) {
        var BasePlat = /** @class */ (function () {
            function BasePlat() {
            }
            Object.defineProperty(BasePlat, "instance", {
                get: function () {
                    if (!this._inst) {
                        switch (this.platMark) {
                            case 'wx':
                                this._inst = new c.WXPlat();
                                c.CommHelper.log('platform=wx');
                                break;
                            case 'egret':
                                this._inst = new c.EgretPlat();
                                c.CommHelper.log('platform=Egret');
                                break;
                            case 'cocos':
                                this._inst = new c.CocosPlat();
                                c.CommHelper.log('platform=Cocos');
                                break;
                            case 'laya':
                                this._inst = new c.LayaPlat();
                                c.CommHelper.log('platform=Laya');
                                break;
                            default:
                                c.CommHelper.log('platform=default');
                                this._inst = new c.DefaultPlat();
                        }
                    }
                    return this._inst;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(BasePlat, "platMark", {
                get: function () {
                    if (typeof wx == 'object') {
                        return 'wx';
                    }
                    else if (typeof egret == 'object') {
                        return 'egret';
                    }
                    else if (typeof cc == 'object') {
                        return 'cocos';
                    }
                    else if (typeof Laya == 'object') {
                        return 'laya';
                    }
                    else {
                        return 'unknow';
                    }
                },
                enumerable: false,
                configurable: true
            });
            return BasePlat;
        }());
        c.BasePlat = BasePlat;
    })(c = hzzxsdk.c || (hzzxsdk.c = {}));
})(hzzxsdk || (hzzxsdk = {}));
var hzzxsdk;
(function (hzzxsdk) {
    var c;
    (function (c) {
        /**
         * user
         */
        var UserHelper = /** @class */ (function () {
            function UserHelper() {
            }
            /**
             * Save user information localStorage
             * @param user
             * @returns
             */
            UserHelper.setUser = function (user) {
                if (!user.openid) {
                    c.CommHelper.log('set user data fail，openid is null. user =', user);
                    return false;
                }
                if (!user.unionid) {
                    user.unionid = '';
                }
                if (user.unionid == '"null"' || user.unionid == 'null') {
                    user.unionid = '';
                }
                if (!user.channel_openid) {
                    user.channel_openid = '';
                }
                if (user.channel_openid == '"null"' || user.channel_openid == 'null') {
                    user.channel_openid = '';
                }
                c.BasePlat.instance.putStorage('hzzx_user_data', user);
                c.CommHelper.log('set user data success. openid = ', user.openid);
                return true;
            };
            /**
             * fetch user data from localStorage
             * @return IUser
             */
            UserHelper.getUser = function () {
                var user = c.BasePlat.instance.findStorageByKey('hzzx_user_data');
                if (user && user.openid) {
                    user.unionid = user.unionid || '';
                    return user;
                }
                return {
                    openid: "",
                    unionid: "",
                    last_login_time: 0,
                    create_time: 0
                };
            };
            UserHelper.getUserAsyn = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                if (_this.getUser().openid) {
                                    resolve(_this.getUser());
                                    return;
                                }
                                var timerInterval = c.BasePlat.instance.setInterval(function () {
                                    if (_this.getUser().openid) {
                                        c.BasePlat.instance.clearInterval(timerInterval);
                                        c.BasePlat.instance.clearTimeout(timerTimeout);
                                        resolve(_this.getUser());
                                    }
                                }, 150);
                                var timerTimeout = c.BasePlat.instance.setTimeout(function () {
                                    c.BasePlat.instance.clearInterval(timerInterval);
                                }, 20000);
                            })];
                    });
                });
            };
            /**
             * third login
             * @param user third user info
             */
            UserHelper.thirdLogin = function (user) {
                var _this = this;
                return new Promise(function (resolve, reject) {
                    var userChannel = c.CommHelper.parseUserChannel(c.Global.enterOptions);
                    if (user) {
                        user.channel_type = userChannel.channelType ? userChannel.channelType : '';
                        user.channel_id = userChannel.channelId ? userChannel.channelId : '';
                    }
                    if (_this.setUser(user)) {
                        var uid = user.openid;
                        var unionid = user.unionid;
                        var type = user.channel_type;
                        var id = user.channel_id;
                        var data = {
                            product_id: c.Global.pid,
                            openid: uid,
                            unionid: unionid,
                            channel_type: type,
                            chennal_id: id,
                        };
                        c.BasePlat.instance.httpRequest(c.Global.server_login + '/server/otherLogin.do', data, 'post').then(function (response) {
                            if (response && response.code == 200 && response.result && response.result.openid) {
                                c.CommHelper.log('third login success. ', response);
                                UserHelper.setUser(response.result);
                                resolve(response.result);
                            }
                            else {
                                c.CommHelper.log('third login fail, openid is null. ', response);
                                reject();
                            }
                        }).catch(function (err) {
                            c.CommHelper.log('third login error, ' + err);
                            reject();
                        });
                    }
                    else {
                        c.CommHelper.log('init with third user fail. openid is null.');
                        reject();
                    }
                });
            };
            UserHelper.getOpenId = function () {
                return UserHelper.getUser().openid;
            };
            UserHelper.isAdUser = function () {
                var user = this.getUser();
                if (!user || !user.openid) {
                    return false;
                }
                if (user.channel_type && (user.channel_type == 'ad')) {
                    return true;
                }
                if (user.channel_type && user.channel_type == 'oth') {
                    var senceArray = [1095, 1084, 1045, 1046, 1067, 1065];
                    var currSence = user.channel_id ? Number(user.channel_id) : 0;
                    var isAd = senceArray.indexOf(currSence) == -1;
                    if (!isAd) {
                        return true;
                    }
                }
                return false;
            };
            return UserHelper;
        }());
        c.UserHelper = UserHelper;
    })(c = hzzxsdk.c || (hzzxsdk.c = {}));
})(hzzxsdk || (hzzxsdk = {}));
var hzzxsdk;
(function (hzzxsdk) {
    var c;
    (function (c) {
        var ReportHelper = /** @class */ (function () {
            function ReportHelper() {
            }
            /**
             * 自定义打点
             * @param id
             * @param customParam1
             * @param customParam2
             */
            ReportHelper.customEvent = function (id, customParam1, customParam2) {
                if (id === void 0) { id = 0; }
                if (customParam1 === void 0) { customParam1 = ''; }
                if (customParam2 === void 0) { customParam2 = ''; }
                if (!c.Global.isInit) {
                    return;
                }
                c.UserHelper.getUserAsyn().then(function (account) {
                    var data = {
                        product_id: c.Global.pid,
                        openid: account.openid,
                        event_id: id,
                        custom_param_1: encodeURIComponent(customParam1),
                        custom_param_2: encodeURIComponent(customParam2)
                    };
                    c.BasePlat.instance.httpRequest(c.Global.server_report + '/log/event.do', data, 'post').then(function (res) {
                        c.CommHelper.log('custom event report success. eventid:' + id);
                    });
                }).catch(function (e) {
                    c.CommHelper.log('custom event report fail. eventid:' + id + ", err@" + e);
                });
            };
            /**
             * 分享进入事件
             * @param partakeId 分享ID
             * @param partakeUser 谁分享的
             * @param shareTicket
             * @param customParam1
             * @param customParam2
             */
            ReportHelper.partakeIntoEvent = function (partakeId, partakeUser, shareTicket, customParam1, customParam2) {
                if (customParam1 === void 0) { customParam1 = ''; }
                if (customParam2 === void 0) { customParam2 = ''; }
                if (!c.Global.isInit) {
                    return;
                }
                c.UserHelper.getUserAsyn().then(function (user) {
                    var uid = user.openid;
                    var data = {
                        product_id: c.Global.pid,
                        openid: uid,
                        from_id: partakeId,
                        from_type: shareTicket ? 1 : 0,
                        from_userid: partakeUser,
                        custom_param_1: customParam1,
                        custom_param_2: customParam2
                    };
                    c.BasePlat.instance.httpRequest(c.Global.server_report + '/log/partakeInto.do', data, 'post').then(function (res) {
                        c.CommHelper.log('report partakeInto event success. partakeId=' + partakeId);
                    });
                }).catch(function () {
                    c.CommHelper.log('report partakeInto event fail. partakeId=' + partakeId);
                });
            };
            /**
             * 广告进入事件
             * page=/pages/index/index?type=link&adid=ad_${gameid}_${序号}
             * @param id 广告ID
             * @param appId enterOptions.referrerInfo.appId
             * @param param1 扩展参数
             */
            ReportHelper.adIntoEvent = function (id, appId, param1) {
                if (param1 === void 0) { param1 = ''; }
                if (!c.Global.isInit) {
                    return;
                }
                c.UserHelper.getUserAsyn().then(function (user) {
                    var userid = user.openid;
                    var data = {
                        product_id: c.Global.pid,
                        openid: userid,
                        custom_ad_id: id,
                        from_appid: appId
                    };
                    c.BasePlat.instance.httpRequest(c.Global.server_report + '/log/linkIn.do', data, 'post').then(function (res) {
                        c.CommHelper.log('report ad into success. adid=' + id);
                    });
                }).catch(function () {
                    c.CommHelper.log('report ad into fail. adid=' + id);
                });
            };
            /**
             * 分享事件
             * @param sceneCode int 分享点场景编号
             * @param imgId 分享图ID
             * @param shareTicket
             * @param customParam1
             * @param customParam2
             */
            ReportHelper.partakeOutletEvent = function (sceneCode, imgId, shareTicket, customParam1, customParam2) {
                if (imgId === void 0) { imgId = ''; }
                if (shareTicket === void 0) { shareTicket = ''; }
                if (customParam1 === void 0) { customParam1 = ''; }
                if (customParam2 === void 0) { customParam2 = ''; }
                if (!c.Global.isInit) {
                    return;
                }
                c.UserHelper.getUserAsyn().then(function (user) {
                    var shareWordsId = 'share_' + c.Global.pid + '_' + sceneCode;
                    var userid = user.openid;
                    var data = {
                        product_id: c.Global.pid,
                        openid: userid,
                        share_words_id: shareWordsId,
                        share_photo_id: imgId,
                        share_type: shareTicket,
                        custom_param_1: customParam1,
                        custom_param_2: customParam2
                    };
                    c.BasePlat.instance.httpRequest(c.Global.server_report + '/log/partakeOutlet.do', data, 'post').then(function (res) {
                        c.CommHelper.log('report PartakeOutlet event success. imageId=' + imgId);
                    });
                }).catch(function () {
                    c.CommHelper.log('report PartakeOutlet event fail. imageId=' + imgId);
                });
            };
            ReportHelper.addUpGapOnlineTime = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var totalTimeCount, gapTimeCount_1, d, quickReport, slowReport, user, channelType, channelId, uid, unionid, data, error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                c.CommHelper.resetTotalCount(c.Global.lastAddUpDate);
                                if (c.Global.totalCount >= this.MAX_DAY_TIME) {
                                    c.Global.totalCount = this.MAX_DAY_TIME - 1;
                                }
                                totalTimeCount = c.Global.totalCount + 1;
                                gapTimeCount_1 = c.Global.gapCount + 1;
                                c.Global.totalCount = totalTimeCount;
                                c.Global.gapCount = gapTimeCount_1;
                                c.BasePlat.instance.putStorage(c.Global.totalKey, totalTimeCount, false);
                                c.BasePlat.instance.putStorage(c.Global.gapKey, gapTimeCount_1, false);
                                if (!c.Global.isInit) {
                                    return [2 /*return*/];
                                }
                                d = new Date();
                                if (d.getTime() - ReportHelper.lastAddUpTime < 59 * 1000) {
                                    return [2 /*return*/];
                                }
                                quickReport = totalTimeCount < 5 * 60 && gapTimeCount_1 > 60;
                                slowReport = totalTimeCount >= 5 * 60 && gapTimeCount_1 > 5 * 60;
                                if (!quickReport && !slowReport) {
                                    return [2 /*return*/];
                                }
                                ReportHelper.lastAddUpTime = d.getTime();
                                c.BasePlat.instance.putStorage(c.Global.lastAddUpDataKey, c.Global.lastAddUpDate, false);
                                return [4 /*yield*/, c.UserHelper.getUserAsyn()];
                            case 1:
                                user = _a.sent();
                                channelType = user.channel_type;
                                channelId = user.channel_id;
                                uid = user.openid;
                                unionid = user.unionid ? user.unionid : '';
                                data = {
                                    product_id: c.Global.pid,
                                    openid: uid,
                                    unionid: unionid,
                                    channel_type: channelType,
                                    channel_id: channelId,
                                    total_time: gapTimeCount_1
                                };
                                c.Global.gapCount = 0;
                                if (totalTimeCount <= 0 || c.Global.totalCount <= 0) {
                                    return [2 /*return*/];
                                }
                                c.BasePlat.instance.httpRequest(c.Global.server_report + '/log/onlineTime.do', data, 'post').then(function (res) {
                                    c.BasePlat.instance.putStorage(c.Global.gapKey, 0, false);
                                    c.CommHelper.log('add up online time success.', 'gap time', gapTimeCount_1);
                                }).catch(function (res) {
                                });
                                return [3 /*break*/, 3];
                            case 2:
                                error_1 = _a.sent();
                                c.CommHelper.log('add up online time error:', error_1);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            };
            ReportHelper.addUpGapOnlineTimeOnHide = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var totalTimeCount, gapTimeCount_2, user, channelType, channelId, uid, unionid, data, error_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                c.CommHelper.resetTotalCount(c.Global.lastAddUpDate);
                                if (c.Global.totalCount >= this.MAX_DAY_TIME) {
                                    c.Global.totalCount = this.MAX_DAY_TIME - 1;
                                }
                                totalTimeCount = c.Global.totalCount;
                                gapTimeCount_2 = c.Global.gapCount;
                                if (totalTimeCount <= 0) {
                                    c.Global.totalCount = 0;
                                    return [2 /*return*/];
                                }
                                if (!c.Global.isInit) {
                                    return [2 /*return*/];
                                }
                                c.BasePlat.instance.putStorage('last_report_date', c.Global.lastAddUpDate, false);
                                return [4 /*yield*/, c.UserHelper.getUserAsyn()];
                            case 1:
                                user = _a.sent();
                                channelType = user.channel_type;
                                channelId = user.channel_id;
                                uid = user.openid;
                                unionid = user.unionid ? user.unionid : '';
                                data = {
                                    product_id: c.Global.pid,
                                    openid: uid,
                                    unionid: unionid,
                                    channel_type: channelType,
                                    channel_id: channelId,
                                    total_time: gapTimeCount_2
                                };
                                c.Global.gapCount = 0;
                                c.BasePlat.instance.httpRequest(c.Global.server_report + '/log/onlineTime.do', data, 'post').then(function (res) {
                                    c.BasePlat.instance.putStorage(c.Global.gapKey, 0, false);
                                    c.CommHelper.log('add up online time(hide) success.', 'gap time', gapTimeCount_2);
                                }).catch(function (res) {
                                });
                                return [3 /*break*/, 3];
                            case 2:
                                error_2 = _a.sent();
                                c.CommHelper.log('add up online time(hide). error:', error_2);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            };
            /**
             * 热启动事件
             * @param enterOptions
             */
            ReportHelper.hotLaunchEvent = function (enterOptions) {
                if (!c.Global.isInit || !enterOptions) {
                    return;
                }
                Promise.all([c.UserHelper.getUserAsyn(), c.GameConfigHelper.getGameVerContrLevel('')]).then(function (_a) {
                    var user = _a[0], verContrData = _a[1];
                    var currentIp = verContrData && verContrData.ip ? verContrData.ip : "";
                    var accountSource = c.CommHelper.parseUserChannel(enterOptions);
                    var channelType = accountSource.channelType;
                    var channelId = accountSource.channelId;
                    var systemInfo = c.BasePlat.instance.getSystemInfo();
                    var model = systemInfo.model ? systemInfo.model : '';
                    var uid = user.openid;
                    var unionid = user.unionid ? user.unionid : '';
                    var data = {
                        product_id: c.Global.pid,
                        openid: uid,
                        unionid: unionid,
                        channel_type: channelType,
                        channel_id: channelId,
                        ip: currentIp,
                        model: encodeURIComponent(model),
                        behavior_id: 1
                    };
                    c.BasePlat.instance.httpRequest(c.Global.server_report + '/log/login.do', data, 'post').then(function (res) {
                        c.CommHelper.log('hot run event success');
                    });
                }).catch(function (e) {
                    c.CommHelper.log('hot run event error. ', e);
                });
            };
            /**
             * 视频播放和点击次数
             * 视频播放结束上报
             * @param isClick 有点击视频=true|无点击=false
             */
            ReportHelper.videoShowAndClickCountEvent = function (isClick) {
                if (isClick === void 0) { isClick = false; }
                if (!c.Global.isInit) {
                    return;
                }
                c.UserHelper.getUserAsyn().then(function (user) {
                    var channelType = user.channel_type;
                    var channelId = user.channel_id;
                    var uid = user.openid;
                    var unionid = user.unionid ? user.unionid : '';
                    var data = {
                        product_id: c.Global.pid,
                        openid: uid,
                        unionid: unionid,
                        channel_type: channelType,
                        channel_id: channelId,
                        total_count: 1,
                        total_click_count: isClick ? 1 : 0
                    };
                    c.BasePlat.instance.httpRequest(c.Global.server_report + '/log/videoCount.do', data, 'post').then(function (res) {
                        c.CommHelper.log('video end event success.');
                    });
                }).catch(function (err) {
                    c.CommHelper.log('video end event error.' + err);
                });
            };
            ReportHelper.batchShowEvent = function (adList) {
                if (!c.Global.isInit) {
                    return;
                }
                c.UserHelper.getUserAsyn().then(function (user) {
                    var openid = user.openid;
                    //构造批量数据
                    var productIds = [], adIds = [], customParams = [];
                    for (var _i = 0, adList_1 = adList; _i < adList_1.length; _i++) {
                        var ad = adList_1[_i];
                        productIds[productIds.length] = ad.pid;
                        adIds[adIds.length] = ad.id;
                        customParams[customParams.length] = ad.category.toString();
                    }
                    var data = {
                        product_id: c.Global.pid,
                        openid: openid,
                        spread_game_id: productIds.join(','),
                        custom_ad_id: adIds.join(','),
                        custom_param_1: customParams.join(','),
                    };
                    c.BasePlat.instance.httpRequest(c.Global.server_report + '/log/spread.do', data, 'post').then(function (res) {
                        c.CommHelper.log('report batch show event success. adIds=' + adIds);
                    });
                }).catch(function () {
                    c.CommHelper.log('report batch show event error');
                });
            };
            /**
             * 上报AD点击事件
             * @param ad 广告数据
             * @param sceneCode 点击广告的位置(cp自定)
             */
            ReportHelper.clickEvent = function (ad, sceneCode) {
                if (sceneCode === void 0) { sceneCode = 0; }
                if (!c.Global.isInit) {
                    return;
                }
                var adid = ad.id;
                var pid = ad.pid;
                c.UserHelper.getUserAsyn().then(function (user) {
                    var openid = user.openid;
                    var data = {
                        product_id: c.Global.pid,
                        openid: openid,
                        target_to_product_id: pid,
                        custom_ad_id: adid,
                        custom_param_1: sceneCode
                    };
                    c.BasePlat.instance.httpRequest(c.Global.server_report + '/log/linkEvent.do', data, 'post').then(function (res) {
                        c.CommHelper.log('report ad click event success . adid = ' + adid);
                    });
                }).catch(function () {
                    c.CommHelper.log('report ad click event error. adid=' + adid);
                });
            };
            /**
             * 上报AD跳转事件
             * @param ad 广告数据
             * @param sceneCode 点击广告的位置(cp自定)
             */
            ReportHelper.adJumpEvent = function (ad, sceneCode) {
                if (sceneCode === void 0) { sceneCode = 0; }
                if (!c.Global.isInit) {
                    return;
                }
                var pid = ad.pid;
                var adid = ad.id;
                c.UserHelper.getUserAsyn().then(function (user) {
                    var openid = user.openid;
                    var data = {
                        product_id: c.Global.pid,
                        openid: openid,
                        leapt_to_game_id: pid,
                        custom_ad_id: adid,
                        custom_param_1: sceneCode
                    };
                    c.BasePlat.instance.httpRequest(c.Global.server_report + '/log/leapt.do', data, 'post').then(function (res) {
                        c.CommHelper.log('report ad jump event success. adid=' + adid);
                    });
                }).catch(function () {
                    c.CommHelper.log('report ad jump event error. adid=' + adid);
                });
            };
            /**
             * 启动事件
             * @param enterOptions 启动参数
             */
            ReportHelper.appRunEvent = function (enterOptions) {
                if (enterOptions.query.t == 'partake') { //t=partake&sid=&uid=&imgId=&partakeTime=
                    this.partakeIntoEvent(enterOptions.query.sid, enterOptions.query.uid, enterOptions.shareTicket || '', enterOptions.query.imgId || '', enterOptions.query.partakeTime || '');
                }
                else if (enterOptions.query.t) { //t=inner&a=adid    t=ad&a=adid  
                    this.adIntoEvent(enterOptions.query.a, enterOptions.referrerInfo ? enterOptions.referrerInfo.appId : '');
                }
            };
            ReportHelper.lastAddUpTime = 0;
            ReportHelper.MAX_DAY_TIME = 24 * 60 * 60;
            return ReportHelper;
        }());
        c.ReportHelper = ReportHelper;
    })(c = hzzxsdk.c || (hzzxsdk.c = {}));
})(hzzxsdk || (hzzxsdk = {}));
var hzzxsdk;
(function (hzzxsdk) {
    var c;
    (function (c) {
        var ShareHelper = /** @class */ (function () {
            function ShareHelper() {
            }
            ShareHelper.loadSharePicData = function () {
                var _this = this;
                if (this.sharePicPromise) {
                    return this.sharePicPromise;
                }
                this.sharePicPromise = new Promise(function (resolve, reject) {
                    _this.sharePicConfig = c.BasePlat.instance.findStorageByKey(c.Global.sharePicDataKey) || [];
                    var url = c.Global.server_res + '/cdn/conf/' + c.Global.appResPath + '/share_photo.conf';
                    c.BasePlat.instance.httpRequest(url).then(function (res) {
                        if (typeof res == 'object') {
                            _this.sharePicConfig = res;
                            c.BasePlat.instance.putStorage(c.Global.sharePicDataKey, res);
                            c.CommHelper.log('load share pic data success.');
                        }
                        else {
                            c.CommHelper.log('load share pic data fail.', res);
                        }
                        resolve(_this.sharePicConfig);
                    }).catch(function () {
                        resolve(_this.sharePicConfig);
                    });
                });
                return this.sharePicPromise;
            };
            /**
             * 随机获取分享图信息
             * @param defaultShareObj 默认分享对象，指定imageId=0或者服务器未配置时返回默认分享对象。
             * @returns
             */
            ShareHelper.getRandomShareObject = function (defaultShareObj) {
                if (!this.sharePicConfig || !this.sharePicConfig.length || typeof this.sharePicConfig != 'object') {
                    c.CommHelper.log('get share object fail. sharePicConfig is null or error.');
                    return defaultShareObj;
                }
                if (defaultShareObj.imageId == 0) {
                    c.CommHelper.log('get share object success. imageId=0.');
                    return defaultShareObj;
                }
                if (defaultShareObj.imageId) {
                    c.CommHelper.log('get share object , imageId=' + defaultShareObj.imageId);
                    var shareImageInfo = this.findShareObjectByImageId(defaultShareObj);
                    if (shareImageInfo) {
                        return shareImageInfo;
                    }
                }
                return this.findShareObjectByRandom(this.filterSecondary(defaultShareObj), defaultShareObj);
            };
            ShareHelper.filterSecondary = function (defaultShareObj) {
                var _this = this;
                var shareImageList = this.sharePicConfig.filter(function (item) {
                    if (item.ver) {
                        if (!defaultShareObj.version || item.ver != defaultShareObj.version) {
                            return false;
                        }
                    }
                    else {
                        if (defaultShareObj.version) {
                            return false;
                        }
                    }
                    return _this.filterOtherParam(item, defaultShareObj);
                }, this);
                var filterShareImageList = shareImageList;
                if (!shareImageList.length && defaultShareObj.version) {
                    filterShareImageList = this.sharePicConfig.filter(function (item) {
                        if (item.ver) {
                            return false;
                        }
                        return _this.filterOtherParam(item, defaultShareObj);
                    }, this);
                }
                return filterShareImageList;
            };
            ShareHelper.findShareObjectByRandom = function (filterShareImageList, defaultShareObj) {
                if (!filterShareImageList || filterShareImageList.length == 0) {
                    c.CommHelper.log('get share object1 : filter share image list is null');
                    return defaultShareObj;
                }
                var shareImage = c.CommHelper.roundTableSort(filterShareImageList, 'weight');
                if (!shareImage) {
                    c.CommHelper.log('get share object3 : random share image is null');
                    return defaultShareObj;
                }
                return this.getShareImageInfo(shareImage, defaultShareObj);
            };
            ShareHelper.findShareObjectByImageId = function (defaultShareObj) {
                var shareImage;
                var len = this.sharePicConfig.length;
                for (var i = 0; i < len; i++) {
                    if (this.sharePicConfig[i].pic_id == defaultShareObj.imageId) {
                        shareImage = this.sharePicConfig[i];
                        c.CommHelper.log('find share object imageId = ', defaultShareObj.imageId, ' , shareImage = ', shareImage);
                        break;
                    }
                }
                return this.getShareImageInfo(shareImage, defaultShareObj);
            };
            ShareHelper.getShareImageInfo = function (shareImage, defaultShareObj) {
                if (!shareImage) {
                    c.CommHelper.log('get share image info : share image is null.');
                    return undefined;
                }
                var shareInfo = __assign({}, defaultShareObj);
                shareInfo.title = (shareInfo.nickName ? shareImage.text.replace('{nickname}', shareInfo.nickName) : shareImage.text);
                shareInfo.imageUrl = shareImage.pic;
                shareInfo.imageId = shareImage.pic_id;
                delete shareInfo.nickName;
                delete shareInfo.scoreValue;
                // CommHelper.log('get share image info :', JSON.stringify(shareInfo));
                return shareInfo;
            };
            ShareHelper.filterOtherParam = function (item, defaultShareInfo) {
                if (Number(item.shield) === 1 && !c.GameConfigHelper.checkFission()) {
                    c.CommHelper.log('pic filter--shield=', item.shield, ' , id=', item.pic_id);
                    return false;
                }
                var currentScore = defaultShareInfo.scoreValue || 0;
                var limitScore = Number(item.number) || 0;
                if (currentScore < limitScore) {
                    c.CommHelper.log('pic filter--number=', item.number, ' , id=', item.pic_id);
                    return false;
                }
                if (!this.checkMoreOpenPeriodLimit(item.time_show)) {
                    c.CommHelper.log('pic filter--time_show=', item.time_show, ' , id=', item.pic_id);
                    return false;
                }
                if (!c.GameConfigHelper.gameVerContrData) {
                    c.CommHelper.log('pic filter--version controller config is null', ' , id=', item.pic_id);
                    return true;
                }
                if (Number(item.shield) === 1 && Number(c.GameConfigHelper.gameVerContrData.check) === 1) {
                    c.CommHelper.log('pic filter--shield=', item.shield, ', version controller config check=1 , id=', item.pic_id);
                    return false;
                }
                if (item.city) {
                    var currentCity = c.GameConfigHelper.gameVerContrData.city;
                    var currentProvince = c.GameConfigHelper.gameVerContrData.province;
                    if (c.CommHelper.isAbroadCity(c.GameConfigHelper.gameVerContrData)) {
                        c.CommHelper.log('pic filter--city=', item.city, ', id=', item.pic_id);
                        return false;
                    }
                    if (currentCity && item.city.indexOf(currentCity) != -1) {
                        c.CommHelper.log('pic filter--city=', item.city, ', current city=', currentCity, ', id=', item.pic_id);
                        return false;
                    }
                    else if (currentProvince && item.city.indexOf(currentProvince) != -1) {
                        c.CommHelper.log('pic filter--city=', item.city, ', current province=', currentProvince, ', id=', item.pic_id);
                        return false;
                    }
                }
                return true;
            };
            ShareHelper.checkMoreOpenPeriodLimit = function (showTimes) {
                if (!showTimes) {
                    return true;
                }
                var openTimesArray = showTimes.split(',');
                for (var i = 0; i < openTimesArray.length; i++) {
                    if (this.checkOpenTimes(openTimesArray[i])) {
                        return true;
                    }
                }
                return false;
            };
            ShareHelper.checkOpenTimes = function (showTime) {
                var isTimeLimit = false;
                if (showTime) {
                    var _a = showTime.indexOf('_') > 0 ? showTime.split('_', 2) : showTime.split('-', 2), timeStart = _a[0], timeEnd = _a[1];
                    var hour = new Date().getHours();
                    if (parseInt(timeStart || '0') <= hour && hour <= parseInt(timeEnd || '24')) {
                        isTimeLimit = true;
                    }
                }
                return isTimeLimit;
            };
            /**
             * 生成小程序分享链接
             * @param sceneCode 分享点
             * @param path 小程序页面路径
             * @param query 其他自定义参数键值对
             * @param imgId iamgeid
             */
            ShareHelper.genSharePath = function (sceneCode, path, query, imgId) {
                if (path === void 0) { path = '/pages/index/index'; }
                return path + '?' + this.genShareQuery(sceneCode, query, imgId);
            };
            /**
             * 生成分享请求参数(形如a=b&c=d)
             * @param sceneCode 分享点序号
             * @param query 其他自定义参数键值对
             * @param imgId
             */
            ShareHelper.genShareQuery = function (sceneCode, query, imgId) {
                if (typeof query != 'object') {
                    query = {};
                }
                query['t'] = 'partake';
                query['sid'] = 'partake_' + c.Global.pid + '_' + sceneCode;
                query['uid'] = c.UserHelper.getUser().openid;
                query['partakeTime'] = new Date().getTime();
                if (imgId) {
                    query['imgId'] = imgId;
                }
                return c.CommHelper.buildHttpQuery(query);
            };
            ShareHelper.sharePicConfig = [];
            return ShareHelper;
        }());
        c.ShareHelper = ShareHelper;
    })(c = hzzxsdk.c || (hzzxsdk.c = {}));
})(hzzxsdk || (hzzxsdk = {}));
var hzzxsdk;
(function (hzzxsdk) {
    var c;
    (function (c) {
        var AdHelper = /** @class */ (function () {
            function AdHelper() {
            }
            AdHelper.getRecommedList = function (isRandomSort, count, score) {
                if (isRandomSort === void 0) { isRandomSort = false; }
                if (count === void 0) { count = 0; }
                if (score === void 0) { score = 0; }
                return this.getAdList(isRandomSort, count, score, this.AD_TYPE_KEY_RECOMMED);
            };
            AdHelper.getBannerList = function (isRandomSort, count, score) {
                if (isRandomSort === void 0) { isRandomSort = false; }
                if (count === void 0) { count = 0; }
                if (score === void 0) { score = 0; }
                return this.getAdList(isRandomSort, count, score, this.AD_TYPE_KEY_BANNER);
            };
            AdHelper.getRewardedList = function (isRandomSort, count, score) {
                if (isRandomSort === void 0) { isRandomSort = false; }
                if (count === void 0) { count = 0; }
                if (score === void 0) { score = 0; }
                return this.getAdList(isRandomSort, count, score, this.AD_TYPE_KEY_REWARDED);
            };
            AdHelper.getIconAd = function (score) {
                var _this = this;
                if (score === void 0) { score = 0; }
                return new Promise(function (resolve, reject) {
                    var dataList = _this.iconDataList;
                    if (dataList == null || dataList == undefined || !dataList.length) {
                        c.CommHelper.log('get icon ad , No qualified ad item.');
                        resolve();
                        return;
                    }
                    _this.handleResCache(dataList).then(function (cacheDataList) {
                        var ad = c.CommHelper.roundTableSort(cacheDataList, 'table');
                        c.ReportHelper.batchShowEvent([ad]);
                        resolve(ad);
                    });
                });
            };
            AdHelper.preLoadAdData = function () {
                this.loadAdConfData();
            };
            AdHelper.loadAdConfData = function () {
                var _this = this;
                if (this.adConfPromise) {
                    return this.adConfPromise;
                }
                this.adConfPromise = new Promise(function (resolve, reject) {
                    var localAdList = c.BasePlat.instance.findStorageByKey('hzzxAdConfData') || [];
                    _this.checkAdConfVersion().then(function (currVer) {
                        if (currVer) {
                            _this.fetchAdConfByVersion(currVer).then(function (adList) {
                                if (adList) {
                                    _this.fixAdData(adList);
                                    resolve(adList);
                                    c.BasePlat.instance.putStorage('hzzxAdConfVersion', currVer);
                                    c.BasePlat.instance.putStorage('hzzxAdConfData', adList);
                                    c.CommHelper.log('update ad config data success.', adList);
                                    return;
                                }
                            });
                        }
                        _this.fixAdData(localAdList);
                        resolve(localAdList);
                    });
                });
                return this.adConfPromise;
            };
            // https://cdnht.tianjinyuren.cn/cdn/conf/1159/v.conf
            AdHelper.checkAdConfVersion = function () {
                return new Promise(function (resolve, reject) {
                    var url = c.Global.server_res + '/cdn/conf/' + c.Global.appResPath + '/v.conf';
                    var ver = undefined;
                    c.BasePlat.instance.httpRequest(url).then(function (res) {
                        var localVer = c.BasePlat.instance.findStorageByKey('hzzxAdConfVersion');
                        c.CommHelper.log('check ad config version: res=', res);
                        if (typeof res != 'object') {
                            c.CommHelper.log('check ad config version fail.');
                        }
                        else if (localVer == res.ver) {
                            c.CommHelper.log('check ad config version success, update=false. localVer=' + localVer + '; currVer=' + res.ver);
                        }
                        else {
                            ver = res.ver;
                            c.CommHelper.log('check ad config version success, update=true. localVer=' + localVer + '; currVer=' + res.ver);
                        }
                        resolve(ver);
                    }).catch(function (res) {
                        c.CommHelper.log('check ad config version error. ', res);
                        resolve(ver);
                    });
                });
            };
            AdHelper.fetchAdConfByVersion = function (ver) {
                return new Promise(function (resolve, reject) {
                    var url = c.Global.server_res + '/cdn/conf/' + c.Global.appResPath + '/' + ver;
                    c.BasePlat.instance.httpRequest(url).then(function (res) {
                        if (typeof res != 'object') {
                            c.CommHelper.log('fetch ad conf fail. res=', res);
                            resolve();
                            return;
                        }
                        resolve(res);
                        c.CommHelper.log('fetch ad conf success. len=' + res.length);
                    }).catch(function (err) {
                        c.CommHelper.log('fetch ad conf error. ', err);
                        resolve();
                    });
                });
            };
            AdHelper.fixAdData = function (dataList) {
                var _this = this;
                return new Promise(function (resolve, reject) {
                    Promise.all([c.GameConfigHelper.getGameVerContrLevel(''), _this.loadFilterData()])
                        .then(function (_a) {
                        var verContrData = _a[0], filterData = _a[1];
                        _this.mFilterData = filterData;
                        var iterationList = JSON.parse(JSON.stringify(dataList));
                        for (var _i = 0, iterationList_1 = iterationList; _i < iterationList_1.length; _i++) {
                            var ad = iterationList_1[_i];
                            //修复数据
                            _this.reviseAd(ad, _this.mFilterData.gender);
                            //分类别
                            _this.classifyAd(ad, filterData, verContrData);
                        }
                        resolve();
                    }).catch(function (res) {
                        resolve();
                    });
                });
            };
            AdHelper.classifyAd = function (ad, filterData, verContrData) {
                if (ad.platform && filterData.os && ad.platform != filterData.os && filterData.os != 'devtools') {
                    return;
                }
                else if (ad.sex && ad.sex != 3 && ad.sex != filterData.gender) {
                    return;
                }
                if (this.isCityInvisible(verContrData, ad.city_hide)) {
                    c.CommHelper.log('check city hide：', ad.city_hide, ' ; id:', ad.id);
                    return;
                }
                if (!this.isCityVisible(verContrData, ad.city_show)) {
                    c.CommHelper.log('check city show：', ad.city_show, ' ; id:', ad.id);
                    return;
                }
                if (ad.category == this.AD_TYPE_ICON) {
                    if (!this.iconDataList) {
                        this.iconDataList = [];
                    }
                    this.iconDataList.push(ad);
                }
                else if (ad.category == this.AD_TYPE_REWARDED) {
                    if (!this.rewardDataList) {
                        this.rewardDataList = [];
                    }
                    this.rewardDataList.push(ad);
                }
                else if (ad.category == this.AD_TYPE_BANNER) {
                    if (!this.bannerDataList) {
                        this.bannerDataList = [];
                    }
                    this.bannerDataList.push(ad);
                }
                else if (ad.category == this.AD_TYPE_RECOMMED) {
                    if (!this.recommedDataList) {
                        this.recommedDataList = [];
                    }
                    this.recommedDataList.push(ad);
                }
            };
            AdHelper.reviseAd = function (ad, gender) {
                if (!ad.start_time || !ad.end_time || !ad.plan_number) {
                    ad.page += ad.page.indexOf('?') == -1 ? '?' : '&';
                    ad.page += 't=inner&a=' + ad.id + '&gender=' + gender + '&pid=' + c.Global.pid;
                }
                var bridge_appid = c.CommHelper.getHttpQueryValueByKey(ad.page, 'bridge_appid');
                var bridge_path = c.CommHelper.getHttpQueryValueByKey(ad.page, 'bridge_path');
                if (bridge_appid) {
                    ad.page = bridge_path + '?' + ad.page
                        .replace('bridge_appid=' + bridge_appid, 'bridge2appid=' + ad.appid)
                        .replace('bridge_path=' + bridge_path, 'bridge2path=' + ad.page.split('?')[0])
                        .split('?')[1];
                    ad.appid = bridge_appid;
                }
                if (ad.ad_image && ad.ad_image.indexOf('http') != 0) {
                    ad.ad_image = c.Global.server_res + '/cdn/images/' + ad.ad_image;
                }
                if (ad.icon && ad.icon.indexOf('http') != 0) {
                    ad.icon = c.Global.server_res + '/cdn/images/' + ad.icon;
                }
                if (ad.image && ad.image.indexOf('http') != 0) {
                    ad.image = c.Global.server_res + '/cdn/images/' + ad.image;
                }
                if (ad.banner && ad.banner.indexOf('http') != 0) {
                    ad.banner = c.Global.server_res + '/cdn/images/' + ad.banner;
                }
                ad.clicked = !this.checkFirstClick(Number(ad.id));
                if (ad.clicked) {
                    ad.table = Number(ad.table) / 2;
                }
                return ad;
            };
            /**
             * gender: -1=不限制性别|1=男|2=女|0=未知
             */
            AdHelper.loadFilterData = function () {
                return new Promise(function (resolve, reject) {
                    c.BasePlat.instance.getUserInfo().then(function (userInfo) {
                        resolve({
                            os: c.BasePlat.instance.getSystemInfo().platform,
                            gender: Number(userInfo.gender)
                        });
                    }).catch(function () {
                        resolve({
                            os: c.BasePlat.instance.getSystemInfo().platform,
                            gender: -1
                        });
                    });
                });
            };
            /**
             * 获取AD列表
             * @param isRandomSort 是否使用权重算法排序后返回，否则按后台配置原样返回。默认为false,即按后台配置原样返回。
             * @param count 返回数量，如果全部返回可设置为0.默认全部返回
             * @param score 根据需要传入当前玩家的等级|分数|游戏时长等数值
             * @param adType
             * @returns
             */
            AdHelper.getAdList = function (isRandomSort, count, score, adType) {
                var _this = this;
                if (isRandomSort === void 0) { isRandomSort = false; }
                if (count === void 0) { count = 0; }
                if (score === void 0) { score = 0; }
                if (adType === void 0) { adType = ''; }
                return new Promise(function (resolve, reject) {
                    var dataList = _this.recommedDataList;
                    if (adType == _this.AD_TYPE_KEY_REWARDED) {
                        dataList = _this.rewardDataList;
                    }
                    else if (adType == _this.AD_TYPE_KEY_ICON) {
                        dataList = _this.iconDataList;
                    }
                    else if (adType == _this.AD_TYPE_KEY_RECOMMED) {
                        dataList = _this.recommedDataList;
                    }
                    else if (adType == _this.AD_TYPE_KEY_BANNER) {
                        dataList = _this.bannerDataList;
                    }
                    if (dataList == null || dataList == undefined || !dataList.length) {
                        c.CommHelper.log('get ad list, No qualified ad item, ad list is null. adType = ' + adType);
                        resolve();
                        return;
                    }
                    _this.handleResCache(dataList).then(function (cacheDataList) {
                        var adList = isRandomSort ? c.CommHelper.roundTableSort(cacheDataList, 'table', false) : cacheDataList;
                        if (count) {
                            adList = adList.slice(0, count);
                        }
                        c.ReportHelper.batchShowEvent(adList);
                        resolve(adList);
                        c.CommHelper.log('get ad list, adType=', adType, ' , data list = ', adList);
                    });
                });
            };
            AdHelper.isCityVisible = function (verContrData, city) {
                var currProvince = verContrData.province;
                var currentCity = verContrData.city;
                return (!city || city == 'all') && !c.CommHelper.isAbroadCity(verContrData)
                    || city && currentCity && city.indexOf(currentCity) != -1
                    || city && currProvince && city.indexOf(currProvince) != -1;
            };
            AdHelper.isCityInvisible = function (verContrData, city) {
                var currProvince = verContrData.province;
                var currCity = verContrData.city;
                return city == 'all'
                    || c.CommHelper.isAbroadCity(verContrData)
                    || city && currCity && city.indexOf(currCity) != -1
                    || city && currProvince && city.indexOf(currProvince) != -1;
            };
            AdHelper.handleResCache = function (adList, isForceCheck) {
                if (isForceCheck === void 0) { isForceCheck = false; }
                return __awaiter(this, void 0, void 0, function () {
                    var len, i, ad;
                    return __generator(this, function (_a) {
                        if (!adList) {
                            return [2 /*return*/, adList];
                        }
                        len = adList.length;
                        for (i = 0; i < len; i++) {
                            ad = adList[i];
                            this.handleResCacheByKey('ad_image', ad, isForceCheck);
                            this.handleResCacheByKey('icon', ad, isForceCheck);
                            this.handleResCacheByKey('image', ad, isForceCheck);
                            this.handleResCacheByKey('banner', ad, isForceCheck);
                        }
                        return [2 /*return*/, adList];
                    });
                });
            };
            AdHelper.handleResCacheByKey = function (key, ad, isForceCheck) {
                if (isForceCheck === void 0) { isForceCheck = false; }
                return __awaiter(this, void 0, void 0, function () {
                    var targetValue, _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                targetValue = ad[key];
                                if (!(targetValue && targetValue.indexOf("://usr/hzzxsdk/") == -1)) return [3 /*break*/, 3];
                                if (!isForceCheck) return [3 /*break*/, 2];
                                _a = ad;
                                _b = key;
                                return [4 /*yield*/, c.BasePlat.instance.getLocalCacheResUrl(targetValue, false)];
                            case 1:
                                _a[_b] = _c.sent();
                                return [3 /*break*/, 3];
                            case 2:
                                ad[key] = c.CommHelper.getResFromMemoryCache(targetValue);
                                if (!ad[key]) {
                                    ad[key] = targetValue;
                                    c.BasePlat.instance.getLocalCacheResUrl(ad[key], false);
                                }
                                _c.label = 3;
                            case 3: return [2 /*return*/, ad];
                        }
                    });
                });
            };
            /**
             * 点击广告并跳转
             * @param ad 广告数据
             * @param sceneCode 点击广告的位置
             * @returns Promise<{navigateTo:true,firstClick:true}>
             */
            AdHelper.clickAndNavigate = function (ad, sceneCode) {
                var _this = this;
                if (sceneCode === void 0) { sceneCode = 0; }
                return new Promise(function (resolve, reject) {
                    wx.getNetworkType({
                        success: function (res) {
                            if (res.networkType == 'none') {
                                wx.showToast({ title: 'network error,navigate to app fail.', icon: 'none' });
                                resolve({ navigateTo: false, firstClick: false });
                                return;
                            }
                            c.ReportHelper.clickEvent(ad, sceneCode);
                            c.BasePlat.instance.navigateTo(ad).then(function (res) {
                                var isFristClick = _this.checkFirstClick(Number(ad.id), true);
                                resolve({ navigateTo: true, firstClick: isFristClick });
                                c.ReportHelper.adJumpEvent(ad, sceneCode);
                            }).catch(function (res) {
                                resolve({ navigateTo: false, firstClick: false });
                            });
                        },
                        fail: function () {
                            resolve({ navigateTo: false, firstClick: false });
                        }
                    });
                });
            };
            AdHelper.checkFirstClick = function (adId, isSave) {
                if (isSave === void 0) { isSave = false; }
                var isFirstClick = false;
                var localClickRecord = c.BasePlat.instance.findStorageByKey('hzzxadClick') || [];
                if (localClickRecord.indexOf(adId) == -1) {
                    isFirstClick = true;
                    if (isSave) {
                        localClickRecord.push(adId);
                        c.BasePlat.instance.putStorage('hzzxadClick', localClickRecord);
                    }
                }
                return isFirstClick;
            };
            AdHelper.AD_TYPE_RECOMMED = 1;
            AdHelper.AD_TYPE_ICON = 2;
            AdHelper.AD_TYPE_REWARDED = 3;
            AdHelper.AD_TYPE_BANNER = 4;
            AdHelper.AD_TYPE_KEY_RECOMMED = "RECOMMED";
            AdHelper.AD_TYPE_KEY_ICON = "ICON";
            AdHelper.AD_TYPE_KEY_REWARDED = "REWARDED";
            AdHelper.AD_TYPE_KEY_BANNER = "BANNER";
            return AdHelper;
        }());
        c.AdHelper = AdHelper;
    })(c = hzzxsdk.c || (hzzxsdk.c = {}));
})(hzzxsdk || (hzzxsdk = {}));
var hzzxsdk;
(function (hzzxsdk) {
    var c;
    (function (c) {
        var InitHelper = /** @class */ (function () {
            function InitHelper() {
            }
            InitHelper.preHandelInitParams = function (pid, isNeedUnionid) {
                if (isNeedUnionid === void 0) { isNeedUnionid = false; }
                if (c.Global.isInit) {
                    c.CommHelper.log('multiple init sdk.');
                    return true;
                }
                c.Global.pid = pid;
                c.Global.appResPath = pid;
                c.Global.enterOptions = c.BasePlat.instance.getEnterOptions();
                c.Global.isNeedUnionid = isNeedUnionid;
                c.Global.isInit = true;
                c.CommHelper.log('sdk init begin, pid=', pid, 'enterOptions', JSON.stringify(c.Global.enterOptions));
                c.Global.totalCount = Number(c.BasePlat.instance.findStorageByKey(c.Global.totalKey) || 0);
                c.Global.gapCount = Number(c.BasePlat.instance.findStorageByKey(c.Global.gapKey) || 0);
                c.Global.lastAddUpDate = c.BasePlat.instance.findStorageByKey(c.Global.lastAddUpDataKey);
                c.CommHelper.resetTotalCount(c.Global.lastAddUpDate);
                c.BasePlat.instance.setInterval(c.ReportHelper.addUpGapOnlineTime, 1000);
                // 预加载配置
                c.ShareHelper.loadSharePicData();
                c.AdHelper.preLoadAdData();
                c.GameConfigHelper.getGameConfig();
                return false;
            };
            InitHelper.init = function (pid, isNeedUnionid) {
                if (isNeedUnionid === void 0) { isNeedUnionid = false; }
                if (c.InitHelper.preHandelInitParams(pid, isNeedUnionid)) {
                    c.CommHelper.log('multiple init sdk.');
                    return c.UserHelper.getUserAsyn().then(function (user) { return user.openid; });
                }
                c.BasePlat.instance.preHandleInit();
                return new Promise(function (resolve, reject) {
                    c.BasePlat.instance.getUser(c.Global.enterOptions).then(function (user) {
                        if (c.UserHelper.setUser(user)) {
                            c.ReportHelper.appRunEvent(c.Global.enterOptions);
                            c.CommHelper.log('init success. openid=' + user.openid);
                            resolve(user.openid);
                        }
                        else {
                            c.CommHelper.log('init fail.');
                            reject();
                        }
                    }).catch(function (err) {
                        c.CommHelper.log('init error.', err);
                        reject();
                    });
                });
            };
            InitHelper.initWithThirdUser = function (pid, user) {
                if (c.InitHelper.preHandelInitParams(pid)) {
                    c.CommHelper.log('multiple init sdk.');
                    return c.UserHelper.getUserAsyn().then(function (user) { return user.openid; });
                }
                c.BasePlat.instance.preHandleInit();
                return new Promise(function (resolve, reject) {
                    c.UserHelper.thirdLogin(user).then(function (resultUser) {
                        c.ReportHelper.appRunEvent(c.Global.enterOptions);
                        resolve(resultUser.openid);
                        c.CommHelper.log('init with third user success. openid=' + resultUser.openid);
                    }).catch(function (err) {
                        c.CommHelper.log('init with third user error.', err);
                        reject();
                    });
                });
            };
            return InitHelper;
        }());
        c.InitHelper = InitHelper;
    })(c = hzzxsdk.c || (hzzxsdk.c = {}));
})(hzzxsdk || (hzzxsdk = {}));
/// <reference path="c/Global.ts" />
/// <reference path="c/BasePlat.ts" />
/// <reference path="c/UserHelper.ts" />
/// <reference path="c/ReportHelper.ts" />
/// <reference path="c/ShareHelper.ts" />
/// <reference path="c/AdHelper.ts" />
/// <reference path="c/InitHelper.ts" />
var hzzxsdk;
(function (hzzxsdk) {
    /**
     * 初始化并获取openid
     * @param pid 产品ID
     * @param isNeedUnionid 默认为false--不获取Unionid|true--需要获取unionid
     * @returns openid
     */
    function initAndGetOpenId(pid, isNeedUnionid) {
        if (isNeedUnionid === void 0) { isNeedUnionid = false; }
        return hzzxsdk.c.InitHelper.init(pid, isNeedUnionid);
    }
    hzzxsdk.initAndGetOpenId = initAndGetOpenId;
    /**
     * 用第三方账号初始化SDK，并返回openid
     * @param pid 产品ID
     * @param user 第三方账号
     * @returns openid
     */
    function initWithThirdUser(pid, user) {
        return hzzxsdk.c.InitHelper.initWithThirdUser(pid, user);
    }
    hzzxsdk.initWithThirdUser = initWithThirdUser;
    /**
     * 获取用户账号信息
     * @returns IUser
     */
    function getUser() {
        return hzzxsdk.c.UserHelper.getUser();
    }
    hzzxsdk.getUser = getUser;
    /**
     * 设置debug模式,以方便查看SDK日志
     * 默认为关闭
     * @param debugMode 是否开启debug模式
     */
    function setDebugMode(debugMode) {
        hzzxsdk.c.CommHelper.openDebugMode(debugMode);
    }
    hzzxsdk.setDebugMode = setDebugMode;
    /**
     * 获取游戏自定义配置
     * @param pid 产品ID
     * @returns
     */
    function getGameConfig(pid) {
        return hzzxsdk.c.GameConfigHelper.getGameConfig(pid);
    }
    hzzxsdk.getGameConfig = getGameConfig;
    /**
     * 获取游戏版本控制等级
     * cp可以根据check=1|2|3 字段的值来作相应处理。1为最高控制等级，2次之，3最低。
     * @param codeVersion 产品当前版本号
     * @param pid 产品ID
     * @returns
     */
    function getGameVerContrLevel(codeVersion, pid) {
        return hzzxsdk.c.GameConfigHelper.getGameVerContrLevel(codeVersion, pid);
    }
    hzzxsdk.getGameVerContrLevel = getGameVerContrLevel;
    /**
     * 检查裂变状态
     * @returns ture=允许|false=禁止
     */
    function checkFission() {
        return hzzxsdk.c.GameConfigHelper.checkFission();
    }
    hzzxsdk.checkFission = checkFission;
    /**
     * 获取分享对象信息
     * @param shareInputObject
     * @returns IShareOutObject
     */
    function getShareObject(shareInputObject) {
        return hzzxsdk.c.BasePlat.instance.getShareObject(shareInputObject);
        ;
    }
    hzzxsdk.getShareObject = getShareObject;
    /**
     * 随机获取单个图片广告
     * @param score 默认值为0
     * @returns IAd
     */
    function getIconAd(score) {
        if (score === void 0) { score = 0; }
        return hzzxsdk.c.AdHelper.getIconAd(score);
    }
    hzzxsdk.getIconAd = getIconAd;
    /**
     * 获取推荐广告列表
     * @param isRandomSort 是否使用权重算法排序后返回，否则按后台配置原样返回。默认为false,即按后台配置原样返回。
     * @param count 返回数量，如果全部返回可设置为0.默认全部返回
     * @param score 根据需要传入当前玩家的等级|分数|游戏时长等数值
     * @returns IAd[]
     */
    function getRecommedAdList(isRandomSort, count, score) {
        if (isRandomSort === void 0) { isRandomSort = false; }
        if (count === void 0) { count = 0; }
        if (score === void 0) { score = 0; }
        return hzzxsdk.c.AdHelper.getRecommedList(isRandomSort, count, score);
    }
    hzzxsdk.getRecommedAdList = getRecommedAdList;
    /**
     * 获取banner广告列表
     * @param isRandomSort 是否使用权重算法排序后返回，否则按后台配置原样返回。默认为false,即按后台配置原样返回。
     * @param count 返回数量，如果全部返回可设置为0.默认全部返回
     * @param score 根据需要传入当前玩家的等级|分数|游戏时长等数值
     * @returns IAd[]
     */
    function getBannerAdList(isRandomSort, count, score) {
        if (isRandomSort === void 0) { isRandomSort = false; }
        if (count === void 0) { count = 0; }
        if (score === void 0) { score = 0; }
        return hzzxsdk.c.AdHelper.getBannerList(isRandomSort, count, score);
    }
    hzzxsdk.getBannerAdList = getBannerAdList;
    /**
     * 获取激励视频广告列表
     * @param isRandomSort 是否使用权重算法排序后返回，否则按后台配置原样返回。默认为false,即按后台配置原样返回。
     * @param count 返回数量，如果全部返回可设置为0.默认全部返回
     * @param score 根据需要传入当前玩家的等级|分数|游戏时长等数值
     * @returns IAd[]
     */
    function getRewardedAdList(isRandomSort, count, score) {
        if (isRandomSort === void 0) { isRandomSort = false; }
        if (count === void 0) { count = 0; }
        if (score === void 0) { score = 0; }
        return hzzxsdk.c.AdHelper.getRewardedList(isRandomSort, count, score);
    }
    hzzxsdk.getRewardedAdList = getRewardedAdList;
    /**
     * 广告点击并跳转
     * @param ad 广告数据
     * @param sceneCode 点击广告的位置
     * @returns Promise{navigateTo:true,firstClick:true}
     */
    function clickAndNavigate(ad, sceneCode) {
        if (sceneCode === void 0) { sceneCode = 0; }
        return hzzxsdk.c.AdHelper.clickAndNavigate(ad, sceneCode);
    }
    hzzxsdk.clickAndNavigate = clickAndNavigate;
    /**
       * 自定义打点
       * @param id
       * @param customParam1
       * @param customParam2
       */
    function reportCustomEvent(id, customParam1, customParam2) {
        if (id === void 0) { id = 0; }
        if (customParam1 === void 0) { customParam1 = ''; }
        if (customParam2 === void 0) { customParam2 = ''; }
        hzzxsdk.c.ReportHelper.customEvent(id, customParam1, customParam2);
    }
    hzzxsdk.reportCustomEvent = reportCustomEvent;
    /**
     * 上报视频结束事件
     * 在激励视频结束时上报
     * @param isClick 是否有点击；默认为false
     */
    function reportAdVideoEndEvent(isClick) {
        if (isClick === void 0) { isClick = false; }
        hzzxsdk.c.ReportHelper.videoShowAndClickCountEvent(isClick);
    }
    hzzxsdk.reportAdVideoEndEvent = reportAdVideoEndEvent;
})(hzzxsdk || (hzzxsdk = {}));
/// <reference path="hzzxsdk.ts" />
console.log('欢迎使用hzzxsdk,当前版本号' + hzzxsdk.c.Global.sdkVersion + ',发布时间:' + hzzxsdk.c.Global.sdkBuildTimeStamp);
if (typeof wx == 'object' && !wx.redirectTo) {
    window['hzzxsdk'] = hzzxsdk;
}
else if (typeof module != 'undefined') {
    module.exports = hzzxsdk;
}
else {
    window['hzzxsdk'] = hzzxsdk;
}
var hzzxsdk;
(function (hzzxsdk) {
    var c;
    (function (c) {
        var CommHelper = /** @class */ (function () {
            function CommHelper() {
            }
            CommHelper.openDebugMode = function (isDebugMode) {
                this.isDebug = isDebugMode;
            };
            CommHelper.log = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var tag = 'hzzx==>';
                this.isDebug && console.log.apply(console, __spreadArray([tag], args, false));
            };
            /**
             * parse user channel
             * @param options 小游戏打开的参数（包括冷启动和热启动）
             * @returns
             */
            CommHelper.parseUserChannel = function (options) {
                var channel = {
                    channelType: '',
                    channelId: ''
                };
                if (options.query.t == 'partake') {
                    channel.channelType = options.query.t;
                    channel.channelId = options.query.sid;
                }
                else if (options.query.t) {
                    channel.channelType = options.query.t;
                    channel.channelId = options.query.a;
                }
                else {
                    channel.channelType = 'oth';
                    channel.channelId = options.scene;
                }
                return channel;
            };
            /**
             * 获取指定http请求参数的值
             * @param queryParams
             * @param queryKey
             */
            CommHelper.getHttpQueryValueByKey = function (queryParams, queryKey) {
                try {
                    var r = queryParams.match(new RegExp('(\\?|&)' + queryKey + "=([^&]*)(&|$)"));
                    if (r) {
                        return r[2];
                    }
                }
                catch (error) {
                }
                return '';
            };
            CommHelper.buildHttpQuery = function (reqParams) {
                var temp = '';
                for (var key in reqParams) {
                    temp += key + '=' + reqParams[key] + '&';
                }
                return temp.substr(0, temp.length - 1);
            };
            /**
             * @param dataList
             * @param weightKey 权重字段Key
             * @param popOne true表示只抽取一个，false表示返回排序列表
             */
            CommHelper.roundTableSort = function (dataList, weightKey, popOne) {
                if (popOne === void 0) { popOne = true; }
                if (!dataList || !dataList.length) {
                    return [];
                }
                var headList = [];
                var tableList = [];
                var tableCount = 0;
                for (var i = 0; i < dataList.length || 0; i++) {
                    if (isNaN(dataList[i][weightKey])) {
                        continue;
                    }
                    dataList[i][weightKey] = Number(dataList[i][weightKey]);
                    if (dataList[i][weightKey] <= this.thresholdLow) {
                        continue;
                    }
                    if (dataList[i][weightKey] >= this.thresholdUp) {
                        headList.push(dataList[i]);
                        continue;
                    }
                    tableList.push(dataList[i]);
                    tableCount += dataList[i][weightKey];
                }
                if (!tableCount || !tableList.length) {
                    return headList;
                }
                var sortList = [];
                while (tableList.length) {
                    var point = Math.random();
                    var sectorStart = 0;
                    for (var i = 0; i < tableList.length; i++) {
                        var sectorEnd = sectorStart + tableList[i][weightKey] / tableCount;
                        if (point >= sectorStart && point < sectorEnd) {
                            sortList.push(tableList[i]);
                            tableCount -= tableList[i][weightKey];
                            tableList.splice(i, 1);
                            break;
                        }
                        sectorStart = sectorEnd;
                    }
                }
                var resultList = headList.concat(sortList);
                if (popOne) {
                    return resultList[0];
                }
                else {
                    return resultList;
                }
            };
            CommHelper.getFormatNowDate = function () {
                var date = new Date();
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month <= 9) {
                    month = "0" + month;
                }
                if (strDate <= 9) {
                    strDate = "0" + strDate;
                }
                return date.getFullYear() + "-" + month + "-" + strDate;
            };
            CommHelper.resetTotalCount = function (lastReportDate) {
                var curDate = this.getFormatNowDate();
                if (lastReportDate == curDate) {
                    return;
                }
                c.Global.lastAddUpDate = curDate;
                c.Global.totalCount = 0;
                c.Global.gapCount = 0;
                c.BasePlat.instance.putStorage(c.Global.totalKey, 0, false);
                c.BasePlat.instance.putStorage(c.Global.gapKey, 0, false);
            };
            CommHelper.compareVersionTx = function (v1, v2) {
                v1 = v1.split('.');
                v2 = v2.split('.');
                var len = Math.max(v1.length, v2.length);
                while (v1.length < len) {
                    v1.push('0');
                }
                while (v2.length < len) {
                    v2.push('0');
                }
                for (var i = 0; i < len; i++) {
                    var num1 = parseInt(v1[i]);
                    var num2 = parseInt(v2[i]);
                    if (num1 > num2) {
                        return 1;
                    }
                    else if (num1 < num2) {
                        return -1;
                    }
                }
                return 0;
            };
            CommHelper.paraseChannelUserId = function (options) {
                if (!options || !options.query) {
                    return "";
                }
                if (options.query.userid) {
                    return options.query.uid;
                }
                return "";
            };
            CommHelper.addRes2MemoryCache = function (url) {
                if (this.mCacheDataList == null || this.mCacheDataList == undefined) {
                    return;
                }
                if (this.mCacheDataList.indexOf(url) == -1) {
                    this.mCacheDataList.push(url);
                }
            };
            CommHelper.getResFromMemoryCache = function (url) {
                if (this.mCacheDataList == null || this.mCacheDataList == undefined) {
                    return '';
                }
                url = url.replace('https://', '');
                var len = this.mCacheDataList.length;
                for (var i = 0; i < len; i++) {
                    var item = this.mCacheDataList[i];
                    if (item.indexOf(url) != -1) {
                        return item;
                    }
                }
                return "";
            };
            CommHelper.isAbroadCity = function (verContrData) {
                var province = verContrData.province;
                var city = verContrData.city;
                var country = verContrData.country;
                return country && country.indexOf('中国') == -1
                    || province && province.indexOf('台湾') != -1
                    || city && city.indexOf('台湾') != -1
                    || province && province.indexOf('香港') != -1
                    || city && city.indexOf('香港') != -1
                    || province && province.indexOf('澳门') != -1
                    || city && city.indexOf('澳门') != -1;
            };
            CommHelper.isDebug = false;
            CommHelper.thresholdUp = Number.MAX_VALUE;
            CommHelper.thresholdLow = 0;
            CommHelper.mCacheDataList = [];
            return CommHelper;
        }());
        c.CommHelper = CommHelper;
    })(c = hzzxsdk.c || (hzzxsdk.c = {}));
})(hzzxsdk || (hzzxsdk = {}));
var hzzxsdk;
(function (hzzxsdk) {
    var c;
    (function (c) {
        var GameConfigHelper = /** @class */ (function () {
            function GameConfigHelper() {
            }
            GameConfigHelper.getGameConfig = function (pid) {
                var _this = this;
                return new Promise(function (resolve, reject) {
                    pid = pid || c.Global.pid;
                    if (!pid) {
                        c.CommHelper.log('fetch game config fail. pid is null.）');
                        resolve();
                        return;
                    }
                    if (!_this.gameConfigPromise) {
                        var url = c.Global.server_login + '/conf/pull.do?product_id=' + pid;
                        _this.gameConfigPromise = c.BasePlat.instance.httpRequest(url);
                    }
                    _this.gameConfigPromise.then(function (res) {
                        if (200 == res.code && res.result && (typeof res.result == 'object')) {
                            c.CommHelper.log('fetch game config success. res=', res.result);
                            resolve(res.result);
                        }
                        else {
                            c.CommHelper.log('fetch game config fail. res=', res);
                            resolve();
                        }
                    }).catch(function (err) {
                        c.CommHelper.log('fetch game config error.', err);
                        resolve();
                    });
                });
            };
            /**
             * 获取版本控制等级
             *
             * @param codeVersion 程序代码版本
             * @param pid
             * @returns
             */
            GameConfigHelper.getGameVerContrLevel = function (codeVersion, pid) {
                var _this = this;
                return new Promise(function (resolve, reject) {
                    c.Global.appCodeVersion = codeVersion ? codeVersion : "";
                    pid = pid || c.Global.pid;
                    var data = {
                        check: 1
                    };
                    if (!pid) {
                        c.CommHelper.log('fetch game version controller level fail. pid is null.');
                        resolve(data);
                        if (codeVersion) {
                            _this.gameVerContrData = data;
                        }
                    }
                    else {
                        if (!_this.gameVerContrPromise) {
                            var url = c.Global.server_login + '/server/shield.do?product_id=' + pid + '&ver=' + codeVersion;
                            _this.gameVerContrPromise = c.BasePlat.instance.httpRequest(url);
                        }
                        _this.gameVerContrPromise.then(function (res) {
                            if (200 == res.code && res.result && (typeof res.result == 'object')) {
                                c.CommHelper.log('fetch game version controller level success. res=', res.result);
                                data = res.result;
                                resolve(res.result);
                            }
                            else {
                                c.CommHelper.log('fetch game version controller level fail. res=', res);
                                resolve({ check: 1 });
                            }
                            if (codeVersion) {
                                _this.gameVerContrData = data;
                            }
                        }).catch(function (err) {
                            c.CommHelper.log('fetch game version controller level error.', err);
                            resolve(data);
                            if (codeVersion) {
                                _this.gameVerContrData = data;
                            }
                        });
                    }
                });
            };
            /**
             * 检查裂变--分享或者视频
             * @returns true=可以强裂变，false=不可以强裂变
             */
            GameConfigHelper.checkFission = function () {
                var sceneArray = [1031, 1032, 1042, 1011, 1012, 1013, 1017, 1047, 1049, 1053, 1054, 1084, 1106, 2001, 2970, 1000, 1005, 1006, 1025, 1027, 1030];
                if (!this.checkCurrentScene(sceneArray)) {
                    return false;
                }
                return this.checkHistoryScene(sceneArray);
            };
            GameConfigHelper.checkHistoryScene = function (sceneArray) {
                var historyScene = c.UserHelper.getUser().channel_id ? Number(c.UserHelper.getUser().channel_id) : 0;
                if (1048 == historyScene) {
                    c.CommHelper.log('check history scene , fission1=false , history scene = ' + historyScene);
                    return false;
                }
                var isHistoryFission = sceneArray.indexOf(historyScene) == -1;
                c.CommHelper.log('check history scene , fission2=', isHistoryFission, ', history scene = ' + historyScene);
                return isHistoryFission;
            };
            GameConfigHelper.checkCurrentScene = function (sceneArray) {
                // small program assistant APPID
                var spaAppId = 'wxcff7381e631cf54e';
                if (c.Global.enterOptions && c.Global.enterOptions.scene == '1037' && c.Global.enterOptions.referrerInfo && spaAppId == c.Global.enterOptions.referrerInfo.appId) {
                    c.CommHelper.log('check current scene , fission1=false');
                    return false;
                }
                if (c.Global.enterOptions && 1048 == c.Global.enterOptions.scene && (!c.Global.enterOptions.query || !c.Global.enterOptions.query.type)) {
                    c.CommHelper.log('check current scene , fission2=false , current scene = ' + c.Global.enterOptions.scene);
                    return false;
                }
                // 1027,1053,1084,2001,2970
                var isLoaclFission = sceneArray.indexOf(c.Global.enterOptions.scene) == -1;
                if (!isLoaclFission) {
                    c.CommHelper.log('check current scene , fission3=false , current scene = ' + c.Global.enterOptions.scene);
                    return false;
                }
                return true;
            };
            return GameConfigHelper;
        }());
        c.GameConfigHelper = GameConfigHelper;
    })(c = hzzxsdk.c || (hzzxsdk.c = {}));
})(hzzxsdk || (hzzxsdk = {}));
