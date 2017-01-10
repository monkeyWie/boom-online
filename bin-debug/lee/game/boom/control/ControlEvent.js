var boom;
(function (boom) {
    var ControlEvent = (function (_super) {
        __extends(ControlEvent, _super);
        function ControlEvent(type, bubbles, cancelable) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            _super.call(this, type, bubbles, cancelable);
            this._status = "";
        }
        var d = __define,c=ControlEvent,p=c.prototype;
        ControlEvent.START = "START";
        ControlEvent.STOP = "STOP";
        return ControlEvent;
    }(egret.Event));
    boom.ControlEvent = ControlEvent;
    egret.registerClass(ControlEvent,'boom.ControlEvent');
})(boom || (boom = {}));
//# sourceMappingURL=ControlEvent.js.map