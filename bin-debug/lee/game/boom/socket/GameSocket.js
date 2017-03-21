var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var boom;
(function (boom) {
    var GameSocket = (function () {
        function GameSocket() {
        }
        GameSocket.init = function (onConnect, onRecive) {
            var _this = this;
            if (this.socket == null) {
                this.socket = new egret.WebSocket();
                this.socket.connect(this.host, this.port);
                this.socket.addEventListener(egret.Event.CONNECT, onConnect, this);
                this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, function () {
                    onRecive(_this.socket.readUTF());
                }, this);
            }
        };
        GameSocket.send = function (msg) {
            this.socket.writeUTF(msg);
        };
        return GameSocket;
    }());
    GameSocket.host = "192.168.18.41";
    GameSocket.port = 8080;
    boom.GameSocket = GameSocket;
    __reflect(GameSocket.prototype, "boom.GameSocket");
})(boom || (boom = {}));
//# sourceMappingURL=GameSocket.js.map