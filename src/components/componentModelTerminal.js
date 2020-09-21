
import * as THREE from 'three'
import { GLTFCopy } from '../utils/GLTFCopy'

export const createModelTerminal = (model, config, emitter) => {
    const copy = GLTFCopy(model)
    const terminalMesh = copy.scene.children[0]
    const animations = copy.animations
    const mixer = new THREE.AnimationMixer(terminalMesh)
    mixer.timeScale = 0.7
    const openAction = mixer.clipAction(animations[0])
    //openAction.clampWhenFinished = false;
    openAction.loop = THREE.LoopPingPong
    mixer.addEventListener( 'finished', function(e) {  
        openAction.stop()
         console.log(e)
        }); // properties of e: type, 

    const mesh = terminalMesh

    const { r, angle, y, keyProgram } = config
    mesh.position.set(Math.sin(angle) * r, y, Math.cos(angle) *  r)
    mesh.rotation.set(0, angle, 0)
    mesh.userData.keyProgram = keyProgram


    const startOpen = () => {
        const clearUpdate = emitter.subscribe('frameUpdate')(data => mixer.update(data.delta))
        mixer.timeScale = 0.7

        openAction.play()
        return new Promise(resolve => {
            setTimeout(() => {
                clearUpdate()
                resolve()
            }, 1500)
        })
    }


    const startClose = () => {
        const clearUpdate = emitter.subscribe('frameUpdate')(data => mixer.update(data.delta))
        mixer.timeScale = -0.7
        openAction.play()
        return new Promise(resolve => {
            setTimeout(() => {
                clearUpdate()
                resolve()
            }, 1500)
        })
    }


    return {
        startOpen,
        startClose,
        mesh,
    }
}