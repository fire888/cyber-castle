import * as THREE from 'three'
import { GLTFCopy } from '../utils/GLTFCopy'



            /*const terminal = assets.terminal1.scene.children[0]
            const animations = assets.terminal1.animations
            console.log('!!', terminal)
            terminal.position.set(0, 2, 125)
            const mixer = new THREE.AnimationMixer(terminal.children[1])
            mixer.timeScale = 0.7 
            const walkAction = mixer.clipAction(animations[0])
            walkAction.play()
            studio.addToScene(terminal)
            emitter.subscribe('frameUpdate')((data) => {
                mixer.update(data.delta)
            })*/

export function createSystemControllers (config, model, emitter)
{
    const arrMeshes = []
    const arrMixers = []

    console.log(model)

    for (let i = 0; i < config.length; i ++) {
        const copy = GLTFCopy(model)
        const terminal = copy.scene.children[0]
        const animations = copy.animations
        const mixer = new THREE.AnimationMixer(terminal)
        mixer.timeScale = 0.7 
        const walkAction = mixer.clipAction(animations[0])
        walkAction.play()
        arrMixers.push(mixer)

        /*const mesh = new THREE.Mesh(
            model.children[0].geometry,
            //new THREE.BoxGeometry(2, 1, 2),
            new THREE.MeshPhongMaterial({            
                side: THREE.DoubleSide,
                color:  '#4864c4',
                emissive: '#290348',
                bumpScale: 0.2,
                shininess: 100,
            })
        )
        */

        const mesh = terminal

        const { r, angle, y, keyProgram } = config[i]
        mesh.position.set(Math.sin(angle) * r, y, Math.cos(angle) *  r)
        mesh.rotation.set(0, angle, 0)
        mesh.userData.keyProgram = keyProgram
        arrMeshes.push(mesh)
    }

    emitter.subscribe('frameUpdate')((data) => {
        arrMixers.forEach(item => {
            item.update(data.delta)
        })
    })

    return {
        arrMeshes
    }
}
