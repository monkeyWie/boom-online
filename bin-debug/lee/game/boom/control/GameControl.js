/**
 *
 * @author
 * 方向控制类
 */
var boom;
(function (boom) {
    var GameControl = (function (_super) {
        __extends(GameControl, _super);
        function GameControl() {
            _super.call(this);
            //按钮半径
            this._radius = 20;
            //按钮间隔
            this._space = this._radius / 2;
            this._status = "";
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        var d = __define,c=GameControl,p=c.prototype;
        p.onAddToStage = function (event) {
            var _height = this.stage.stageHeight;
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
            var _obj = this;
            this.startEvent = new boom.ControlEvent(boom.ControlEvent.START);
            this.stopEvent = new boom.ControlEvent(boom.ControlEvent.STOP);
            //触屏监听
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.handleTouch, this);
            this.up.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.doUp, this);
            this.up.addEventListener(egret.TouchEvent.TOUCH_END, this.doStop, this);
            this.up.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.doStop, this);
            this.down.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.doDown, this);
            this.down.addEventListener(egret.TouchEvent.TOUCH_END, this.doStop, this);
            this.down.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.doStop, this);
            this.left.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.doLeft, this);
            this.left.addEventListener(egret.TouchEvent.TOUCH_END, this.doStop, this);
            this.left.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.doStop, this);
            this.right.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.doRight, this);
            this.right.addEventListener(egret.TouchEvent.TOUCH_END, this.doStop, this);
            this.right.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.doStop, this);
            //键盘监听
            document.addEventListener("keydown", function (e) {
                var currStatus = "";
                switch (e.keyCode) {
                    case 38:
                        currStatus = "up";
                        break;
                    case 40:
                        currStatus = "down";
                        break;
                    case 37:
                        currStatus = "left";
                        break;
                    case 39:
                        currStatus = "right";
                        break;
                }
                if (currStatus != _obj._status) {
                    _obj._status = currStatus;
                    _obj.commonDo();
                }
                return false;
            });
            document.addEventListener("keyup", function (e) {
                _obj._status = "";
                _obj.dispatchEvent(_obj.stopEvent);
            });
        };
        p.doUp = function () {
            this._status = "up";
            this.commonDo();
        };
        p.doDown = function () {
            this._status = "down";
            this.commonDo();
        };
        p.doLeft = function () {
            this._status = "left";
            this.commonDo();
        };
        p.doRight = function () {
            this._status = "right";
            this.commonDo();
        };
        p.commonDo = function () {
            this.startEvent._status = this._status;
            this.dispatchEvent(this.startEvent);
        };
        p.doStop = function () {
            this._status = "";
            this.dispatchEvent(this.stopEvent);
        };
        p.handleTouch = function (evt) {
            console.log(evt.target.x);
            console.log(evt.target.y);
        };
        return GameControl;
    }(egret.DisplayObjectContainer));
    boom.GameControl = GameControl;
    egret.registerClass(GameControl,'boom.GameControl');
})(boom || (boom = {}));
//# sourceMappingURL=GameControl.js.map