/// <reference path="WXPlat.ts" />
/// <reference path="EgretPlat.ts" />
/// <reference path="CocosPlat.ts" />
/// <reference path="LayaPlat.ts" />
/// <reference path="DefaultPlat.ts" />
namespace hzzxsdk.c {

  export class BasePlat {

    private static _inst: IPlat;
    
    public static get instance(): IPlat {
      if (!this._inst) {
        switch (this.platMark) {
          case 'wx':
            this._inst = new WXPlat();
            CommHelper.log('platform=wx');
            break;
          case 'egret':
            this._inst = new EgretPlat();
            CommHelper.log('platform=Egret');
            break;
          case 'cocos':
            this._inst = new CocosPlat();
            CommHelper.log('platform=Cocos');
            break;
          case 'laya':
            this._inst = new LayaPlat();
            CommHelper.log('platform=Laya');
            break;
          default:
            CommHelper.log('platform=default');
            this._inst = new DefaultPlat();
        }
      }
      return this._inst;
    }
    
     private static get platMark(): string {
      if (typeof wx == 'object') {
        return 'wx';
      } else if (typeof egret == 'object') {
        return 'egret';
      } else if (typeof cc == 'object') {
        return 'cocos';
      } else if (typeof Laya == 'object') {
        return 'laya';
      } else {
        return 'unknow';
      }
    }
  }
}