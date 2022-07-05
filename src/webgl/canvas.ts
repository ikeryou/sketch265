import { MyDisplay } from "../core/myDisplay";
import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer';
import { Scene } from 'three/src/scenes/Scene';
import { Rect } from "../libs/rect";
import { OrthographicCamera } from 'three/src/cameras/OrthographicCamera';
// import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera';
import { Camera } from 'three/src/cameras/Camera';
import { Mesh } from 'three/src/objects/Mesh';
import { Points } from 'three/src/objects/Points';
import { Vector3 } from 'three/src/math/Vector3';

export class Canvas extends MyDisplay {

    public camera:Camera
    public renderer:WebGLRenderer
    public mainScene:Scene

    public isRender:boolean = true
    public renderSize:Rect = new Rect()

    constructor(opt:any = {}) {
        super(opt)

        let renderParam:any = {
            canvas : this.el,
            antialias: false,
            preserveDrawingBuffer : true,
            powerPreference : 'low-power',
        }
        this.renderer = new WebGLRenderer(renderParam)
        this.renderer.autoClear = true
        this.renderer.setClearColor(0xffffff, 1)

        this.mainScene = new Scene()

        this.camera = this._makeCamera()
        this.updateCamera(this.camera, 10, 10)
    }

    init() {
        super.init()
    }

    protected _makeCamera():Camera {
        return new OrthographicCamera(1, 1, 1, 1)
        // return new PerspectiveCamera(50, 1, 0.0000001, 50000)
    }

    public updateCamera(camera:Camera, w:number = 10, h:number = 10) {
        this._updateOrthCamera(camera as OrthographicCamera, w, h)
        // this._updateOrthCamera(camera as PerspectiveCamera, w, h)
    }

    protected _updateOrthCamera(camera:OrthographicCamera, w:number = 10, h:number = 10) {
    // protected _updateOrthCamera(camera:PerspectiveCamera, w:number = 10, h:number = 10) {
        camera.left = -w * 0.5
        camera.right = w * 0.5
        camera.top = h * 0.5
        camera.bottom = -h * 0.5
        camera.near = -10000
        camera.far = 100000
        camera.updateProjectionMatrix()
        camera.position.set(0, 0, 0)
        camera.lookAt(new Vector3(0, 0, 0))

        // camera.aspect = w / h
        // camera.updateProjectionMatrix()
        // camera.position.z = h / Math.tan(camera.fov * Math.PI / 360) / 2
    }

    protected _update():void {
        super._update()
    }

    protected _setUni(m:Mesh | Points, name:string, val:any):void {
      const uni = this._getUni(m)
      uni[name].value = val
    }

    protected _getUni(mesh:any):any {
      return mesh.material.uniforms
    }
}