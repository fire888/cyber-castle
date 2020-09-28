import * as THREE from 'three'
import { studioConfig } from './constants_elements'



export function createStudio (emitter, assets) {
    const { canId, rendererCon, clearColor, fogData, amb } = studioConfig

    const canvas = document.getElementById(canId)
    rendererCon.canvas = canvas

    const renderer = new THREE.WebGLRenderer(rendererCon)
    renderer.setClearColor(clearColor)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)

    const scene = new THREE.Scene()
    scene.background = assets.skyBox

    {
        const { color, strength } = fogData
        scene.fog = new THREE.FogExp2(color, strength)
    }

    {
        const { color, strength } = amb
        let lightA = new THREE.AmbientLight( color, strength )
        scene.add( lightA )
    }

    let camera = null

    const resize = () => {
        const size = { width: window.innerWidth, height: window.innerHeight }
        renderer.setSize(size.width, size.height)
        if (camera) {
            camera.aspect = size.width/size.height
            camera.updateProjectionMatrix()
        }
    }

    window.addEventListener('resize', resize)
    resize()

    const addToScene = scene.add.bind(scene)

    const drawFrame = () => camera && renderer.render(scene, camera)
    emitter.subscribe('frameUpdate')(drawFrame)

    return {
        setCamera: cam => camera = cam,
        addToScene,
    }
}

