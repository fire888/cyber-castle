import * as THREE from 'three'
import { PLATFORMS_CONFIG } from './constants_elements'



export const createSystemPlatforms = materials => {
    const items = []
    for (let i = 0; i < PLATFORMS_CONFIG.length; i ++) 
    {
        const { w1, w2, h, r, angle, y } = PLATFORMS_CONFIG[i]

        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(w1, h, w2),
            materials.wall
        )
        mesh.position.set(Math.sin(angle) *  r, y, Math.cos(angle) *  r)
        mesh.rotation.set(0, angle, 0)
        items.push(mesh)
    }
    return {
        items
    }
}

