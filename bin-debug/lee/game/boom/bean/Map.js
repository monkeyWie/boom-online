var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
            var _this = _super.call(this) || this;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        Map.prototype.onAddToStage = function () {
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
        Map.prototype.onMapComplete = function (event) {
            /*获取到地图数据*/
            var data = egret.XML.parse(event.currentTarget.response);
            /*初始化地图*/
            this.tmxTileMap = new tiled.TMXTilemap(512, 480, data, this.url);
            this.tmxTileMap.render();
            /*将地图添加到显示列表*/
            this.addChild(this.tmxTileMap);
        };
        Map.prototype.isHit = function (x, y) {
            //根据坐标取要检测的块
            var tileX = Math.floor(x / 32);
            var tileY = Math.floor(y / 32);
            var layer = this.tmxTileMap.getLayers()[0];
            var tile = layer.layerData[tileX][tileY];
            if (this.getPropValueByName(tile, "isHit")) {
                return true;
            }
            return false;
        };
        Map.prototype.getPropValueByName = function (tile, name) {
            var ret = null;
            var props = tile.tileset.getProperties();
            if (props != null && props.length > 0) {
                props.forEach(function (prop) {
                    if (prop.name == name) {
                        ret = prop.value;
                        return false;
                    }
                });
            }
            return ret;
        };
        return Map;
    }(egret.DisplayObjectContainer));
    boom.Map = Map;
    __reflect(Map.prototype, "boom.Map");
})(boom || (boom = {}));
//# sourceMappingURL=Map.js.map