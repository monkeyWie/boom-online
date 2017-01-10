var boom;
(function (boom) {
    var GameScene = (function (_super) {
        __extends(GameScene, _super);
        function GameScene() {
            _super.call(this);
            this.map = new boom.Map();
            this.hero = new boom.Hero();
            this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        var d = __define,c=GameScene,p=c.prototype;
        p.onAddToStage = function () {
            this.addChild(this.map);
            this.addChild(this.hero);
            this.lastTime = egret.getTimer();
            this.addEventListener(egret.Event.ENTER_FRAME, this.drawGameView, this);
            //手柄控制器
            this.control = new boom.GameControl();
            this.control.addEventListener(boom.ControlEvent.START, this.onTouchStart, this);
            this.control.addEventListener(boom.ControlEvent.STOP, this.onTouchStop, this);
            this.addChild(this.control);
        };
        p.drawGameView = function () {
            var nowTime = egret.getTimer();
            var fps = 1000 / (nowTime - this.lastTime);
            this.lastTime = nowTime;
            this.hero.draw(60 / fps);
        };
        p.onTouchStart = function (evt) {
            this.hero.runStart(evt._status);
        };
        p.onTouchStop = function () {
            this.hero.runStop();
        };
        return GameScene;
    }(egret.DisplayObjectContainer));
    boom.GameScene = GameScene;
    egret.registerClass(GameScene,'boom.GameScene');
})(boom || (boom = {}));
//# sourceMappingURL=GameScene.js.map