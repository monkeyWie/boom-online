/**
 *
 * @author 
 * 英雄类
 */
namespace boom {
    export class Hero extends egret.MovieClip {
        //行走速度
        private speed: number = 1;
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
            this.frameRate = 48;
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
        public draw(offset: number) {
            // if (this.currentFrame == this.totalFrames) {
            //     this.gotoAndStop(1);
            // }
            //this.nextFrame();
            //this.gotoAndPlay(1,-1);
            //修复后的速度
            let repairSpeed = this.speed * offset;
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
        }

        /**
         * 人物行走
         * @param 方向 up,down,left,right
         */
        public runStart(direction: string) {
            if (this.status != direction) {
                this.status = direction;
                this.movieClipData = this.mcds[this.status];
                this.gotoAndPlay(1, -1);
            }
        }

        public runStop() {
            this.status = "";
            this.stop();
        }
    }
}