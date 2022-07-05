
import { Func } from "../core/func";
import { MyDisplay } from "../core/myDisplay";
import { Point } from "../libs/point";
import { Util } from "../libs/util";
import { Text } from "./text";
import { Visual } from "./visual";

// -----------------------------------------
//
// -----------------------------------------
export class Contents extends MyDisplay {

  private _pos:Point = new Point();
  private _text:Array<Text> = [];

  private _v:Visual;

  constructor(opt:any) {
    super(opt)

    this._v = new Visual({
      el:this.getEl()
    })

    const text = '水の中で見えるテキスト';

    let txt = '<p>';
    let arr = Array.from(text);
    for(let i = 0; i < arr.length; i++) {
      txt += '<span>' + arr[i % arr.length] + '</span>';
    }
    txt += '</p>';
    (document.querySelector('.l-text') as HTMLElement).innerHTML = txt;
    document.querySelectorAll('.l-text span').forEach((val) => {
      const t = new Text({
        el:val
      });
      this._text.push(t);
    })

    this._resize();
  }


  protected _update(): void {
    super._update();

    // モニターサイズと位置
    const displayInfo: {x:number, y:number, width:number, height:number} = {
      width:window.screen.width,
      height:window.screen.height,
      x:window.screenX,
      y:window.screenY,
    }

    this._pos.y += (displayInfo.y - this._pos.y) * 0.1

    // const sw = Func.instance.sw();
    const sh = Func.instance.sh();

    // 波の位置
    const waveY =  Util.instance.map(this._pos.y, -sh * 0.5, sh * 1, 0, displayInfo.height - sh);
    this._v.baseY = waveY;

  }


  protected _resize(): void {
    super._resize();
  }
}