namespace hzzxsdk.c {
	export class Global {
		public static readonly sdkVersion: string = '1.0.6';
		public static readonly sdkBuildTimeStamp: string = '2022829173519';
		public static readonly storagePrefix: string = 'hzzxsdk_';
		public static readonly server_login: string = 'https://sdk.tianjinyuren.cn';
		public static readonly server_report: string = 'https://sdk.tianjinyuren.cn';
		public static readonly server_res: string = 'https://cdnht.tianjinyuren.cn';

		public static pid: string;
		public static appResPath: string;
		public static enterOptions: IEnterOptions;
		public static isInit = false;
		public static appCodeVersion: string;
		public static gameConfigData: any;
		public static isNeedUnionid: boolean;
		public static totalCount: number = 0;
		public static gapCount: number = 0;
		public static lastAddUpDate: string = "";
		public static totalKey='hzzx_ol_time_total';
		public static gapKey='hzzx_ol_time_count';
		public static lastAddUpDataKey='hzzx_ol_last_add_up_date';
		public static sharePicDataKey='hzzx_share_pic_data';
		
	}

}
