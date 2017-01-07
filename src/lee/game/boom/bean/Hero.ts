/**
 *
 * @author 
 * 英雄类
 */
namespace boom {
    export class Hero extends egret.MovieClip {
        //行走速度
        private speed: number = 5;
        //动画效果集合
        private mcds: { [key: string]: egret.MovieClipData; };
        //状态
        private status = "";

        public constructor() {
            super();
            let data = RES.getRes("baobao_json");
            let txtr = RES.getRes("baobao_png");
            let mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
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

        public getSpped(): number {
            return this.speed;
        }
        public setSpped(speed: number): void {
            this.speed = speed;
        }

        /**
         * 渲染
         */
        public draw() {
            this.movieClipData = this.mcds[this.status];
            if (this.currentFrame == this.totalFrames) {
                this.gotoAndStop(1);
            }
            this.nextFrame();
            switch (this.status) {
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
        }

        /**
         * 人物行走
         * @param 方向 up,down,left,right
         */
        public run(direction: string) {
            this.status = direction;
        }

        public stop() {
            this.status = "";
        }
    }
}
