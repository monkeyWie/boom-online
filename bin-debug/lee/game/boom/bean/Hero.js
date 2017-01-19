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
 * 英雄类
 */
var boom;
(function (boom) {
    var Hero = (function (_super) {
        __extends(Hero, _super);
        function Hero() {
            var _this = _super.call(this) || this;
            //行走速度
            _this.speed = 1;
            //状态
            _this.status = "";
            var data = RES.getRes("baobao_json");
            var txtr = RES.getRes("baobao_png");
            var mcFactory = new egret.MovieClipDataFactory(data, txtr);
            _this.mcds = {
                "up": mcFactory.generateMovieClipData("up"),
                "down": mcFactory.generateMovieClipData("down"),
                "left": mcFactory.generateMovieClipData("left"),
                "right": mcFactory.generateMovieClipData("right")
            };
            _this.scaleX = 0.8;
            _this.scaleY = 0.8;
            _this.movieClipData = _this.mcds["down"];
            _this.frameRate = 48;
            _this.x = 32;
            _this.y = 64;
            _this.gotoAndStop(1);
            return _this;
        }
        Hero.prototype.getSpped = function () {
            return this.speed;
        };
        Hero.prototype.setSpped = function (speed) {
            this.speed = speed;
        };
        /**
         * 渲染
         */
        Hero.prototype.draw = function (offset) {
            //修复后的速度
            var repairSpeed = this.speed * offset;
            var hitX1 = this.x, hitX2 = this.x, afterX = this.x;
            var hitY1 = this.y, hitY2 = this.y, afterY = this.y;
            if (this.status) {
                switch (this.status) {
                    case "up":
                        //this.y -= repairSpeed;
                        afterY -= repairSpeed;
                        //上
                        hitY1 = hitY2 -= repairSpeed;
                        //右
                        hitX2 += this.width;
                        break;
                    case "down":
                        //this.y += repairSpeed;
                        afterY += repairSpeed;
                        //下
                        hitY1 = hitY2 = hitY2 + repairSpeed + this.height;
                        //右
                        hitX2 += this.width;
                        break;
                    case "left":
                        // this.x -= repairSpeed;
                        afterX -= repairSpeed;
                        //左
                        hitX1 = hitX2 -= repairSpeed;
                        //下
                        hitY2 += this.height;
                        break;
                    case "right":
                        // this.x += repairSpeed;
                        afterX += repairSpeed;
                        //右
                        hitX1 = hitX2 = hitX2 + repairSpeed + this.width;
                        //下
                        hitY2 += this.height;
                        break;
                }
                //是否碰到障碍物
                if (!this.parent.map.isHit(hitX1, hitY1) && !this.parent.map.isHit(hitX2, hitY2)) {
                    this.x = afterX;
                    this.y = afterY;
                }
            }
        };
        /**
         * 人物行走
         * @param 方向 up,down,left,right
         */
        Hero.prototype.runStart = function (direction) {
            if (this.status != direction) {
                this.status = direction;
                this.movieClipData = this.mcds[this.status];
                this.gotoAndPlay(1, -1);
            }
        };
        Hero.prototype.runStop = function () {
            this.status = "";
            this.stop();
        };
        return Hero;
    }(egret.MovieClip));
    boom.Hero = Hero;
    __reflect(Hero.prototype, "boom.Hero");
})(boom || (boom = {}));
//# sourceMappingURL=Hero.js.map