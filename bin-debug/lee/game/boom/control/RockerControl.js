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
    /**
     * 摇杆型手柄
     */
    var RockerControl = (function (_super) {
        __extends(RockerControl, _super);
        function RockerControl() {
            var _this = _super.call(this) || this;
            _this._in = new egret.Bitmap(RES.getRes("control_in_png"));
            _this._out = new egret.Bitmap(RES.getRes("control_out_png"));
            _this._in.visible = false;
            _this._out.visible = false;
            _this.startEvent = new boom.ControlEvent(boom.ControlEvent.START);
            _this.stopEvent = new boom.ControlEvent(boom.ControlEvent.STOP);
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        RockerControl.prototype.onAddToStage = function (event) {
            var bg = new egret.Shape();
            bg.graphics.beginFill(0x000000, 0);
            bg.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
            bg.graphics.endFill();
            this.addChild(bg);
            this.addChild(this._out);
            this.addChild(this._in);
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        };
        RockerControl.prototype.onTouchBegin = function (evt) {
            this._in.visible = true;
            this._out.visible = true;
            //半径
            var rIn = this._in.width / 2;
            var rOut = this._out.width / 2;
            this._in.x = evt.stageX - rIn;
            this._in.y = evt.stageY - rIn;
            this._out.x = evt.stageX - rOut;
            this._out.y = evt.stageY - rOut;
        };
        RockerControl.prototype.onTouchMove = function (evt) {
            //半径
            var rIn = this._in.width / 2;
            var x1 = this._out.x;
            var y1 = this._out.y;
            var x2 = evt.stageX - rIn;
            var y2 = evt.stageY - rIn;
            //计算摇杆是否超出了外部圆圈
            var distance = Math.abs(Math.sqrt((Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))));
            //两点间的距离小于外部圆圈的半径
            if (distance < this._out.width / 2) {
                this._in.x = x2;
                this._in.y = y2;
            }
            else {
                //半径
                var rOut = this._out.width / 2;
                //圆心坐标
                var circleX = x1 + rOut;
                var circleY = y1 + rOut;
                //算点相对圆心的弧度
                var radian = Math.atan2(y2 - y1, x2 - x1);
                //计算摇杆坐标
                //x1   =   x0   +   r   *   cos(ao) 
                //y1   =   y0   +   r   *   sin(ao) 
                var x = circleX + rIn * Math.cos(radian);
                var y = circleY + rIn * Math.sin(radian);
                this._in.x = x - rIn;
                this._in.y = y - rIn;
            }
            this.handleTouch();
        };
        /**
         * 计算行走方向
         */
        RockerControl.prototype.handleTouch = function () {
            var radian = Math.atan2(this._in.y - this._out.y, this._in.x - this._out.x);
            //计算角度
            var angle = radian * 180 / Math.PI;
            //上
            if (angle >= -135 && angle < -45) {
                this.startEvent._status = "up";
            }
            else if (angle >= -45 && angle < 45) {
                this.startEvent._status = "right";
            }
            else if (angle >= 45 && angle < 135) {
                this.startEvent._status = "down";
            }
            else {
                this.startEvent._status = "left";
            }
            this.dispatchEvent(this.startEvent);
        };
        RockerControl.prototype.onTouchEnd = function (evt) {
            this._in.visible = false;
            this._out.visible = false;
            this.dispatchEvent(this.stopEvent);
        };
        return RockerControl;
    }(egret.DisplayObjectContainer));
    boom.RockerControl = RockerControl;
    __reflect(RockerControl.prototype, "boom.RockerControl");
})(boom || (boom = {}));
//# sourceMappingURL=RockerControl.js.map