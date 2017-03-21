namespace boom {
	export class GameScene extends egret.DisplayObjectContainer {
		public otherHeros: Array<Hero>;
		public hero: Hero;
		public map: Map;
		// private control: GameControl;
		private control: RockerControl;
		private lastTime: number;

		public constructor() {
			super();
			this.map = new Map();
			this.hero = new Hero();
			this.otherHeros = new Array();
			this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}

		private onAddToStage() {
			this.addChild(this.map);
			this.addChild(this.hero);
			this.lastTime = egret.getTimer();
			this.addEventListener(egret.Event.ENTER_FRAME, this.drawGameView, this);
			//手柄控制器
			this.control = new RockerControl();
			this.control.addEventListener(ControlEvent.START,this.onTouchStart,this);
			this.control.addEventListener(ControlEvent.STOP,this.onTouchStop,this);
			this.addChild(this.control);
			//websocket init
			GameSocket.init(
				()=>{//连接成功
					let req:BoomRequest=new BoomRequest();
					req.status=0;
					req.bussObj = {};
					//连接成功请求分配英雄ID
					GameSocket.send(JSON.stringify(req));
				},
				(recive:string)=>{
					let msg = JSON.parse(recive);
					if(msg["status"]==0){//分配英雄ID
						this.hero.setId(msg["bussObj"]);
						let req:BoomRequest=new BoomRequest();
						req.status=1;
						req.bussObj = {};
						//分配英雄ID成功请求加载其他英雄
						GameSocket.send(JSON.stringify(req));
					}
					if(msg["status"]==1){//加载其他英雄
						let heros = msg["bussObj"];
						if(heros){
							heros.forEach(h => {
								let joinHero:Hero = new Hero();
								joinHero.setId(h["id"]);
								joinHero.setSpeed(h["speed"]);
								joinHero.setStatus(h["status"]);
								joinHero.x=h["x"];
								joinHero.y=h["y"];
								this.otherHeros.push(joinHero);
								this.addChild(joinHero);
							});
						}
						let req:BoomRequest=new BoomRequest();
						req.status=2;
						req.bussObj = {};
						//加载其他英雄成功通知服务器当前用户创建成功
						GameSocket.send(JSON.stringify(req));
					}
					if(msg["status"]==2){//监听新加入的英雄
						let reciveHero = msg["bussObj"];
						let joinHero:Hero = new Hero();
						joinHero.setId(reciveHero["id"]);
						joinHero.setSpeed(reciveHero["speed"]);
						joinHero.setStatus(reciveHero["status"]);
						if(joinHero.getId()!=this.hero.getId()){
							this.otherHeros.push(joinHero);
							this.addChild(joinHero);
						}
					}
					if(msg["status"]==3){//更新英雄状态
						let reciveHero = msg["bussObj"];
						if(this.hero.getId()==reciveHero["id"]){
							this.hero.setSpeed(reciveHero["speed"]);
							console.log(reciveHero["status"]);
							if(reciveHero["status"]==0){
								this.hero.runStop();
							}else{
								this.hero.runStart(reciveHero["status"]);
							}
							return;
						}
						this.otherHeros.forEach(h => {
							if(h.getId()==reciveHero["id"]){								
								h.setSpeed(reciveHero["speed"]);
								if(reciveHero["status"]==0){
									h.runStop();
								}else{
									h.runStart(reciveHero["status"]);
								}
								return false;
							}
						});
					}
			});
		}

		private drawGameView() {
			var nowTime: number = egret.getTimer();
			var fps: number = 1000 / (nowTime - this.lastTime);
			this.lastTime = nowTime;
			this.hero.draw(60 / fps);
			this.otherHeros.forEach(h => {
				h.draw(60 / fps);
			});
		}

		private onTouchStart(evt:ControlEvent) {
			let req:BoomRequest=new BoomRequest();
			req.status=3;
			req.bussObj = {status:evt._status};
			GameSocket.send(JSON.stringify(req));
		}

		private onTouchStop() {
			let req:BoomRequest=new BoomRequest();
			req.status=3;
			req.bussObj = {status:0,x:this.hero.x,y:this.hero.y};
			GameSocket.send(JSON.stringify(req));
		}

	}
}