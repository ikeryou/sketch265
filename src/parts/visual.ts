import { Func } from '../core/func';
import { Canvas } from '../webgl/canvas';
import { Object3D } from 'three/src/core/Object3D';
import { MeshBasicMaterial } from "three/src/materials/MeshBasicMaterial";
import { Mesh } from 'three/src/objects/Mesh';
import { Color } from 'three/src/math/Color';
import { Vector3 } from 'three/src/math/Vector3';
import { CatmullRomCurve3 } from 'three/src/extras/curves/CatmullRomCurve3';
import { Util } from "../libs/util";
import { ShapeGeometry } from 'three/src/geometries/ShapeGeometry';
import { Shape } from 'three/src/extras/core/Shape';

export class Visual extends Canvas {

  private _con:Object3D;
  private _mesh:Mesh;

  public baseY:number = 0;

  constructor(opt: any) {
    super(opt);

    this._con = new Object3D();
    this.mainScene.add(this._con);

    this._mesh = new Mesh(
      this._makeGeo(),
      new MeshBasicMaterial({
        color:0x0000ff,
      }),
    );
    this._con.add(this._mesh);

    this._resize();
  }


  protected _update(): void {
    super._update();

    this._mesh.geometry.dispose();
    this._mesh.geometry = this._makeGeo();

    if (this.isNowRenderFrame()) {
      this._render()
    }
  }


  private _render(): void {
    const bgColor = new Color(0xffffff)
    this.renderer.setClearColor(bgColor, 1)
    this.renderer.render(this.mainScene, this.camera)
  }


  public isNowRenderFrame(): boolean {
    return this.isRender
  }


  _resize(isRender: boolean = true): void {
    super._resize();

    const w = Func.instance.sw();
    const h = Func.instance.sh();

    this.renderSize.width = w;
    this.renderSize.height = h;

    this.updateCamera(this.camera, w, h);

    let pixelRatio: number = window.devicePixelRatio || 1;

    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setSize(w, h);
    this.renderer.clear();

    if (isRender) {
      this._render();
    }
  }


  // ---------------------------------
  //
  // ---------------------------------
  private _makeGeo():ShapeGeometry {
    const arr:Array<Vector3> = []

    const sw = Func.instance.sw();
    const sh = Func.instance.sh();
    const radius = sh * 0.1;

    let startX = sw * -0.6;
    let endX = sw * 0.6;
    let startY = this.baseY;

    let ang = 0;
    let i = startX;
    const interval = sw * 0.05;
    while(i < endX) {
      const radian = Util.instance.radian(this._c + ang);
      arr.push(new Vector3(i, startY + Math.sin(radian) * radius, 0));
      i += interval;
      ang += 10;
    }

    arr.push(new Vector3(endX, -sh, 0));
    arr.push(new Vector3(startX, -sh, 0));

    const curve = new CatmullRomCurve3(arr, true);
    const points = curve.getPoints(50);

    const shape = new Shape()
    points.forEach((val,i) => {
      if(i == 0) {
        shape.moveTo(val.x, val.y);
      } else {
        shape.lineTo(val.x, val.y)
      }
    });

    return new ShapeGeometry(shape);
  }
}
