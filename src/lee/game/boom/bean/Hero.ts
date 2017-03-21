/**
 *
 * @author 
 * 英雄类
 */
namespace boom {
    export class Hero extends egret.MovieClip {
        //用户ID由服务器分配
        private id: number;
        //行走速度
        private speed: number = 1;
        //动画效果集合
        private mcds: { [key: string]: egret.MovieClipData; };
        //状态
        private status = 0;

        public constructor() {
            super();
            let data = RES.getRes("baobao_json");
            let txtr = RES.getRes("baobao_png");
            let mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
            this.mcds = {
                1: mcFactory.generateMovieClipData("up"),
                2: mcFactory.generateMovieClipData("down"),
                3: mcFactory.generateMovieClipData("left"),
                4: mcFactory.generateMovieClipData("right")
            };
            this.scaleX = 0.8;
            this.scaleY = 0.8;
            this.movieClipData = this.mcds[2];
            this.frameRate = 48;
            this.x = 32;
            this.y = 64;
            this.gotoAndStop(1);
        }

        public getId(): number {
            return this.id;
        }
        public setId(id: number): void {
            this.id = id;
        }

        public getSpeed(): number {
            return this.speed;
        }
        public setSpeed(speed: number): void {
            this.speed = speed;
        }

        public getStatus(): number {
            return this.status;
        }
        public setStatus(status: number): void {
            this.status = status;
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
        public runStart(direction: number) {
            if (this.status != direction) {
                this.status = direction;
                this.movieClipData = this.mcds[this.status];
                this.gotoAndPlay(1, -1);
            }
        }

        public runStop() {
            this.status = 0;
            this.stop();
        }

        /**
         * 放炸弹
         */
        public dropBomb(){
            
        }
    }
}