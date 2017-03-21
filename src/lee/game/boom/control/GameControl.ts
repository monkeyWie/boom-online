/**
 *
 * @author 
 * 方向控制类
 */
namespace boom {
	export class GameControl extends egret.DisplayObjectContainer {
		private up: egret.Shape;
		private down: egret.Shape;
		private left: egret.Shape;
		private right: egret.Shape;
		//按钮半径
		private _radius: number = 20;
		//按钮间隔
		private _space: number = this._radius / 2;
		private _status: number = 0;

		private startEvent: ControlEvent;
		private stopEvent: ControlEvent;

		public constructor() {
			super();
			this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}

		private onAddToStage(event: egret.Event) {
			let _height = this.stage.stageHeight;

			this.up = new egret.Shape();
			this.up.x = this._radius * 3 + this._space;
			this.up.y = _height - this._radius * 5 - this._space;
			this.up.graphics.beginFill(0x000000, 0.5);
			this.up.graphics.lineStyle(2);
			this.up.graphics.drawCircle(0, 0, this._radius);
			this.up.graphics.endFill();
			this.up.touchEnabled = true;

			this.down = new egret.Shape();
			this.down.x = this._radius * 3 + this._space;
			this.down.y = _height - this._radius - this._space;
			this.down.graphics.beginFill(0x000000, 0.5);
			this.down.graphics.lineStyle(2);
			this.down.graphics.drawCircle(0, 0, this._radius);
			this.down.graphics.endFill();
			this.down.touchEnabled = true;

			this.left = new egret.Shape();
			this.left.x = this._radius + this._space;
			this.left.y = _height - this._radius * 3 - this._space;
			this.left.graphics.beginFill(0x000000, 0.5);
			this.left.graphics.lineStyle(2);
			this.left.graphics.drawCircle(0, 0, this._radius);
			this.left.graphics.endFill();
			this.left.touchEnabled = true;

			this.right = new egret.Shape();
			this.right.x = this._radius * 5 + this._space;
			this.right.y = _height - this._radius * 3 - this._space;
			this.right.graphics.beginFill(0x000000, 0.5);
			this.right.graphics.lineStyle(2);
			this.right.graphics.drawCircle(0, 0, this._radius);
			this.right.graphics.endFill();
			this.right.touchEnabled = true;

			this.addChild(this.up);
			this.addChild(this.down);
			this.addChild(this.left);
			this.addChild(this.right);

			let _obj = this;
			this.startEvent = new ControlEvent(ControlEvent.START);
			this.stopEvent = new ControlEvent(ControlEvent.STOP);

			//触屏监听
			this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.handleTouch, this);

			this.up.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.doUp, this)
			this.up.addEventListener(egret.TouchEvent.TOUCH_END, this.doStop, this)
			this.up.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.doStop, this)

			this.down.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.doDown, this)
			this.down.addEventListener(egret.TouchEvent.TOUCH_END, this.doStop, this)
			this.down.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.doStop, this)

			this.left.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.doLeft, this)
			this.left.addEventListener(egret.TouchEvent.TOUCH_END, this.doStop, this)
			this.left.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.doStop, this)

			this.right.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.doRight, this)
			this.right.addEventListener(egret.TouchEvent.TOUCH_END, this.doStop, this)
			this.right.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.doStop, this)

			//键盘监听
			document.addEventListener("keydown", function (e) {
				let currStatus = 0;
				switch (e.keyCode) {
					case 38:
						currStatus = 1;
						break;
					case 40:
						currStatus = 2;
						break;
					case 37:
						currStatus = 3;
						break;
					case 39:
						currStatus = 4;
						break;
				}
				if (currStatus != _obj._status) {
					_obj._status = currStatus;
					_obj.commonDo();
				}
				return false;
			});
			document.addEventListener("keyup", function (e) {
				_obj._status = 0;
				_obj.dispatchEvent(_obj.stopEvent);
			});
		}

		private doUp() {
			this._status = 1;
			this.commonDo();
		}

		private doDown() {
			this._status = 2;
			this.commonDo();
		}

		private doLeft() {
			this._status = 3;
			this.commonDo();
		}

		private doRight() {
			this._status = 4;
			this.commonDo();
		}

		private commonDo() {
			this.startEvent._status = this._status;
			this.dispatchEvent(this.startEvent);
		}

		private doStop() {
			this._status = 0;
			this.dispatchEvent(this.stopEvent);
		}

		private handleTouch(evt: egret.Event) {
			console.log(evt.target.x);
			console.log(evt.target.y);
		}

	}
}