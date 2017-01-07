var boom;
(function (boom) {
    var GameScene = (function (_super) {
        __extends(GameScene, _super);
        function GameScene() {
            _super.call(this);
            this.hero = new boom.Hero();
            this.map = new boom.Map();
            this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.drawGameView, this);
        }
        var d = __define,c=GameScene,p=c.prototype;
        p.onAddToStage = function () {
            this.addChild(this.map);
            this.addChild(this.hero);
        };
        p.drawGameView = function () {
            this.hero.draw();
        };
        return GameScene;
    }(egret.DisplayObjectContainer));
    boom.GameScene = GameScene;
    egret.registerClass(GameScene,'boom.GameScene');
})(boom || (boom = {}));
//# sourceMappingURL=GameScene.js.map