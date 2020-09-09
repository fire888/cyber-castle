/**
 * Created by Vasilii on 09.09.2020.
 */


export function createSystemControllers (config, materials) {
    const items = []
    for (let i = 0; i < config.length; i ++) {
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(2, 5, 2),
            new THREE.MeshBasicMaterial({ color: 0xff0000 })
        )

        const { r, angle, y, key } = config[i]
        mesh.position.set(Math.sin(angle) *  r, y, Math.cos(angle) *  r)
        mesh.rotation.set(0, angle, 0)
        mesh.name = key

        items.push(mesh)
    }
    return {
        items
    }
}