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
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        GameScene.prototype.onAddToStage = function () {
            this.addChild(this.map);
            this.addChild(this.hero);
            this.lastTime = egret.getTimer();
            this.addEventListener(egret.Event.ENTER_FRAME, this.drawGameView, this);
            //手柄控制器
            this.control = new boom.RockerControl();
            this.control.addEventListener(boom.ControlEvent.START, this.onTouchStart, this);
            this.control.addEventListener(boom.ControlEvent.STOP, this.onTouchStop, this);
            this.addChild(this.control);
            // this.control = new RockerControl();
            // this.addChild(this.control);
        };
        GameScene.prototype.drawGameView = function () {
            var nowTime = egret.getTimer();
            var fps = 1000 / (nowTime - this.lastTime);
            this.lastTime = nowTime;
            this.hero.draw(60 / fps);
        };
        GameScene.prototype.onTouchStart = function (evt) {
            this.hero.runStart(evt._status);
        };
        GameScene.prototype.onTouchStop = function () {
            this.hero.runStop();
        };
        return GameScene;
    }(egret.DisplayObjectContainer));
    boom.GameScene = GameScene;
    __reflect(GameScene.prototype, "boom.GameScene");
})(boom || (boom = {}));
//# sourceMappingURL=GameScene.js.map