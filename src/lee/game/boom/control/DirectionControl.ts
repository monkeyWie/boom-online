/**
 *
 * @author 
 * 方向控制类
 */
namespace boom {
        export class DirectionControl extends egret.DisplayObjectContainer {
                //按键间隔速度
                private spped: number;
                private timer: egret.Timer;
                private up: egret.Shape;
                private down: egret.Shape;
                private left: egret.Shape;
                private right: egret.Shape;

                public constructor() {
                        super();
                        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
                }

                private onAddToStage(event: egret.Event) {
                        this.up = new egret.Shape();
                        this.up.graphics.beginFill(0x000000,0.5);
                        this.up.graphics.lineStyle(2);
                        this.up.graphics.drawRect(100, 100, 20,50);
                        this.up.graphics.endFill();
                        this.up.touchEnabled=true;
                        this.up.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.upBegin,this)
                        this.up.addEventListener(egret.TouchEvent.TOUCH_END,this.upEnd,this)
                        this.addChild(this.up);
                }

                private upBegin(){
                       console.log("上上上"); 
                }

                private upEnd(){
                       
                }
        }
}

