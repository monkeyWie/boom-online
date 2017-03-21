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
            _this.status = 0;
            var data = RES.getRes("baobao_json");
            var txtr = RES.getRes("baobao_png");
            var mcFactory = new egret.MovieClipDataFactory(data, txtr);
            _this.mcds = {
                1: mcFactory.generateMovieClipData("up"),
                2: mcFactory.generateMovieClipData("down"),
                3: mcFactory.generateMovieClipData("left"),
                4: mcFactory.generateMovieClipData("right")
            };
            _this.scaleX = 0.8;
            _this.scaleY = 0.8;
            _this.movieClipData = _this.mcds[2];
            _this.frameRate = 48;
            _this.x = 32;
            _this.y = 64;
            _this.gotoAndStop(1);
            return _this;
        }
        Hero.prototype.getId = function () {
            return this.id;
        };
        Hero.prototype.setId = function (id) {
            this.id = id;
        };
        Hero.prototype.getSpeed = function () {
            return this.speed;
        };
        Hero.prototype.setSpeed = function (speed) {
            this.speed = speed;
        };
        Hero.prototype.getStatus = function () {
            return this.status;
        };
        Hero.prototype.setStatus = function (status) {
            this.status = status;
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
                    case 1:
                        //this.y -= repairSpeed;
                        afterY -= repairSpeed;
                        //上
                        hitY1 = hitY2 -= repairSpeed;
                        //右
                        hitX2 += this.width;
                        break;
                    case 2:
                        //this.y += repairSpeed;
                        afterY += repairSpeed;
                        //下
                        hitY1 = hitY2 = hitY2 + repairSpeed + this.height;
                        //右
                        hitX2 += this.width;
                        break;
                    case 3:
                        // this.x -= repairSpeed;
                        afterX -= repairSpeed;
                        //左
                        hitX1 = hitX2 -= repairSpeed;
                        //下
                        hitY2 += this.height;
                        break;
                    case 4:
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
            this.status = 0;
            this.stop();
        };
        /**
         * 放炸弹
         */
        Hero.prototype.dropBomb = function () {
        };
        return Hero;
    }(egret.MovieClip));
    boom.Hero = Hero;
    __reflect(Hero.prototype, "boom.Hero");
})(boom || (boom = {}));
//# sourceMappingURL=Hero.js.map