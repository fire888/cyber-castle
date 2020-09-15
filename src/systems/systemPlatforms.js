/**
 * Created by Vasilii on 08.09.2020.
 */
import * as THREE from 'three'

export const createSystemPlatforms = (config, materials) => {
    const items = []
    for (let i = 0; i < config.length; i ++) {
        const { w1, w2, h, r, angle, y } = config[i]

        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(w1, h, w2),
            materials.wall
        )

        mesh.position.set(Math.sin(angle) *  r, y, Math.cos(angle) *  r)
        mesh.rotation.set(0, angle, 0)
        mesh.name = 'platform_' + i

        items.push(mesh)
    }
    return {
        items
    }
}