namespace boom {
	export class ControlEvent extends egret.Event {
		public static START: string = "START";
		public static STOP: string = "STOP";
		public _status: number = 0;
		public constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
			super(type, bubbles, cancelable);
		}
	}
}