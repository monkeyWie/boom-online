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
            this.scaleX = 0.8;
            this.scaleY = 0.8;
            this.movieClipData = this.mcds["down"];
            this.frameRate = 48;
            this.x = 32;
            this.y = 64;
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
            //修复后的速度
            let repairSpeed: number = this.speed * offset;
            let hitX1 = this.x, hitX2 = this.x, afterX: number = this.x;
            let hitY1 = this.y, hitY2 = this.y, afterY: number = this.y;

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
                if (!(<GameScene>this.parent).map.isHit(hitX1, hitY1) && !(<GameScene>this.parent).map.isHit(hitX2, hitY2)) {
                    this.x = afterX;
                    this.y = afterY;
                }
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

        /**
         * 放炸弹
         */
        public dropBomb(){
            
        }
    }
}