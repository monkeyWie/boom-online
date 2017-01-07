namespace boom {
	export class GameScene extends egret.DisplayObjectContainer {
		public hero: Hero;
		public map: Map;

		public constructor() {
			super();
			this.hero = new Hero();
			this.map = new Map();
			this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
			this.addEventListener(egret.Event.ENTER_FRAME,this.drawGameView,this);
		}

		private onAddToStage(){
			this.addChild(this.map);
			this.addChild(this.hero);
		}

		private drawGameView(){
			this.hero.draw();
		}
	}
}