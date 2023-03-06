declare namespace hzzxsdk {
    interface IUser {
        openid: string;
        unionid?: string;
        last_login_time?: number;
        create_time?: number;
        share_time?: number;
        channel_type?: string;
        channel_id?: string;
        channel_openid?: string;
    }
    interface IUserChannel {
        channelType: string;
        channelId: string;
    }
    interface IUserInfo {
        /**
         * 用户昵称
         */
        nickName?: string;
        /**
         * 用户头像
         */
        avatarUrl?: string;
        /**
         * 用户的性别，值为1时是男性，值为2时是女性，值为0时是未知，-1是无法获取
         */
        gender?: number;
    }
    /**
     * 分享输出对象
     */
    interface IShareOutObject {
        /**
         * 转发标题，不传则默认使用当前小游戏的昵称。
         */
        title?: string;
        /**
         * 转发显示图片的链接，可以是网络图片路径或本地图片文件路径或相对代码包根目录的图片文件路径。显示图片长宽比是 5:4
         */
        imageUrl?: string;
        /**
         * 查询字符串，从这条转发消息进入后，可通过 wx.getLaunchOptionsSync() 或 wx.onShow() 获取启动参数中的 query。必须是 key1=val1&key2=val2 的格式。
         */
        query?: string;
        /**
         * 独立分包路径。详见 小游戏独立分包指南
         */
        path?: string;
    }
    /**
     * 分享输入对象
     */
    interface IShareInputObject {
        /**
         * 分享触发点序号，比如右上角分享点为1，首页分享按钮为2，游戏主界面分享为3，过关炫耀分享为4，等等；CP自行定义或根据运营建议，事后统计时可以确定分享点来源位置即可。
         */
        sceneCode: number;
        /**
         * 分享标题（由于随机分享内容从网络获取，可能会失败，失败后会使用这个默认标题，如果不设置最后也会由对应平台自动设置）
         */
        title?: string;
        /**
         * 分享图片（作用同title）
         */
        imageUrl?: string;
        /**
         * 分享图ID（如果imageId=0,则返回默认分享信息;如果指定了图片ID则返回固定分享图配置，否则随机获取分享内容成功后会自动设置）
         */
        imageId?: number;
        /**
         * 不传默认为/pages/index/index，点击分享卡片进入的路径（必须是纯路径，不含任何参数，参数请设置到params里）
         */
        path?: string;
        /**
         * app需要带出去的自定义分享参数（键值对）（微信小游戏的query参数也是设置到这里）
         */
        params?: Object;
        /**
         * 当前用户昵称，可用于替换服务端下发的分享图描述信息中的{nickname}占位符
         */
        nickName?: string;
        /**
         * 用户当前分值，请传入当前玩家的【等级或分数或游戏时长】等可以直观判断玩家级别的数值，低于阀值的用户将屏蔽部分敏感图片
         */
        scoreValue?: number;
        /**
        * 分享图当前版本号，请传入当前分享图的版本号。用于获取指定版本号的分享图，或者未配置版本号的分享图
        */
        version?: string;
        /**
         * 分享语前缀
         */
        prefix?: string;
    }
    interface ISharePicConfig {
        /**
         * 分享图 id
         */
        pic_id: number;
        /**
         * 图片地址
         */
        pic: string;
        /**
         * title
         */
        text: string;
        /**
         * 权重
         */
        weight: number;
        /**
         * 敏感字段
         */
        shield: string;
        /**
         * 城市黑名单
         */
        city: string;
        number: number;
        ver: string;
        desc: string;
        time_show: string;
    }
    /**
     * 小游戏打开的参数（包括冷启动和热启动）
     */
    interface IEnterOptions {
        /**
         * 启动小游戏的场景值
         */
        scene: any;
        /**
         * 启动小游戏的 query 参数
         */
        query: any;
        /**
         * 来源信息。从另一个小程序、公众号或 App 进入小程序时返回。否则返回 {}。
         */
        referrerInfo?: any;
        /**
         * 从微信群聊/单聊打开小程序时，chatType 表示具体微信群聊/单聊类型
         */
        chatType?: any;
        isSticky?: boolean;
        shareTicket?: string;
    }
    /**
     * 设备系统信息
     */
    interface ISystemInfo {
        /**
         * 操作系统ios/android
         */
        platform: string;
        /**
         * 设备型号。新机型刚推出一段时间会显示unknown，微信会尽快进行适配。
         */
        model: string;
    }
    interface IVerContrLevel {
        check: number;
        country?: string;
        province?: string;
        city?: string;
        ip?: string;
    }
    interface IAd {
        id: string;
        pid: string;
        appid: string;
        image: string;
        icon: string;
        ad_image: string;
        banner: string;
        title: string;
        description: string;
        button: string;
        coins: string;
        page: string;
        count: number;
        category: number | string;
        plan_number: string;
        table: number | string;
        start_time: string;
        end_time: string;
        platform: string;
        sex: number | string;
        uservalue: string;
        clicked?: boolean;
        audi?: string;
        classify?: number;
        city_show?: string;
        city_hide?: string;
    }
    /**
     * platform接口
     */
    interface IPlat {
        /**
         * 根据key获取本地存储的值
         * @param key
         */
        findStorageByKey(key: string): any;
        /**
         * 把数据存储在LocalStorage中
         * @param key
         * @param data
         * @param isSync 同步标识;(true-同步|false-异步)默认为true。
         */
        putStorage(key: string, data: any, isSync?: boolean): void;
        /**
         *
         * @param url
         * @param params
         * @param method 默认为get
         * @param retryTimes
         */
        httpRequest(url: string, params?: Object, method?: string, retryTimes?: number): Promise<any>;
        /**
         * 获取账号
         * @param enterOptions 小游戏打开的参数（包括冷启动和热启动）
         */
        getUser(enterOptions: IEnterOptions): Promise<IUser>;
        /**
         * 获取用户信息
         */
        getUserInfo(): Promise<IUserInfo>;
        /**
         * 获取设备信息
         */
        getSystemInfo(): ISystemInfo;
        /**
         * 获取小游戏打开的参数（包括冷启动和热启动)
         */
        getEnterOptions(): IEnterOptions;
        /**
         * 打开另一个小程序|小游戏
         */
        navigateTo(app: IAd): Promise<any>;
        /**
         * 打开另一个小程序|小游戏
         */
        navigateToSync(app: IAd, launchToCallback: any): any;
        getShareObject(shareInfo: IShareInputObject): any;
        /**
         * 获取本地缓存图片资源路径
         * @param targetUrl 资源路径
         * @param waitDownloaded 是否等待下载完成
         */
        getLocalCacheResUrl(targetUrl: string, waitDownloaded: boolean): Promise<string>;
        setTimeout(callback: any, timeout: number): any;
        setInterval(callback: any, timeout: number): any;
        clearTimeout(t: any): void;
        clearInterval(t: any): void;
        preHandleInit(): void;
    }
}
declare namespace hzzxsdk.c {
    class Global {
        static readonly sdkVersion: string;
        static readonly sdkBuildTimeStamp: string;
        static readonly storagePrefix: string;
        static readonly server_login: string;
        static readonly server_report: string;
        static readonly server_res: string;
        static pid: string;
        static appResPath: string;
        static enterOptions: IEnterOptions;
        static isInit: boolean;
        static appCodeVersion: string;
        static gameConfigData: any;
        static isNeedUnionid: boolean;
        static totalCount: number;
        static gapCount: number;
        static lastAddUpDate: string;
        static totalKey: string;
        static gapKey: string;
        static lastAddUpDataKey: string;
        static sharePicDataKey: string;
    }
}
declare namespace hzzxsdk.c {
    class WXPlat implements IPlat {
        findStorageByKey(key: string): any;
        putStorage(key: string, data: any, isSync?: boolean): void;
        httpRequest(url: string, params?: any, method?: string, retryTimes?: number): Promise<any>;
        getUser(enterOptions: IEnterOptions): Promise<IUser>;
        private getUserByCode;
        protected loginByCredentialData(credentialData: any, enterOptions: IEnterOptions): Promise<IUser>;
        getUserInfo(): Promise<IUserInfo>;
        getSystemInfo(): ISystemInfo;
        getEnterOptions(): IEnterOptions;
        navigateTo(app: IAd): Promise<any>;
        navigateToSync(app: IAd, launchToCallback: any): void;
        getShareObject(shareInputObject: IShareInputObject): IShareOutObject;
        static downloadQueue: string[];
        getLocalCacheResUrl(targetUrl: string, waitDownloaded?: boolean): Promise<string>;
        mkdirRecursiveSync(dirPath: string): string;
        setTimeout(callback: any, timeout: number): any;
        setInterval(callback: any, timeout: number): any;
        clearTimeout(t: any): void;
        clearInterval(t: any): void;
        preHandleInit(): void;
        handleAfterLogin(account: IUser, launchOptions: IEnterOptions): void;
    }
}
declare namespace hzzxsdk.c {
    class EgretPlat implements IPlat {
        findStorageByKey(key: string): any;
        putStorage(key: string, data: any): void;
        httpRequest(url: string, params?: any, method?: string, retryTimes?: number): Promise<any>;
        getUser(enterOptions: IEnterOptions): Promise<IUser>;
        getUserInfo(): Promise<IUserInfo>;
        getSystemInfo(): ISystemInfo;
        getEnterOptions(): IEnterOptions;
        navigateTo(app: IAd): Promise<void>;
        navigateToSync(app: IAd, launchToCallback: any): Promise<void>;
        getShareObject(shareInfo: IShareInputObject): any;
        getLocalCacheResUrl(targetUrl: string, waitDownloaded?: boolean): Promise<string>;
        setTimeout(callback: any, timeout: number): any;
        setInterval(callback: any, timeout: number): any;
        clearTimeout(t: any): void;
        clearInterval(t: any): void;
        preHandleInit(): void;
    }
}
declare namespace hzzxsdk.c {
    class CocosPlat implements IPlat {
        findStorageByKey(key: string): any;
        putStorage(key: string, data: any): void;
        httpRequest(url: string, params?: any, method?: string, retryTimes?: number): Promise<any>;
        getUser(enterOptions: IEnterOptions): Promise<IUser>;
        getUserInfo(): Promise<IUserInfo>;
        getSystemInfo(): ISystemInfo;
        getEnterOptions(): IEnterOptions;
        navigateTo(app: IAd): Promise<void>;
        navigateToSync(app: IAd, launchToCallback: any): Promise<void>;
        getShareObject(shareInfo: IShareInputObject): any;
        getLocalCacheResUrl(targetUrl: string, waitDownloaded?: boolean): Promise<string>;
        setTimeout(callback: any, timeout: number): any;
        setInterval(callback: any, timeout: number): any;
        clearTimeout(t: any): void;
        clearInterval(t: any): void;
        preHandleInit(): void;
    }
}
declare namespace hzzxsdk.c {
    class LayaPlat implements IPlat {
        findStorageByKey(key: string): any;
        putStorage(key: string, data: any): void;
        httpRequest(url: string, params?: any, method?: string, retryTimes?: number): Promise<any>;
        getUser(enterOptions: IEnterOptions): Promise<IUser>;
        getUserInfo(): Promise<IUserInfo>;
        getSystemInfo(): ISystemInfo;
        getEnterOptions(): IEnterOptions;
        navigateTo(app: IAd): Promise<void>;
        navigateToSync(app: IAd, launchToCallback: any): Promise<void>;
        getShareObject(shareInfo: IShareInputObject): any;
        setTimeout(callback: any, timeout: number): any;
        setInterval(callback: any, timeout: number): any;
        clearTimeout(t: any): void;
        clearInterval(t: any): void;
        getLocalCacheResUrl(targetUrl: string, waitDownloaded?: boolean): Promise<string>;
        preHandleInit(): void;
    }
}
declare namespace hzzxsdk.c {
    class DefaultPlat implements IPlat {
        findStorageByKey(key: string): any;
        putStorage(key: string, data: any): void;
        httpRequest(url: string, params?: any, method?: string, retryTimes?: number): Promise<any>;
        getUser(enterOptions: IEnterOptions): Promise<IUser>;
        getUserInfo(): Promise<IUserInfo>;
        getSystemInfo(): ISystemInfo;
        getEnterOptions(): IEnterOptions;
        navigateTo(app: IAd): Promise<void>;
        navigateToSync(app: IAd, launchToCallback: any): Promise<void>;
        getShareObject(shareInfo: IShareInputObject): any;
        getLocalCacheResUrl(targetUrl: string, waitDownloaded?: boolean): Promise<string>;
        setTimeout(callback: any, timeout: number): any;
        setInterval(callback: any, timeout: number): any;
        clearTimeout(t: any): void;
        clearInterval(t: any): void;
        preHandleInit(): void;
    }
}
declare namespace hzzxsdk.c {
    class BasePlat {
        private static _inst;
        static get instance(): IPlat;
        private static get platMark();
    }
}
declare namespace hzzxsdk.c {
    /**
     * user
     */
    class UserHelper {
        /**
         * Save user information localStorage
         * @param user
         * @returns
         */
        static setUser(user: IUser): boolean;
        /**
         * fetch user data from localStorage
         * @return IUser
         */
        static getUser(): IUser;
        static getUserAsyn(): Promise<IUser>;
        /**
         * third login
         * @param user third user info
         */
        static thirdLogin(user: IUser): Promise<any>;
        static getOpenId(): string;
        static isAdUser(): boolean;
    }
}
declare namespace hzzxsdk.c {
    class ReportHelper {
        /**
         * 自定义打点
         * @param id
         * @param customParam1
         * @param customParam2
         */
        static customEvent(id?: number, customParam1?: string, customParam2?: string): void;
        /**
         * 分享进入事件
         * @param partakeId 分享ID
         * @param partakeUser 谁分享的
         * @param shareTicket
         * @param customParam1
         * @param customParam2
         */
        private static partakeIntoEvent;
        /**
         * 广告进入事件
         * page=/pages/index/index?type=link&adid=ad_${gameid}_${序号}
         * @param id 广告ID
         * @param appId enterOptions.referrerInfo.appId
         * @param param1 扩展参数
         */
        private static adIntoEvent;
        /**
         * 分享事件
         * @param sceneCode int 分享点场景编号
         * @param imgId 分享图ID
         * @param shareTicket
         * @param customParam1
         * @param customParam2
         */
        static partakeOutletEvent(sceneCode: number, imgId?: string, shareTicket?: string, customParam1?: string, customParam2?: string): void;
        protected static lastAddUpTime: number;
        private static MAX_DAY_TIME;
        static addUpGapOnlineTime(): Promise<void>;
        static addUpGapOnlineTimeOnHide(): Promise<void>;
        /**
         * 热启动事件
         * @param enterOptions
         */
        static hotLaunchEvent(enterOptions: IEnterOptions): void;
        /**
         * 视频播放和点击次数
         * 视频播放结束上报
         * @param isClick 有点击视频=true|无点击=false
         */
        static videoShowAndClickCountEvent(isClick?: boolean): void;
        static batchShowEvent(adList: IAd[]): void;
        /**
         * 上报AD点击事件
         * @param ad 广告数据
         * @param sceneCode 点击广告的位置(cp自定)
         */
        static clickEvent(ad: IAd, sceneCode?: number): void;
        /**
         * 上报AD跳转事件
         * @param ad 广告数据
         * @param sceneCode 点击广告的位置(cp自定)
         */
        static adJumpEvent(ad: IAd, sceneCode?: number): void;
        /**
         * 启动事件
         * @param enterOptions 启动参数
         */
        static appRunEvent(enterOptions: IEnterOptions): void;
    }
}
declare namespace hzzxsdk.c {
    class ShareHelper {
        private static sharePicPromise;
        private static sharePicConfig;
        static loadSharePicData(): Promise<any>;
        /**
         * 随机获取分享图信息
         * @param defaultShareObj 默认分享对象，指定imageId=0或者服务器未配置时返回默认分享对象。
         * @returns
         */
        static getRandomShareObject(defaultShareObj: IShareInputObject): IShareInputObject;
        private static filterSecondary;
        private static findShareObjectByRandom;
        private static findShareObjectByImageId;
        private static getShareImageInfo;
        private static filterOtherParam;
        private static checkMoreOpenPeriodLimit;
        private static checkOpenTimes;
        /**
         * 生成小程序分享链接
         * @param sceneCode 分享点
         * @param path 小程序页面路径
         * @param query 其他自定义参数键值对
         * @param imgId iamgeid
         */
        static genSharePath(sceneCode: number, path?: string, query?: Object, imgId?: string | number): string;
        /**
         * 生成分享请求参数(形如a=b&c=d)
         * @param sceneCode 分享点序号
         * @param query 其他自定义参数键值对
         * @param imgId
         */
        static genShareQuery(sceneCode: number, query?: any, imgId?: string | number): string;
    }
}
declare namespace hzzxsdk.c {
    class AdHelper {
        private static adConfPromise;
        private static readonly AD_TYPE_RECOMMED;
        private static readonly AD_TYPE_ICON;
        private static readonly AD_TYPE_REWARDED;
        private static readonly AD_TYPE_BANNER;
        private static readonly AD_TYPE_KEY_RECOMMED;
        private static readonly AD_TYPE_KEY_ICON;
        private static readonly AD_TYPE_KEY_REWARDED;
        private static readonly AD_TYPE_KEY_BANNER;
        private static iconDataList;
        private static recommedDataList;
        private static rewardDataList;
        private static bannerDataList;
        private static mFilterData;
        static getRecommedList(isRandomSort?: boolean, count?: number, score?: number): Promise<IAd[]>;
        static getBannerList(isRandomSort?: boolean, count?: number, score?: number): Promise<IAd[]>;
        static getRewardedList(isRandomSort?: boolean, count?: number, score?: number): Promise<IAd[]>;
        static getIconAd(score?: number): Promise<IAd>;
        static preLoadAdData(): void;
        static loadAdConfData(): Promise<IAd[]>;
        private static checkAdConfVersion;
        private static fetchAdConfByVersion;
        private static fixAdData;
        private static classifyAd;
        private static reviseAd;
        /**
         * gender: -1=不限制性别|1=男|2=女|0=未知
         */
        private static loadFilterData;
        /**
         * 获取AD列表
         * @param isRandomSort 是否使用权重算法排序后返回，否则按后台配置原样返回。默认为false,即按后台配置原样返回。
         * @param count 返回数量，如果全部返回可设置为0.默认全部返回
         * @param score 根据需要传入当前玩家的等级|分数|游戏时长等数值
         * @param adType
         * @returns
         */
        private static getAdList;
        private static isCityVisible;
        private static isCityInvisible;
        private static handleResCache;
        private static handleResCacheByKey;
        /**
         * 点击广告并跳转
         * @param ad 广告数据
         * @param sceneCode 点击广告的位置
         * @returns Promise<{navigateTo:true,firstClick:true}>
         */
        static clickAndNavigate(ad: IAd, sceneCode?: number): Promise<any>;
        private static checkFirstClick;
    }
}
declare namespace hzzxsdk.c {
    class InitHelper {
        private static preHandelInitParams;
        static init(pid: string, isNeedUnionid?: boolean): Promise<any>;
        static initWithThirdUser(pid: string, user: IUser): Promise<unknown>;
    }
}
declare namespace hzzxsdk {
    /**
     * 初始化并获取openid
     * @param pid 产品ID
     * @param isNeedUnionid 默认为false--不获取Unionid|true--需要获取unionid
     * @returns openid
     */
    function initAndGetOpenId(pid: string, isNeedUnionid?: boolean): Promise<any>;
    /**
     * 用第三方账号初始化SDK，并返回openid
     * @param pid 产品ID
     * @param user 第三方账号
     * @returns openid
     */
    function initWithThirdUser(pid: string, user: IUser): Promise<any>;
    /**
     * 获取用户账号信息
     * @returns IUser
     */
    function getUser(): IUser;
    /**
     * 设置debug模式,以方便查看SDK日志
     * 默认为关闭
     * @param debugMode 是否开启debug模式
     */
    function setDebugMode(debugMode: boolean): void;
    /**
     * 获取游戏自定义配置
     * @param pid 产品ID
     * @returns
     */
    function getGameConfig(pid?: string): Promise<any>;
    /**
     * 获取游戏版本控制等级
     * cp可以根据check=1|2|3 字段的值来作相应处理。1为最高控制等级，2次之，3最低。
     * @param codeVersion 产品当前版本号
     * @param pid 产品ID
     * @returns
     */
    function getGameVerContrLevel(codeVersion: string, pid?: string): Promise<IVerContrLevel>;
    /**
     * 检查裂变状态
     * @returns ture=允许|false=禁止
     */
    function checkFission(): boolean;
    /**
     * 获取分享对象信息
     * @param shareInputObject
     * @returns IShareOutObject
     */
    function getShareObject(shareInputObject: IShareInputObject): IShareOutObject;
    /**
     * 随机获取单个图片广告
     * @param score 默认值为0
     * @returns IAd
     */
    function getIconAd(score?: number): Promise<IAd>;
    /**
     * 获取推荐广告列表
     * @param isRandomSort 是否使用权重算法排序后返回，否则按后台配置原样返回。默认为false,即按后台配置原样返回。
     * @param count 返回数量，如果全部返回可设置为0.默认全部返回
     * @param score 根据需要传入当前玩家的等级|分数|游戏时长等数值
     * @returns IAd[]
     */
    function getRecommedAdList(isRandomSort?: boolean, count?: number, score?: number): Promise<IAd[]>;
    /**
     * 获取banner广告列表
     * @param isRandomSort 是否使用权重算法排序后返回，否则按后台配置原样返回。默认为false,即按后台配置原样返回。
     * @param count 返回数量，如果全部返回可设置为0.默认全部返回
     * @param score 根据需要传入当前玩家的等级|分数|游戏时长等数值
     * @returns IAd[]
     */
    function getBannerAdList(isRandomSort?: boolean, count?: number, score?: number): Promise<IAd[]>;
    /**
     * 获取激励视频广告列表
     * @param isRandomSort 是否使用权重算法排序后返回，否则按后台配置原样返回。默认为false,即按后台配置原样返回。
     * @param count 返回数量，如果全部返回可设置为0.默认全部返回
     * @param score 根据需要传入当前玩家的等级|分数|游戏时长等数值
     * @returns IAd[]
     */
    function getRewardedAdList(isRandomSort?: boolean, count?: number, score?: number): Promise<IAd[]>;
    /**
     * 广告点击并跳转
     * @param ad 广告数据
     * @param sceneCode 点击广告的位置
     * @returns Promise{navigateTo:true,firstClick:true}
     */
    function clickAndNavigate(ad: IAd, sceneCode?: number): Promise<any>;
    /**
       * 自定义打点
       * @param id
       * @param customParam1
       * @param customParam2
       */
    function reportCustomEvent(id?: number, customParam1?: string, customParam2?: string): void;
    /**
     * 上报视频结束事件
     * 在激励视频结束时上报
     * @param isClick 是否有点击；默认为false
     */
    function reportAdVideoEndEvent(isClick?: boolean): void;
}
declare namespace hzzxsdk.c {
    class CommHelper {
        private static isDebug;
        static openDebugMode(isDebugMode: boolean): void;
        static log(...args: any[]): void;
        /**
         * parse user channel
         * @param options 小游戏打开的参数（包括冷启动和热启动）
         * @returns
         */
        static parseUserChannel(options: IEnterOptions): IUserChannel;
        /**
         * 获取指定http请求参数的值
         * @param queryParams
         * @param queryKey
         */
        static getHttpQueryValueByKey(queryParams: string, queryKey: string): string;
        static buildHttpQuery(reqParams: any): string;
        private static readonly thresholdUp;
        private static readonly thresholdLow;
        /**
         * @param dataList
         * @param weightKey 权重字段Key
         * @param popOne true表示只抽取一个，false表示返回排序列表
         */
        static roundTableSort(dataList: any[], weightKey: string, popOne?: boolean): any[] | any;
        static getFormatNowDate(): string;
        static resetTotalCount(lastReportDate: string): void;
        static compareVersionTx(v1: any, v2: any): 0 | 1 | -1;
        static paraseChannelUserId(options: IEnterOptions): string;
        private static mCacheDataList;
        static addRes2MemoryCache(url: string): void;
        static getResFromMemoryCache(url: string): string;
        static isAbroadCity(verContrData: IVerContrLevel): boolean | "" | undefined;
    }
}
declare namespace hzzxsdk.c {
    class GameConfigHelper {
        private static gameConfigPromise;
        private static gameVerContrPromise;
        static gameVerContrData: IVerContrLevel;
        static getGameConfig(pid?: string): Promise<any>;
        /**
         * 获取版本控制等级
         *
         * @param codeVersion 程序代码版本
         * @param pid
         * @returns
         */
        static getGameVerContrLevel(codeVersion: string, pid?: string): Promise<IVerContrLevel>;
        /**
         * 检查裂变--分享或者视频
         * @returns true=可以强裂变，false=不可以强裂变
         */
        static checkFission(): boolean;
        private static checkHistoryScene;
        private static checkCurrentScene;
    }
}
export = hzzxsdk;