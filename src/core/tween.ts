import { Power0, gsap } from 'gsap';

export class Tween {
  private static _instance: Tween;

  constructor() {}

  public static get instance(): Tween {
    if (!this._instance) {
      this._instance = new Tween();
    }
    return this._instance;
  }

  a(
    target: any,
    param: any,
    duration: number = 1,
    delay: number = 0,
    easing: any = undefined,
    onStart: any = undefined,
    onUpdate: any = undefined,
    onComplete: any = undefined
  ): void {
    gsap.killTweensOf(target);

    let from:any = {};
    let to:any = {};

    for (var key in param) {
      const val = param[key];
      if (val[0] != undefined && val[0] != null) {
        from[key] = val[0];
        to[key] = val[1];
      } else {
        to[key] = val;
      }
    }

    gsap.set(target, from);

    if (easing == undefined) {
      easing = Power0.easeNone;
    }
    to['ease'] = easing;

    to['duration'] = duration;
    to['delay'] = delay;

    if (onStart != undefined) {
      to['onStart'] = onStart;
    }

    if (onUpdate != undefined) {
      to['onUpdate'] = onUpdate;
    }

    if (onComplete != undefined) {
      to['onComplete'] = onComplete;
    }

    gsap.to(target, to);
  }

  set(target: any, to: any): void {
    gsap.set(target, to);
  }

  kill(target: any): void {
    gsap.killTweensOf(target);
  }
}
