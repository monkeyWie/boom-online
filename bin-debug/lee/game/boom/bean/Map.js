/**
 *
 * @author
 * 地图类
 */
var boom;
(function (boom) {
    var Map = (function (_super) {
        __extends(Map, _super);
        function Map() {
            _super.call(this);
            this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        var d = __define,c=Map,p=c.prototype;
        p.onAddToStage = function () {
            /*初始化资源加载路径*/
            this.url = "resource/boom.tmx";
            /*初始化请求*/
            this.request = new egret.HttpRequest();
            /*监听资源加载完成事件*/
            this.request.once(egret.Event.COMPLETE, this.onMapComplete, this);
            /*发送请求*/
            this.request.open(this.url, egret.HttpMethod.GET);
            this.request.send();
        };
        /*地图加载完成*/
        p.onMapComplete = function (event) {
            /*获取到地图数据*/
            var data = egret.XML.parse(event.currentTarget.response);
            /*初始化地图*/
            var tmxTileMap = new tiled.TMXTilemap(512, 480, data, this.url);
            tmxTileMap.render();
            /*将地图添加到显示列表*/
            this.addChild(tmxTileMap);
        };
        return Map;
    }(egret.DisplayObjectContainer));
    boom.Map = Map;
    egret.registerClass(Map,'boom.Map');
})(boom || (boom = {}));
//# sourceMappingURL=Map.js.map