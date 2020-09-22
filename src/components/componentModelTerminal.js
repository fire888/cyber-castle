
import * as THREE from 'three'
import { GLTFCopy } from '../utils/GLTFCopy'

export const createModelTerminal = (model, config, emitter) => {
    const copy = GLTFCopy(model)
    const terminalMesh = copy.scene.children[0]
    const animations = copy.animations
    const mixer = new THREE.AnimationMixer(terminalMesh)
    mixer.timeScale = 1.7
    const openAction = mixer.clipAction(animations[0])
    openAction.loop = THREE.LoopOnce
    emitter.subscribe('frameUpdate')(data => mixer.update(data.delta))
    const mesh = terminalMesh

    const { r, angle, y, keyProgram } = config
    mesh.position.set(Math.sin(angle) * r, y, Math.cos(angle) *  r)
    mesh.rotation.set(0, angle, 0)
    mesh.userData.keyProgram = keyProgram


    const startOpen = () => {
        openAction.reset()
        mixer.timeScale = 1.7
        openAction.play()
        return new Promise(resolve => {
            setTimeout(() => {
                openAction.paused = true
                resolve()
            }, 1000)
        })
    }


    const startClose = () => {
        mixer.timeScale = -1.7
        openAction.paused = false
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, 1000)
        })
    }


    return {
        startOpen,
        startClose,
        mesh,
    }
}