import { Update } from "../libs/update";
import { Resize } from "../libs/resize";
import { Object3D } from 'three/src/core/Object3D';
import { Mesh } from 'three/src/objects/Mesh';

export class MyObject3D extends Object3D {

  private _updateHandler:any
  private _layoutHandler:any

  protected _c:number = 0

  constructor() {
    super()

    this._updateHandler = this._update.bind(this)
    Update.instance.add(this._updateHandler)

    this._layoutHandler = this._resize.bind(this)
    Resize.instance.add(this._layoutHandler)
  }

  init() {
  }

  // 破棄
  public dispose() {
    Update.instance.remove(this._updateHandler)
    this._updateHandler = null

    Resize.instance.remove(this._layoutHandler)
    this._layoutHandler = null
  }


  protected _update():void {
    this._c++
  }


  protected _resize():void {
  }


  protected _getUni(mesh:any):any {
    return mesh.material.uniforms
  }


  protected _setUni(m:Mesh, name:string, val:any):void {
    const uni = this._getUni(m)
    uni[name].value = val
  }


  protected _call(f:any):void {
    if(f != undefined) f()
  }
}