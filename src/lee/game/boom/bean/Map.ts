/**
 *
 * @author 
 * 地图类
 */
namespace boom {
    export class Map extends egret.DisplayObjectContainer {
        /*设置请求*/
        private request: egret.HttpRequest;
        /*设置资源加载路径*/
        private url: string;
        public constructor() {
            super();
            this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage() {
            /*初始化资源加载路径*/
            this.url = "resource/boom.tmx";
            /*初始化请求*/
            this.request = new egret.HttpRequest();
            /*监听资源加载完成事件*/
            this.request.once(egret.Event.COMPLETE, this.onMapComplete, this);
            /*发送请求*/
            this.request.open(this.url, egret.HttpMethod.GET);
            this.request.send();
        }

        /*地图加载完成*/
        private onMapComplete(event: egret.Event) {
            /*获取到地图数据*/
            var data: any = egret.XML.parse(event.currentTarget.response);
            /*初始化地图*/
            var tmxTileMap: tiled.TMXTilemap = new tiled.TMXTilemap(512, 480, data, this.url);
            tmxTileMap.render();
            /*将地图添加到显示列表*/
            this.addChild(tmxTileMap);
        }
    }
}

