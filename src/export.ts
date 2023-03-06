/// <reference path="hzzxsdk.ts" />

console.log('欢迎使用hzzxsdk,当前版本号' + hzzxsdk.c.Global.sdkVersion + ',发布时间:' + hzzxsdk.c.Global.sdkBuildTimeStamp);

if (typeof wx == 'object' && !wx.redirectTo) {
  window['hzzxsdk'] = hzzxsdk;
} else if (typeof module != 'undefined') {
  module.exports = hzzxsdk;
} else {
  window['hzzxsdk'] = hzzxsdk;
}