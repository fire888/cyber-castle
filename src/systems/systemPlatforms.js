/**
 * Created by Vasilii on 08.09.2020.
 */
import * as THREE from 'three'

export const createSystemPlatforms = (config, materials) => {
    const items = []
    for (let i = 0; i < config.length; i ++) {
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(20, 5, 20),
            materials.wall
        )

        const { r, angle, h } = config[i]
        mesh.position.set(Math.sin(angle) *  r, h, Math.cos(angle) *  r)
        mesh.rotation.set(0, angle, 0)
        mesh.name = 'platform_' + i

        items.push(mesh)
    }
    return {
        items
    }
}