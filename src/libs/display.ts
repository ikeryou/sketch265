export class Display {
  opt: any;
  el: any;
  constructor(opt: any = {}) {
    this.opt = opt;
    this.el = this.opt.el;
  }

  init() {}

  // 破棄
  public dispose() {
    this.opt = null;
    this.el = null;
  }

  public getEl(): HTMLElement {
    return this.el as HTMLElement;
  }

  public hasData(name: string): boolean {
    const v = this.getEl().getAttribute(name);
    if (v == undefined) {
      return false;
    } else {
      return true;
    }
  }

  public getData(name: string, def: any): any {
    const v = this.getEl().getAttribute(name);
    if (v == undefined) {
      return def;
    } else {
      return v;
    }
  }

  public qs(sel: string): HTMLElement {
    return this.el.querySelector(sel);
  }

  public qsAll(sel: string): Array<any> {
    return this.el.querySelectorAll(sel);
  }

  public hasClass(c: string): boolean {
    return (this.el as HTMLElement).classList.contains(c);
  }

  public addClass(c: string): void {
    (this.el as HTMLElement).classList.add(c);
  }

  public attachClass(el:any, c: string): void {
    if(el != undefined) el.classList.add(c);
  }

  public detachClass(el:any, c: string): void {
    if(el != undefined) el.classList.remove(c);
  }

  public removeClass(c: string): void {
    (this.el as HTMLElement).classList.remove(c);
  }

  getWidth(el: Element): number {
    let val = document.defaultView?.getComputedStyle(el, null).width;
    return Number(val?.replace('px', ''));
  }

  getHeight(el: Element | null): number {
    if(el == null) {
      return 0
    } else {
      let val = document.defaultView?.getComputedStyle(el, null).height;
      return Number(val?.replace('px', ''));
    }
  }

  getRect(el: Element): any {
    const st = document.defaultView?.getComputedStyle(el, null);
    if (st != undefined) {
      return {
        width: Number(st.width.replace('px', '')),
        height: Number(st.height.replace('px', '')),
      };
    } else {
      return {};
    }
  }

  public getDataNumber(name: string): number {
    const d = this.getEl().getAttribute(name);
    if (d == undefined) {
      return 0;
    } else {
      return Number(d);
    }
  }

  public getOffsetTop(el: Element): number {
    const rect = el.getBoundingClientRect();
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return rect.top + scrollTop;
  }

  public getOffset(el: Element): any {
    const rect = el.getBoundingClientRect();
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
      y: rect.top + scrollTop,
      x: rect.left,
    };
  }

  protected _call(f:any, arg:any = null):void {
    if(f != undefined) {
      if(arg != null) {
        f(arg)
      } else {
        f()
      }
    }
  }
}
