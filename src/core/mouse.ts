import { Point } from "../libs/point";
import { Update } from "../libs/update";
import { Util } from "../libs/util";


export class Mouse {

    private static _instance:Mouse;

    public x:number = window.innerWidth * 0.5
    public y:number = window.innerHeight * 0.5
    public old:Point = new Point()
    public normal:Point = new Point()
    public easeNormal:Point = new Point()
    public start:Point = new Point()
    public moveDist:Point = new Point()
    public dist:number = 0;
    public isDown:boolean = false
    public usePreventDefault:boolean = true

    public onSwipe:any

    private _updateHandler:any

    constructor() {

        if(Util.instance.isTouchDevice()) {
            const tg = document.querySelector('.matter') || window
            tg.addEventListener('touchstart', (e:any = {}) => {
                this._eTouchStart(e)
            }, {passive:false})
            tg.addEventListener('touchend', () => {
                this._eTouchEnd()
            }, {passive:false})
            tg.addEventListener('touchmove', (e:any = {}) => {
                this._eTouchMove(e)
            }, {passive:false})
        } else {
            window.addEventListener('mousedown', (e:any = {}) => {
                this._eDown(e)
            })
            window.addEventListener('mouseup', () => {
                this._eUp()
            })
            window.addEventListener('mousemove', (e:any = {}) => {
                this._eMove(e)
            })
            // document.addEventListener('wheel', (e) => {
            //     if(this.usePreventDefault) {
            //         e.preventDefault()
            //         e.stopPropagation()
            //     }
            //     const test = Math.abs(e.deltaY)
            //     if(test > 5 && this._useWheel) {
            //         if(this.onSwipe != undefined) this.onSwipe({move:e.deltaY})
            //         this._useWheel = false
            //         setTimeout(() => {
            //             this._useWheel = true
            //         }, 1000)
            //     }
            // }, {passive:false})
        }

        this._updateHandler = this._update.bind(this)
        Update.instance.add(this._updateHandler)
    }


    public static get instance():Mouse {
        if (!this._instance) {
            this._instance = new Mouse();
        }
        return this._instance;
    }


    private _eTouchStart(e:any = {}):void {
        this.isDown = true
        this._eTouchMove(e)

        const p:Point = this._getTouchPoint(e)
        this.start.x = p.x
        this.start.y = p.y
    }


    private _eTouchEnd():void {
        this.isDown = false

        // 上下スワイプ判定
        const dx = this.old.x - this.x
        const dy = this.old.y - this.y
        // console.log(Math.abs(dy))
        if(Math.abs(dy) > 0 || Math.abs(dx) > 0) {
            if(this.onSwipe != undefined) this.onSwipe({move:dy})
        }

        this.dist = 0;
        // console.log(dy)
        // Param.instance.setMemo(dx + ',' + dy)
    }


    private _eTouchMove(e:any = {}):void {
        const p:Point = this._getTouchPoint(e)
        this.old.x = this.x
        this.old.y = this.y
        this.x = p.x
        this.y = p.y

        const dx = this.old.x - this.x
        const dy = this.old.y - this.y
        this.dist = Math.sqrt(dx * dx + dy * dy);

        if(this.usePreventDefault) {
            e.preventDefault()
        }
    }


    private _eDown(e:any = {}):void {
        this.isDown = true
        this._eMove(e)

        this.start.x = this.x
        this.start.y = this.y
    }


    private _eUp():void {
      this.isDown = false
    }


    private _eMove(e:any = {}):void {
      this.old.x = this.x
      this.old.y = this.y

      this.x = e.clientX
      this.y = e.clientY

      const dx = this.old.x - this.x
      const dy = this.old.y - this.y
      this.dist = Math.sqrt(dx * dx + dy * dy);
    }


    private _getTouchPoint(e:TouchEvent):Point {
        const p = new Point()
        const touches:TouchList = e.touches
        if(touches != null && touches.length > 0) {
            p.x = touches[0].pageX
            p.y = touches[0].pageY
        }
        return p
    }


    private _update():void {
        if(this.isDown) {
            this.moveDist.x = this.start.x - this.x
            this.moveDist.y = this.start.y - this.y
        } else {
            this.moveDist.x += (0 - this.moveDist.x) * 0.25
            this.moveDist.y += (0 - this.moveDist.y) * 0.25
        }

        this.normal.x = Util.instance.map(this.x, -1, 1, 0, window.innerWidth)
        this.normal.y = Util.instance.map(this.y, -1, 1, 0, window.innerHeight)

        const ease = 0.1
        this.easeNormal.x += (this.normal.x - this.easeNormal.x) * ease
        this.easeNormal.y += (this.normal.y - this.easeNormal.y) * ease

    }



}