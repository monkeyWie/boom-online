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
        private tmxTileMap: tiled.TMXTilemap;

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
            let data: any = egret.XML.parse(event.currentTarget.response);
            /*初始化地图*/
            this.tmxTileMap = new tiled.TMXTilemap(512, 480, data, this.url);
            this.tmxTileMap.render();
            /*将地图添加到显示列表*/
            this.addChild(this.tmxTileMap);
        }

        public isHit(x: number, y: number): boolean {
            //根据坐标取要检测的块
            let tileX: number = Math.floor(x / 32);
            let tileY: number = Math.floor(y / 32);
            let layer: tiled.TMXLayer = this.tmxTileMap.getLayers()[0];
            let tile: tiled.TMXTile = layer.layerData[tileX][tileY];
            if (this.getPropValueByName(tile, "isHit")) {
                return true;
            }
            return false;
        }

        private getPropValueByName(tile: tiled.TMXTile, name: string) {
            let ret = null;
            let props: tiled.TMXProperty[] = tile.tileset.getProperties();
            if (props != null && props.length > 0) {
                props.forEach(prop => {
                    if (prop.name == name) {
                        ret = prop.value;
                        return false;
                    }
                });
            }
            return ret;
        }
    }
}

