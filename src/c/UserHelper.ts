namespace hzzxsdk.c {
  /**
   * user
   */
  export class UserHelper {

    /**
     * Save user information localStorage
     * @param user 
     * @returns 
     */
    public static setUser(user: IUser): boolean {
      if (!user.openid) {
        CommHelper.log('set user data fail，openid is null. user =', user);
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

      BasePlat.instance.putStorage('hzzx_user_data', user);
      CommHelper.log('set user data success. openid = ', user.openid);
      return true;
    }

    /**
     * fetch user data from localStorage
     * @return IUser
     */
    public static getUser(): IUser {
      let user = BasePlat.instance.findStorageByKey('hzzx_user_data');
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
    }


    public static async getUserAsyn(): Promise<IUser> {
      return new Promise((resolve, reject) => {
        if (this.getUser().openid) {
          resolve(this.getUser());
          return;
        }
        let timerInterval = BasePlat.instance.setInterval(() => {
          if (this.getUser().openid) {
            BasePlat.instance.clearInterval(timerInterval);
            BasePlat.instance.clearTimeout(timerTimeout);
            resolve(this.getUser());
          }
        }, 150);
        let timerTimeout = BasePlat.instance.setTimeout(() => {
          BasePlat.instance.clearInterval(timerInterval);
        }, 20000);
      });
    }

    /**
     * third login
     * @param user third user info
     */
    public static thirdLogin(user: IUser): Promise<any> {
      return new Promise((resolve, reject) => {
        let userChannel = c.CommHelper.parseUserChannel(c.Global.enterOptions);
        if(user){
          user.channel_type=userChannel.channelType?userChannel.channelType:'';
          user.channel_id=userChannel.channelId?userChannel.channelId:'';
        }

        if (this.setUser(user)) {
          let uid = user.openid;
          let unionid = user.unionid;
          let type=user.channel_type;
          let id = user.channel_id;
          let data = {
            product_id: Global.pid,
            openid: uid,
            unionid: unionid,
            channel_type: type,
            chennal_id: id,
          }
          BasePlat.instance.httpRequest(Global.server_login + '/server/otherLogin.do', data, 'post').then(response => {
            if (response && response.code == 200 && response.result && response.result.openid) {
              CommHelper.log('third login success. ', response);
              UserHelper.setUser(response.result);
              resolve(response.result);
            } else {
              CommHelper.log('third login fail, openid is null. ', response);
              reject();
            }
          }).catch(err=>{
            CommHelper.log('third login error, '+err);
            reject();
          });
        } else {
          c.CommHelper.log('init with third user fail. openid is null.');
          reject();
          
        }
      });

    }

    public static getOpenId(): string {
      return UserHelper.getUser().openid;
    }

    public static isAdUser(): boolean {
      let user = this.getUser();
      if (!user || !user.openid) {
        return false;
      }

      if (user.channel_type && (user.channel_type == 'ad')) {
        return true;
      }

      if (user.channel_type && user.channel_type == 'oth') {
        let senceArray = [1095, 1084, 1045, 1046, 1067, 1065];
        let currSence = user.channel_id ? Number(user.channel_id) : 0;
        let isAd = senceArray.indexOf(currSence) == -1;
        if (!isAd) {
          return true;
        }
      }
      return false;
    }
  }
}