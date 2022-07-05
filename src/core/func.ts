import { ScreenType } from './screenType';
import { Conf } from './conf';

export class Func {
  private static _instance: Func;
  private _useFullScreen: boolean = false;

  constructor() {}

  public static get instance(): Func {
    if (!this._instance) {
      this._instance = new Func();
    }
    return this._instance;
  }

  public ratio(): number {
    return window.devicePixelRatio || 1;
  }

  public px(num: number): string {
    return num + 'px';
  }

  public useScreen(): boolean {
    return screen != undefined;
  }

  public sw(): number {
    return window.innerWidth;
  }

  public sh(): number {
    if (this._useFullScreen) {
      return screen.height;
    } else {
      return window.innerHeight;
    }
  }

  public screenOffsetY(): number {
    return (window.innerHeight - this.sh()) * 0.5;
  }

  public screen(): number {
    if (window.innerWidth <= Conf.instance.BREAKPOINT) {
      return ScreenType.XS;
    } else {
      return ScreenType.LG;
    }
  }

  public isXS(): boolean {
    return this.screen() == ScreenType.XS;
  }

  public isLG(): boolean {
    return this.screen() == ScreenType.LG;
  }

  public val(xs: any, lg: any): any {
    if (this.isXS()) {
      return xs;
    } else {
      return lg;
    }
  }

  public r(val: number): number {
    const base = this.val(Conf.instance.XS_PSD_WIDTH, Conf.instance.LG_PSD_WIDTH);
    return (val / base) * this.sw();
  }

  public sin1(radian:number):number {
    return Math.sin(radian) + Math.sin(2 * radian)
  }

  public sin2(radian:number):number {
      return (
          Math.sin(radian) +
          Math.sin(2.2 * radian + 5.52) +
          Math.sin(2.9 * radian + 0.93) +
          Math.sin(4.6 * radian + 8.94)
        ) / 4
  }
}
