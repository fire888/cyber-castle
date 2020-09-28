import * as THREE from 'three'
import 'three/examples/js/loaders/OBJLoader'
import 'three/examples/js/loaders/GLTFLoader'


let callback = null
let dataToLoad = null
const assets = {}
let objLoader, textureLoader, gltfLoader, cubeTextureLoader
let index = 0


const loadAsset = function (data) {
    if (data.type === 'obj') {
        objLoader.load(data.filename, model => {
            assets[data.key] = model
            checkComplete()        
        })
    }
    if (data.type === 'glb' || data.type === 'gltf') {
        gltfLoader.load(data.filename, model => {
            assets[data.key] = model
            checkComplete()        
        })
    }        
    if (data.type === 'img') {
        textureLoader.load(data.filename, model => {
            assets[data.key] = model
            checkComplete()        
        })
    }
    if (data.type === 'cubeTextures') {
        cubeTextureLoader.load(
            [
                data.filename['px'],
                data.filename['nx'],
                data.filename['py'],
                data.filename['ny'],
                data.filename['pz'],
                data.filename['nz'],
            ],
            result => {
                assets[data.key] = result
                checkComplete()
            }
        )
    }
}


const checkComplete = () => {
    index ++
    index < dataToLoad.length 
        ? loadAsset(dataToLoad[index])
        : callback(assets)
}

export const loadAssets = data => {
    return new Promise(resolve => {
        dataToLoad = data
        callback = resolve
        index = 0

        objLoader = objLoader || new THREE.OBJLoader()
        textureLoader = textureLoader || new THREE.TextureLoader()
        gltfLoader = gltfLoader || new THREE.GLTFLoader()
        cubeTextureLoader = cubeTextureLoader || new THREE.CubeTextureLoader()

        loadAsset(dataToLoad[index])
    })
}