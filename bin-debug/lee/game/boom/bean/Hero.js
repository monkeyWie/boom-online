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
            _super.call(this);
            //行走速度
            this.speed = 5;
            var data = RES.getRes("baobao_json");
            var txtr = RES.getRes("baobao_png");
            var mcFactory = new egret.MovieClipDataFactory(data, txtr);
            this.mcds = {
                "up": mcFactory.generateMovieClipData("up"),
                "down": mcFactory.generateMovieClipData("down"),
                "left": mcFactory.generateMovieClipData("left"),
                "right": mcFactory.generateMovieClipData("right")
            };
            //this.scaleX = 2;
            //this.scaleY = 2;
            this.movieClipData = this.mcds["down"];
            this.gotoAndStop(1);
        }
        var d = __define,c=Hero,p=c.prototype;
        p.getSpped = function () {
            return this.speed;
        };
        p.setSpped = function (speed) {
            this.speed = speed;
        };
        /**
         * 人物行走
         * @param 方向 up,down,left,right
         */
        p.run = function (direction) {
            this.movieClipData = this.mcds[direction];
            if (this.currentFrame == this.totalFrames) {
                this.gotoAndStop(1);
            }
            this.nextFrame();
            switch (direction) {
                case "up":
                    this.y -= this.speed;
                    break;
                case "down":
                    this.y += this.speed;
                    break;
                case "left":
                    this.x -= this.speed;
                    break;
                case "right":
                    this.x += this.speed;
                    break;
            }
        };
        return Hero;
    }(egret.MovieClip));
    boom.Hero = Hero;
    egret.registerClass(Hero,'boom.Hero');
})(boom || (boom = {}));
//# sourceMappingURL=Hero.js.map