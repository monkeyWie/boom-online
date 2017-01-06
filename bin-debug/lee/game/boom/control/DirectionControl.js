/**
 *
 * @author
 * 方向控制类
 */
var boom;
(function (boom) {
    var DirectionControl = (function (_super) {
        __extends(DirectionControl, _super);
        function DirectionControl() {
            _super.call(this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        var d = __define,c=DirectionControl,p=c.prototype;
        p.onAddToStage = function (event) {
            this.up = new egret.Shape();
            this.up.graphics.beginFill(0x000000, 0.5);
            this.up.graphics.lineStyle(2);
            this.up.graphics.drawRect(100, 100, 20, 50);
            this.up.graphics.endFill();
            this.up.touchEnabled = true;
            this.up.addEventListener(egret.TouchEvent.TOUCH_ROLL_OVER, this.doUp, this);
            this.addChild(this.up);
        };
        p.doUp = function () {
            console.log("上上上");
        };
        return DirectionControl;
    }(egret.DisplayObjectContainer));
    boom.DirectionControl = DirectionControl;
    egret.registerClass(DirectionControl,'boom.DirectionControl');
})(boom || (boom = {}));
//# sourceMappingURL=DirectionControl.js.map