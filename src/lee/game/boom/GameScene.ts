namespace boom {
	export class GameScene extends egret.DisplayObjectContainer {
		private hero: Hero;
		private map: Map;
		private control: GameControl;
		private lastTime: number;

		public constructor() {
			super();
			this.map = new Map();
			this.hero = new Hero();
			this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}

		private onAddToStage() {
			this.addChild(this.map);
			this.addChild(this.hero);
			this.lastTime = egret.getTimer();
			this.addEventListener(egret.Event.ENTER_FRAME, this.drawGameView, this);
			//手柄控制器
			this.control = new GameControl();
			this.control.addEventListener(ControlEvent.START,this.onTouchStart,this);
			this.control.addEventListener(ControlEvent.STOP,this.onTouchStop,this);
			this.addChild(this.control);
		}

		private drawGameView() {
			var nowTime: number = egret.getTimer();
			var fps: number = 1000 / (nowTime - this.lastTime);
			this.lastTime = nowTime;
			this.hero.draw(60 / fps);
		}

		private onTouchStart(evt:ControlEvent) {
			this.hero.runStart(evt._status);
		}

		private onTouchStop() {
			this.hero.runStop();
		}

	}
}