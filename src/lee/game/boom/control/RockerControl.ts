module boom {
	/**
	 * 摇杆型手柄
	 */
	export class RockerControl extends egret.DisplayObjectContainer {

		private _in: egret.Bitmap;
		private _out: egret.Bitmap;

		private startEvent: ControlEvent;
		private stopEvent: ControlEvent;

		public constructor() {
			super();
			this._in = new egret.Bitmap(RES.getRes("control_in_png"));
			this._out = new egret.Bitmap(RES.getRes("control_out_png"));
			this._in.visible = false;
			this._out.visible = false;
			this.startEvent = new ControlEvent(ControlEvent.START);
			this.stopEvent = new ControlEvent(ControlEvent.STOP);
			this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}

		private onAddToStage(event: egret.Event) {
			let bg: egret.Shape = new egret.Shape();
			bg.graphics.beginFill(0x000000, 0);
			bg.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
			bg.graphics.endFill();
			this.addChild(bg);
			this.addChild(this._out);
			this.addChild(this._in);

			this.touchEnabled = true;
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
			this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
		}

		private onTouchBegin(evt: egret.TouchEvent) {
			this._in.visible = true;
			this._out.visible = true;
			//半径
			let rIn: number = this._in.width / 2;
			let rOut: number = this._out.width / 2;
			this._in.x = evt.stageX - rIn;
			this._in.y = evt.stageY - rIn;
			this._out.x = evt.stageX - rOut;
			this._out.y = evt.stageY - rOut;
		}

		private onTouchMove(evt: egret.TouchEvent) {
			//半径
			let rIn: number = this._in.width / 2;
			let x1 = this._out.x;
			let y1 = this._out.y;
			let x2 = evt.stageX - rIn;
			let y2 = evt.stageY - rIn;
			//计算摇杆是否超出了外部圆圈
			let distance = Math.abs(Math.sqrt((Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))));
			//两点间的距离小于外部圆圈的半径
			if (distance < this._out.width / 2) {
				this._in.x = x2;
				this._in.y = y2;
			} else {
				//半径
				let rOut: number = this._out.width / 2;
				//圆心坐标
				let circleX = x1 + rOut;
				let circleY = y1 + rOut;
				//算点相对圆心的弧度
				let radian = Math.atan2(y2 - y1, x2 - x1);
				//计算摇杆坐标
				//x1   =   x0   +   r   *   cos(ao) 
				//y1   =   y0   +   r   *   sin(ao) 
				let x = circleX + rIn * Math.cos(radian);
				let y = circleY + rIn * Math.sin(radian);
				this._in.x = x - rIn;
				this._in.y = y - rIn;
			}
			this.handleTouch();
		}

		/**
		 * 计算行走方向
		 */
		private handleTouch() {
			let radian = Math.atan2(this._in.y - this._out.y, this._in.x - this._out.x);
			//计算角度
			let angle = radian*180/Math.PI;
			//上
			if(angle>=-135&&angle<-45){
				this.startEvent._status = "up";
			}else if(angle>=-45&&angle<45){
				this.startEvent._status = "right";
			}else if(angle>=45&&angle<135){
				this.startEvent._status = "down";
			}else{
				this.startEvent._status="left";
			}
			this.dispatchEvent(this.startEvent);
		}

		private onTouchEnd(evt: egret.TouchEvent) {
			this._in.visible = false;
			this._out.visible = false;
			this.dispatchEvent(this.stopEvent);
		}
	}
}