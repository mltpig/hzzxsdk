namespace hzzxsdk {
  export declare interface IUser {
    openid: string;
    unionid?: string;
    last_login_time?: number;
    create_time?: number;
    share_time?: number;
    channel_type?:string;
    channel_id?:string;
    channel_openid?:string;
  }

  export declare interface IUserChannel {
    channelType: string;
    channelId: string;
  }


  export declare interface IUserInfo {
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
  export declare interface IShareOutObject{
    /**
     * 转发标题，不传则默认使用当前小游戏的昵称。
     */
    title?: string,
    /**
     * 转发显示图片的链接，可以是网络图片路径或本地图片文件路径或相对代码包根目录的图片文件路径。显示图片长宽比是 5:4
     */
    imageUrl?: string,
    /**
     * 查询字符串，从这条转发消息进入后，可通过 wx.getLaunchOptionsSync() 或 wx.onShow() 获取启动参数中的 query。必须是 key1=val1&key2=val2 的格式。
     */
    query?:string,
    /**
     * 独立分包路径。详见 小游戏独立分包指南
     */
    path?:string,
  }

  /**
   * 分享输入对象
   */
  export declare interface IShareInputObject {
    /**
     * 分享触发点序号，比如右上角分享点为1，首页分享按钮为2，游戏主界面分享为3，过关炫耀分享为4，等等；CP自行定义或根据运营建议，事后统计时可以确定分享点来源位置即可。
     */
    sceneCode: number,
    /**
     * 分享标题（由于随机分享内容从网络获取，可能会失败，失败后会使用这个默认标题，如果不设置最后也会由对应平台自动设置）
     */
    title?: string,
    /**
     * 分享图片（作用同title）
     */
    imageUrl?: string,
    /**
     * 分享图ID（如果imageId=0,则返回默认分享信息;如果指定了图片ID则返回固定分享图配置，否则随机获取分享内容成功后会自动设置）
     */
    imageId?: number,
    /**
     * 不传默认为/pages/index/index，点击分享卡片进入的路径（必须是纯路径，不含任何参数，参数请设置到params里）
     */
    path?: string,
    /**
     * app需要带出去的自定义分享参数（键值对）（微信小游戏的query参数也是设置到这里）
     */
    params?: Object,
    /**
     * 当前用户昵称，可用于替换服务端下发的分享图描述信息中的{nickname}占位符
     */
    nickName?: string,
    /**
     * 用户当前分值，请传入当前玩家的【等级或分数或游戏时长】等可以直观判断玩家级别的数值，低于阀值的用户将屏蔽部分敏感图片
     */
    scoreValue?: number,
     /**
     * 分享图当前版本号，请传入当前分享图的版本号。用于获取指定版本号的分享图，或者未配置版本号的分享图
     */
    version?: string,
    /**
     * 分享语前缀
     */
    prefix?: string
  }

  
  export declare interface ISharePicConfig {
    /**
     * 分享图 id
     */
    pic_id: number,
    /**
     * 图片地址
     */
    pic: string,
    /**
     * title
     */
    text: string,
    /**
     * 权重
     */
    weight: number,
    /**
     * 敏感字段
     */
    shield: string,
    /**
     * 城市黑名单
     */
    city: string,
    
    number: number,
   
    ver: string,

    desc:string,

    time_show:string
  }

  /**
   * 小游戏打开的参数（包括冷启动和热启动）
   */
  export declare interface IEnterOptions {
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
    chatType?:any;

    isSticky?: boolean;

    shareTicket?: string;
  }

  /**
   * 设备系统信息
   */
  export declare interface ISystemInfo {
    /**
     * 操作系统ios/android
     */
    platform: string;
    /**
     * 设备型号。新机型刚推出一段时间会显示unknown，微信会尽快进行适配。
     */
    model:string;
  }

  export declare interface IVerContrLevel {
    check: number,
    country?: string,
    province?: string,
    city?: string,
    ip?: string,
  }

  export declare interface IAd {
    id: string;//广告跟踪ID
    pid: string;//跳转目标的product_id
    appid: string;//目标平台的应用ID
    image: string;//icon图标
    icon: string;//icon图标
    ad_image: string;//二维码海报或视频广告地址
    banner: string;//横幅广告图片地址
    title: string;
    description: string;
    button: string;//按钮文字
    coins: string;
    page: string;//页面路径或参数
    count: number;//玩家数量
    category: number | string;//广告类型
    plan_number: string;//计划导量
    table: number | string;//权重
    start_time: string;//广告有效期开始时间
    end_time: string;//广告有效期截止时间
    platform: string;//系统限制（ios/android）
    sex: number | string;//性别
    uservalue: string,
    clicked?: boolean;//运行时额外添加的属性
    audi?: string;
    classify?: number;
    city_show?:string;//可见城市配置;如 ‘四川,广州’
    city_hide?:string;//不可见城市配置;优先级高于可见城市
  }

  /**
   * platform接口
   */
  export declare interface IPlat {
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
    putStorage(key: string, data: any,isSync?:boolean): void;

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
    navigateToSync(app: IAd,launchToCallback:any);

    
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