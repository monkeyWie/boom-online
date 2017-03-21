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
    var ControlEvent = (function (_super) {
        __extends(ControlEvent, _super);
        function ControlEvent(type, bubbles, cancelable) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            var _this = _super.call(this, type, bubbles, cancelable) || this;
            _this._status = 0;
            return _this;
        }
        return ControlEvent;
    }(egret.Event));
    ControlEvent.START = "START";
    ControlEvent.STOP = "STOP";
    boom.ControlEvent = ControlEvent;
    __reflect(ControlEvent.prototype, "boom.ControlEvent");
})(boom || (boom = {}));
//# sourceMappingURL=ControlEvent.js.map