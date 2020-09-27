
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
    const mesh = terminalMesh

    const { r, angle, y, terminalKey } = config
    mesh.position.set(Math.sin(angle) * r, y, Math.cos(angle) *  r)
    mesh.rotation.set(0, angle, 0)
    mesh.userData.terminalKey = terminalKey


    const startOpen = () => {

        const stopUpdate = emitter.subscribe('frameUpdate')(data => mixer.update(data.delta))
        emitter.showAll()

        openAction.reset()
        mixer.timeScale = 1.7
        openAction.play()

        return new Promise(resolve => {
            setTimeout(() => {
                stopUpdate()
                emitter.showAll()

                openAction.paused = true
                resolve()
            }, 1100)
        })
    }


    const startClose = () => {

        const stopUpdate = emitter.subscribe('frameUpdate')(data => mixer.update(data.delta))
        emitter.showAll()

        mixer.timeScale = -1.7
        openAction.paused = false
        return new Promise(resolve => {
            setTimeout(() => {

                stopUpdate()
                emitter.showAll()

                resolve()
            }, 1100)
        })
    }


    return {
        startOpen,
        startClose,
        mesh,
    }
}