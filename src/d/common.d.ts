declare var wx: any;
declare var module: any;
declare var worker: any;

declare namespace egret {
  class ScrollView extends egret.DisplayObject {
    // public height: number;
    // public width: number;
    // public x: number;
    // public y: number;
    public verticalScrollPolicy: 'off' | 'on';
    public setContent(content: any);

    public scrollLeft: number;
    public setScrollLeft(left: number, time: number);
  }

  class Tween {
    public static get(obj: any);
    public static removeTweens(obj: any);
  }
}