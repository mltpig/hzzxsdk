namespace hzzxsdk.c {
  export class CommHelper {
    private static isDebug: boolean = false;
    public static openDebugMode(isDebugMode: boolean) {
      this.isDebug = isDebugMode;
    }
    public static log(...args: any[]) {
      let tag = 'hzzx==>';
      this.isDebug && console.log(tag, ...args);
    }
    /**
     * parse user channel
     * @param options 小游戏打开的参数（包括冷启动和热启动）
     * @returns 
     */
    public static parseUserChannel(options: IEnterOptions): IUserChannel {
      let channel: IUserChannel = {
        channelType: '',
        channelId: ''
      };

      if (options.query.t == 'partake') {
        channel.channelType = options.query.t;
        channel.channelId = options.query.sid;

      } else if (options.query.t) {
        channel.channelType = options.query.t;
        channel.channelId = options.query.a;
      } else {
        channel.channelType = 'oth';
        channel.channelId = options.scene;

      }
      return channel;
    }

    /**
     * 获取指定http请求参数的值
     * @param queryParams 
     * @param queryKey 
     */
    public static getHttpQueryValueByKey(queryParams: string, queryKey: string): string {
      try {
        let r = queryParams.match(new RegExp('(\\?|&)' + queryKey + "=([^&]*)(&|$)"));
        if (r) {
          return r[2];
        }
      } catch (error) {

      }

      return '';
    }


    public static buildHttpQuery(reqParams: any): string {
      let temp = '';
      for (let key in reqParams) {
        temp += key + '=' + reqParams[key] + '&';
      }
      return temp.substr(0, temp.length - 1);
    }

    private static readonly thresholdUp = Number.MAX_VALUE;
    private static readonly thresholdLow = 0;

    /**
     * @param dataList  
     * @param weightKey 权重字段Key
     * @param popOne true表示只抽取一个，false表示返回排序列表
     */
    public static roundTableSort(dataList: any[], weightKey: string, popOne = true): any[] | any {
      if (!dataList || !dataList.length) {
        return [];
      }

      let headList: any[] = []; 
      let tableList: any[] = []; 
      let tableCount = 0; 
      for (let i = 0; i < dataList.length || 0; i++) {
      
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

     
      let sortList: any[] = []; 
      while (tableList.length) {
        let point = Math.random(); 
        let sectorStart = 0; 

        for (let i = 0; i < tableList.length; i++) {
          let sectorEnd = sectorStart + tableList[i][weightKey] / tableCount; 
        
          if (point >= sectorStart && point < sectorEnd) {
            sortList.push(tableList[i]);
            tableCount -= tableList[i][weightKey];
            tableList.splice(i, 1);
            break;
          }
         
          sectorStart = sectorEnd;
        }
      }
     
      let resultList = headList.concat(sortList);
     
      if (popOne) {
        return resultList[0];
      } else {
        return resultList;
      }
    }

    public static getFormatNowDate(): string {
      let date = new Date();
      let month: string | number = date.getMonth() + 1;
      let strDate: string | number = date.getDate();
      if (month <= 9) {
        month = "0" + month;
      }
      if (strDate <= 9) {
        strDate = "0" + strDate;
      }
      return date.getFullYear() + "-" + month + "-" + strDate;
    }


    public static resetTotalCount(lastReportDate: string) {
      let curDate = this.getFormatNowDate();
      if (lastReportDate == curDate) {
        return;
      }
      Global.lastAddUpDate = curDate;
      Global.totalCount = 0;
      Global.gapCount = 0;
      BasePlat.instance.putStorage(Global.totalKey, 0, false);
      BasePlat.instance.putStorage(Global.gapKey, 0, false);
    }


    public static compareVersionTx(v1, v2) {
      v1 = v1.split('.')
      v2 = v2.split('.')
      var len = Math.max(v1.length, v2.length)
      while (v1.length < len) {
        v1.push('0')
      }
      while (v2.length < len) {
        v2.push('0')
      }
      for (var i = 0; i < len; i++) {
        var num1 = parseInt(v1[i])
        var num2 = parseInt(v2[i])
        if (num1 > num2) {
          return 1
        } else if (num1 < num2) {
          return -1
        }
      }
      return 0
    }

    public static paraseChannelUserId(options: IEnterOptions): string {
      if (!options || !options.query) {
        return "";
      }

      if (options.query.userid) {
        return options.query.uid;
      }
      return "";
    }


    private static mCacheDataList: string[] = [];

    public static addRes2MemoryCache(url: string) {
      if (this.mCacheDataList == null || this.mCacheDataList == undefined) {
        return;
      }

      if (this.mCacheDataList.indexOf(url) == -1) {
        this.mCacheDataList.push(url);
      }
    }

    public static getResFromMemoryCache(url: string): string {
      if (this.mCacheDataList == null || this.mCacheDataList == undefined) {
        return '';
      }
      url = url.replace('https://', '');
      let len = this.mCacheDataList.length;
      for (let i = 0; i < len; i++) {
        let item: string = this.mCacheDataList[i];
        if (item.indexOf(url) != -1) {
          return item;
        }
      }
      return "";
    }

    public static isAbroadCity(verContrData: IVerContrLevel) {
      const province = verContrData.province;
      const city = verContrData.city;
      const country = verContrData.country
      return country && country.indexOf('中国') == -1
        || province && province.indexOf('台湾') != -1
        || city && city.indexOf('台湾') != -1
        || province && province.indexOf('香港') != -1
        || city && city.indexOf('香港') != -1
        || province && province.indexOf('澳门') != -1
        || city && city.indexOf('澳门') != -1
    }

  }
}