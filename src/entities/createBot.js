import * as THREE from 'three'

export function createBot (monsterModel) {
    const group = new THREE.Group()

    const obj = monsterModel
    obj.position.set(0, 0, 0)
   //obj.rotation.set(0, -Math.PI, 0)
    //obj.scale.set(0.01, 0.01, 0.01,)
 
    group.add(obj)

    return ({ 
        mesh: group,
        update () {
            //group.rotation.y += 0.005
        }
    })
}
