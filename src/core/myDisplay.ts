import { Display } from '../libs/display';
import { Update } from '../libs/update';
import { Resize } from '../libs/resize';
import { Point } from '../libs/point';

export class MyDisplay extends Display {
  private _updateHandler: any;
  private _resizeHandler: any;

  protected _c:number = 0;
  protected _isEnter:boolean = false
  protected _isOneEnter:boolean = false
  protected _observer: any;
  protected _elPos:Point = new Point(0, 9999);
  protected _eRollOverHandler: any;
  protected _eRollOutHandler: any;

  constructor(opt:any = {}) {
    super(opt);

    if (opt.isDefEvent == undefined || opt.isDefEvent) {
      this._updateHandler = this._update.bind(this);
      Update.instance.add(this._updateHandler);

      this._resizeHandler = this._resize.bind(this);
      Resize.instance.add(this._resizeHandler);
    }
  }

  init() {
    super.init();
  }


  //
  protected _setHover() {
    this._eRollOverHandler = this._eRollOver.bind(this);
    this._eRollOutHandler = this._eRollOut.bind(this);
    this.getEl().addEventListener('mouseenter', this._eRollOverHandler);
    this.getEl().addEventListener('mouseleave', this._eRollOutHandler);
  }


  //
  protected _disposeHover() {
    if(this._eRollOverHandler != null) {
      this.getEl().removeEventListener('mouseenter', this._eRollOverHandler);
      this.getEl().removeEventListener('mouseleave', this._eRollOutHandler);
      this._eRollOverHandler = null;
      this._eRollOutHandler = null;
    }
  }


  //
  protected _eRollOver() {
  }


  //
  protected _eRollOut() {
  }


  //
  protected _setObserver() {
    this._observer = new IntersectionObserver((e) => {
      if(e != undefined) {
        e.forEach((val) => {
          if (val != undefined && val.intersectionRatio > 0) {
              this._eEnter()
          } else {
              this._eLeave()
          }
        })
      }
    },
    {
        root: null,
    }
    );

    setTimeout(() => {
      if(this._observer != undefined && this._observer != null) {
        const tg = this.getEl()
        if (tg != undefined) this._observer.observe(tg)
      }
    }, 100)
  }


  //
  protected _eEnter() {
    this._isEnter = true
  }


  //
  protected _eLeave() {
    this._isEnter = false
  }


  protected _disposeObserver() {
    if (this._observer != null || this._observer != undefined) {
      this._observer.unobserve(this.getEl());
      this._observer = null;
    }
  }

  // 破棄
  public dispose() {
    if(this._updateHandler != undefined) {
      Update.instance.remove(this._updateHandler);
      this._updateHandler = null;
    }

    if(this._resizeHandler != undefined) {
      Resize.instance.remove(this._resizeHandler);
      this._resizeHandler = null;
    }

    this._disposeHover();
    this._disposeObserver();

    super.dispose();
  }

  css(el: any, obj: any): void {
    const style = el.style;
    for (var key in obj) {
      style[key] = obj[key];
    }
  }

  protected _update(): void {
    this._c++
  }

  protected  _resize(): void {}
}
