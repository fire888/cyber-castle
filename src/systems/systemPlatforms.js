/**
 * Created by Vasilii on 08.09.2020.
 */
import * as THREE from 'three'

export const createSystemPlatforms = config => {
    const items = []
    for (let i = 0; i < config.length; i ++) {
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(10, 2, 10),
            new THREE.MeshBasicMaterial({ color: 0xff0000 })
        )
        mesh.name = 'platform_' + i;
        items.push(mesh)
    }
    return {
        items
    }
}