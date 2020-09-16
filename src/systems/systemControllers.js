import * as THREE from 'three'

export function createSystemControllers (config)
{
    const arrMeshes = []
    for (let i = 0; i < config.length; i ++) {
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(2, 1, 2),
            new THREE.MeshBasicMaterial({ color: 0xff0000 }),
        )
        const { r, angle, y, keyProgram } = config[i]
        mesh.position.set(Math.sin(angle) * r, y, Math.cos(angle) *  r)
        mesh.rotation.set(0, angle, 0)
        mesh.userData.keyProgram = keyProgram
        arrMeshes.push(mesh)
    }

    return {
        arrMeshes
    }
}
