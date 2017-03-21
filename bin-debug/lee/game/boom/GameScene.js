var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var boom;
(function (boom) {
    var GameScene = (function (_super) {
        __extends(GameScene, _super);
        function GameScene() {
            var _this = _super.call(this) || this;
            _this.map = new boom.Map();
            _this.hero = new boom.Hero();
            _this.otherHeros = new Array();
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        GameScene.prototype.onAddToStage = function () {
            var _this = this;
            this.addChild(this.map);
            this.addChild(this.hero);
            this.lastTime = egret.getTimer();
            this.addEventListener(egret.Event.ENTER_FRAME, this.drawGameView, this);
            //手柄控制器
            this.control = new boom.RockerControl();
            this.control.addEventListener(boom.ControlEvent.START, this.onTouchStart, this);
            this.control.addEventListener(boom.ControlEvent.STOP, this.onTouchStop, this);
            this.addChild(this.control);
            //websocket init
            boom.GameSocket.init(function () {
                var req = new boom.BoomRequest();
                req.status = 0;
                req.bussObj = {};
                //连接成功请求分配英雄ID
                boom.GameSocket.send(JSON.stringify(req));
            }, function (recive) {
                var msg = JSON.parse(recive);
                if (msg["status"] == 0) {
                    _this.hero.setId(msg["bussObj"]);
                    var req = new boom.BoomRequest();
                    req.status = 1;
                    req.bussObj = {};
                    //分配英雄ID成功请求加载其他英雄
                    boom.GameSocket.send(JSON.stringify(req));
                }
                if (msg["status"] == 1) {
                    var heros = msg["bussObj"];
                    if (heros) {
                        heros.forEach(function (h) {
                            var joinHero = new boom.Hero();
                            joinHero.setId(h["id"]);
                            joinHero.setSpeed(h["speed"]);
                            joinHero.setStatus(h["status"]);
                            joinHero.x = h["x"];
                            joinHero.y = h["y"];
                            _this.otherHeros.push(joinHero);
                            _this.addChild(joinHero);
                        });
                    }
                    var req = new boom.BoomRequest();
                    req.status = 2;
                    req.bussObj = {};
                    //加载其他英雄成功通知服务器当前用户创建成功
                    boom.GameSocket.send(JSON.stringify(req));
                }
                if (msg["status"] == 2) {
                    var reciveHero = msg["bussObj"];
                    var joinHero = new boom.Hero();
                    joinHero.setId(reciveHero["id"]);
                    joinHero.setSpeed(reciveHero["speed"]);
                    joinHero.setStatus(reciveHero["status"]);
                    if (joinHero.getId() != _this.hero.getId()) {
                        _this.otherHeros.push(joinHero);
                        _this.addChild(joinHero);
                    }
                }
                if (msg["status"] == 3) {
                    var reciveHero_1 = msg["bussObj"];
                    if (_this.hero.getId() == reciveHero_1["id"]) {
                        _this.hero.setSpeed(reciveHero_1["speed"]);
                        console.log(reciveHero_1["status"]);
                        if (reciveHero_1["status"] == 0) {
                            _this.hero.runStop();
                        }
                        else {
                            _this.hero.runStart(reciveHero_1["status"]);
                        }
                        return;
                    }
                    _this.otherHeros.forEach(function (h) {
                        if (h.getId() == reciveHero_1["id"]) {
                            h.setSpeed(reciveHero_1["speed"]);
                            if (reciveHero_1["status"] == 0) {
                                h.runStop();
                            }
                            else {
                                h.runStart(reciveHero_1["status"]);
                            }
                            return false;
                        }
                    });
                }
            });
        };
        GameScene.prototype.drawGameView = function () {
            var nowTime = egret.getTimer();
            var fps = 1000 / (nowTime - this.lastTime);
            this.lastTime = nowTime;
            this.hero.draw(60 / fps);
            this.otherHeros.forEach(function (h) {
                h.draw(60 / fps);
            });
        };
        GameScene.prototype.onTouchStart = function (evt) {
            var req = new boom.BoomRequest();
            req.status = 3;
            req.bussObj = { status: evt._status };
            boom.GameSocket.send(JSON.stringify(req));
        };
        GameScene.prototype.onTouchStop = function () {
            var req = new boom.BoomRequest();
            req.status = 3;
            req.bussObj = { status: 0, x: this.hero.x, y: this.hero.y };
            boom.GameSocket.send(JSON.stringify(req));
        };
        return GameScene;
    }(egret.DisplayObjectContainer));
    boom.GameScene = GameScene;
    __reflect(GameScene.prototype, "boom.GameScene");
})(boom || (boom = {}));
//# sourceMappingURL=GameScene.js.map