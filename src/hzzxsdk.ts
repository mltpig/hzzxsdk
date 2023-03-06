/// <reference path="c/Global.ts" />
/// <reference path="c/BasePlat.ts" />
/// <reference path="c/UserHelper.ts" />
/// <reference path="c/ReportHelper.ts" />
/// <reference path="c/ShareHelper.ts" />
/// <reference path="c/AdHelper.ts" />
/// <reference path="c/InitHelper.ts" />

namespace hzzxsdk {

  /**
   * 初始化并获取openid
   * @param pid 产品ID
   * @param isNeedUnionid 默认为false--不获取Unionid|true--需要获取unionid
   * @returns openid
   */
  export function initAndGetOpenId(pid: string, isNeedUnionid: boolean = false): Promise<any> {
    return c.InitHelper.init(pid, isNeedUnionid);
  }

  /**
   * 用第三方账号初始化SDK，并返回openid
   * @param pid 产品ID
   * @param user 第三方账号
   * @returns openid
   */
  export function initWithThirdUser(pid: string, user: IUser): Promise<any> {
    return c.InitHelper.initWithThirdUser(pid, user);

  }

  /**
   * 获取用户账号信息
   * @returns IUser
   */
  export function getUser(): IUser {
    return c.UserHelper.getUser();
  }

  /**
   * 设置debug模式,以方便查看SDK日志
   * 默认为关闭
   * @param debugMode 是否开启debug模式
   */
  export function setDebugMode(debugMode: boolean) {
    c.CommHelper.openDebugMode(debugMode);
  }

  /**
   * 获取游戏自定义配置
   * @param pid 产品ID
   * @returns 
   */
  export function getGameConfig(pid?: string): Promise<any> {
    return c.GameConfigHelper.getGameConfig(pid);
  }

  /**
   * 获取游戏版本控制等级
   * cp可以根据check=1|2|3 字段的值来作相应处理。1为最高控制等级，2次之，3最低。
   * @param codeVersion 产品当前版本号
   * @param pid 产品ID
   * @returns 
   */
  export function getGameVerContrLevel(codeVersion: string, pid?: string): Promise<IVerContrLevel> {
    return c.GameConfigHelper.getGameVerContrLevel(codeVersion, pid);
  }

  /**
   * 检查裂变状态
   * @returns ture=允许|false=禁止
   */
  export function checkFission(): boolean {
    return c.GameConfigHelper.checkFission();
  }

  /**
   * 获取分享对象信息
   * @param shareInputObject 
   * @returns IShareOutObject
   */
  export function getShareObject(shareInputObject: IShareInputObject): IShareOutObject {
    return c.BasePlat.instance.getShareObject(shareInputObject);;
  }


  /**
   * 随机获取单个图片广告
   * @param score 默认值为0
   * @returns IAd
   */
  export function getIconAd(score = 0): Promise<IAd> {
    return c.AdHelper.getIconAd(score);
  }


  /**
   * 获取推荐广告列表
   * @param isRandomSort 是否使用权重算法排序后返回，否则按后台配置原样返回。默认为false,即按后台配置原样返回。
   * @param count 返回数量，如果全部返回可设置为0.默认全部返回
   * @param score 根据需要传入当前玩家的等级|分数|游戏时长等数值
   * @returns IAd[]
   */
  export function getRecommedAdList(isRandomSort = false, count = 0, score = 0): Promise<IAd[]> {
    return c.AdHelper.getRecommedList(isRandomSort, count, score);
  }


  /**
   * 获取banner广告列表
   * @param isRandomSort 是否使用权重算法排序后返回，否则按后台配置原样返回。默认为false,即按后台配置原样返回。
   * @param count 返回数量，如果全部返回可设置为0.默认全部返回
   * @param score 根据需要传入当前玩家的等级|分数|游戏时长等数值
   * @returns IAd[]
   */
  export function getBannerAdList(isRandomSort = false, count = 0, score = 0): Promise<IAd[]> {
    return c.AdHelper.getBannerList(isRandomSort, count, score);
  }

  /**
   * 获取激励视频广告列表
   * @param isRandomSort 是否使用权重算法排序后返回，否则按后台配置原样返回。默认为false,即按后台配置原样返回。
   * @param count 返回数量，如果全部返回可设置为0.默认全部返回
   * @param score 根据需要传入当前玩家的等级|分数|游戏时长等数值
   * @returns IAd[]
   */
  export function getRewardedAdList(isRandomSort = false, count = 0, score = 0): Promise<IAd[]> {
    return c.AdHelper.getRewardedList(isRandomSort, count, score);
  }

  /**
   * 广告点击并跳转
   * @param ad 广告数据
   * @param sceneCode 点击广告的位置
   * @returns Promise{navigateTo:true,firstClick:true}
   */
  export function clickAndNavigate(ad: IAd, sceneCode = 0): Promise<any> {
    return c.AdHelper.clickAndNavigate(ad, sceneCode);
  }

  /**
     * 自定义打点
     * @param id 
     * @param customParam1
     * @param customParam2
     */
  export function reportCustomEvent(id = 0, customParam1 = '', customParam2 = '') {
    c.ReportHelper.customEvent(id, customParam1, customParam2);
  }

  /**
   * 上报视频结束事件
   * 在激励视频结束时上报
   * @param isClick 是否有点击；默认为false
   */
  export function reportAdVideoEndEvent(isClick=false){
    c.ReportHelper.videoShowAndClickCountEvent(isClick);
  }
}
