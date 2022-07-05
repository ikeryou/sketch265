import { Texture } from 'three/src/textures/Texture';
// import { RGBAFormat,RGBAFOr } from 'three/src/constants';

export class IETexture {

    constructor() {
    }

    // -----------------------------------
    //
    // -----------------------------------
    public load(src:string, onLoaded:any):Texture {
        const t = new Texture()
        const img = new Image()
        img.onload = () => {
            t.image = img
            // const isJPEG = (src.indexOf('.jpg') > 0)
            // t.format = isJPEG ? RGBFormat : RGBAFormat
            t.needsUpdate = true
            if(onLoaded != undefined) onLoaded()
        }
        img.src = src
        return t
    }
}
