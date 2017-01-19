var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var boom;
(function (boom) {
    var GameHandle = (function () {
        function GameHandle() {
        }
        return GameHandle;
    }());
    boom.GameHandle = GameHandle;
    __reflect(GameHandle.prototype, "boom.GameHandle");
})(boom || (boom = {}));
//# sourceMappingURL=GameHandle.js.map