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
            this.speed = 1;
            //状态
            this.status = "";
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
            this.frameRate = 48;
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
         * 渲染
         */
        p.draw = function (offset) {
            // if (this.currentFrame == this.totalFrames) {
            //     this.gotoAndStop(1);
            // }
            //this.nextFrame();
            //this.gotoAndPlay(1,-1);
            //修复后的速度
            var repairSpeed = this.speed * offset;
            switch (this.status) {
                case "up":
                    this.y -= repairSpeed;
                    break;
                case "down":
                    this.y += repairSpeed;
                    break;
                case "left":
                    this.x -= repairSpeed;
                    break;
                case "right":
                    this.x += repairSpeed;
                    break;
            }
        };
        /**
         * 人物行走
         * @param 方向 up,down,left,right
         */
        p.runStart = function (direction) {
            if (this.status != direction) {
                this.status = direction;
                this.movieClipData = this.mcds[this.status];
                this.gotoAndPlay(1, -1);
            }
        };
        p.runStop = function () {
            this.status = "";
            this.stop();
        };
        return Hero;
    }(egret.MovieClip));
    boom.Hero = Hero;
    egret.registerClass(Hero,'boom.Hero');
})(boom || (boom = {}));
//# sourceMappingURL=Hero.js.map