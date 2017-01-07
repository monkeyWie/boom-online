/**
 *
 * @author 
 * 方向控制类
 */
namespace boom {
	export class DirectionControl extends egret.DisplayObjectContainer {
		private timer: egret.Timer;
		private up: egret.Shape;
		private down: egret.Shape;
		private left: egret.Shape;
		private right: egret.Shape;
		private status: number = 0;

		public constructor() {
			super();
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}

		private onAddToStage(event: egret.Event) {
			this.timer = new egret.Timer(16.6, 0);
			this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerHandle, this);
			this.up = new egret.Shape();
			this.up.graphics.beginFill(0x000000, 0.5);
			this.up.graphics.lineStyle(2);
			this.up.graphics.drawRect(100, 100, 40, 80);
			this.up.graphics.endFill();
			this.up.touchEnabled = true;
			this.up.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
				this.status = 1;
			}, this)
			this.up.addEventListener(egret.TouchEvent.TOUCH_END, () => {
				this.status = 0;
			}, this)
			this.addChild(this.up);
		}

		private timerHandle() {
			switch (this.status) {
				case 1:
					break;
			}
		}
	}
}