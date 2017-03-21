var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var boom;
(function (boom) {
    var BoomRequest = (function () {
        function BoomRequest() {
        }
        return BoomRequest;
    }());
    boom.BoomRequest = BoomRequest;
    __reflect(BoomRequest.prototype, "boom.BoomRequest");
})(boom || (boom = {}));
//# sourceMappingURL=BoomRequest.js.map