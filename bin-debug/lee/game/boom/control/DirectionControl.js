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
            this.status = 0;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        var d = __define,c=DirectionControl,p=c.prototype;
        p.onAddToStage = function (event) {
            var _this = this;
            this.timer = new egret.Timer(16.6, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerHandle, this);
            this.up = new egret.Shape();
            this.up.graphics.beginFill(0x000000, 0.5);
            this.up.graphics.lineStyle(2);
            this.up.graphics.drawRect(100, 100, 40, 80);
            this.up.graphics.endFill();
            this.up.touchEnabled = true;
            this.up.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
                _this.status = 1;
            }, this);
            this.up.addEventListener(egret.TouchEvent.TOUCH_END, function () {
                _this.status = 0;
            }, this);
            this.addChild(this.up);
        };
        p.timerHandle = function () {
            switch (this.status) {
                case 1:
                    break;
            }
        };
        return DirectionControl;
    }(egret.DisplayObjectContainer));
    boom.DirectionControl = DirectionControl;
    egret.registerClass(DirectionControl,'boom.DirectionControl');
})(boom || (boom = {}));
//# sourceMappingURL=DirectionControl.js.map