import { createComponentCollisionWalls } from './componentCollisionWalls'
import { createComponentCollisionDoors } from './componentCollisionDoors'

export function componentWalk (obj) {
    const mesh = obj

    const collisionWalls = createComponentCollisionWalls(mesh, mesh.children[0], 12)
    const collisionDoors = createComponentCollisionDoors(mesh, mesh.children[0], 12)

    let state = 'rotate' // || 'go'
    let rotate = startRotate(mesh)
    let go = null

    return {
        update: () => {
            if (state === 'rotate') {
                if (!rotate()) return;
                
                state = 'go'
                go = startGo(mesh)
            }

            if (state === 'go') { 
                if (go() || collisionWalls.check() || collisionDoors.check()) {

                    state = 'rotate'
                    rotate = startRotate(mesh)
                }
            }
        }
    }
} 


const startRotate = mesh => {
    const m = mesh
    const angleRot = (Math.random() * (Math.PI * 1.5) + 1) * Math.random() < 0.5 ? 1 : -1
    const numRotations = 40

    let countRotation = 0

    return () => {
        m.rotation.y += angleRot / numRotations
        countRotation ++
        return countRotation > numRotations  
    }
}



const startGo = mesh => {
    const m = mesh
    const numsMove = Math.random() * 300
    let countMove = 0 

    return () => {
        m.translateZ(0.11)
        countMove ++
        return countMove > numsMove
    }
}

