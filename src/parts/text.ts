import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Util } from "../libs/util";

// -----------------------------------------
//
// -----------------------------------------
export class Text extends MyDisplay {

  // private _noise:number = Util.instance.random(0, 1)

  constructor(opt:any) {
    super(opt)

    this._c = Util.instance.random(0, 10000)

    this._resize();
  }


  protected _update(): void {
    super._update();

    const radian = Util.instance.radian(this._c * 1);
    Tween.instance.set(this.getEl(), {
      rotationZ:Math.sin(radian) * 10,
      y:Math.cos(radian * 1.2) * 10,
      x:Math.sin(radian * -0.95) * 2,
    })
  }


  protected _resize(): void {
    super._resize();
  }
}