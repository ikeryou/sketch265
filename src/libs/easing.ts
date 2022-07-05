export class Easing {
  private static _instance: Easing;

  private constructor() {}

  public static get instance(): Easing {
    if (!this._instance) {
      this._instance = new Easing();
    }
    return this._instance;
  }

  inExpo(t: number): number {
    if(t == 0) {
      return 0;
    } else {
      return Math.pow(2, 10 * (t - 1));
    }
  }


  outExpo(t: number): number {
    if(t == 1) {
      return 1;
    } else {
      return -Math.pow(2, -10 * t) + 1;
    }
  }


  outSine(t: number): number {
    return Math.sin(t * (Math.PI / 2));
  }


  outQuad(t: number): number {
    return -t * (t - 2);
  }


  inOutQuart(t: number): number {
    t *= 2;
    if (t < 1) return 0.5 * t * t * t * t;
    t -= 2;
    return -0.5 * (t * t * t * t - 2);
  }

  inOutCirc(t: number): number {
    t *= 2;

    if (t < 1) return -0.5 * (Math.sqrt(1 - t * t) - 1);

    t -= 2;
    return 0.5 * (Math.sqrt(1 - t * t) + 1);
  }

  inOutCubic(t: number): number {
    t *= 2;

    if (t < 1) return 0.5 * t * t * t;

    t -= 2;
    return 0.5 * (t * t * t + 2);
  }

  inOutSine(t: number): number {
    return -0.5 * (Math.cos(Math.PI * t) - 1);
  }
}
