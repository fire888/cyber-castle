import { MATERIALS_CONFIG } from '../constants/elementsConfig'


export function createMaterials (assets) {
    const mats = {}
    for (let key in MATERIALS_CONFIG) {
        mats[key] = new THREE[MATERIALS_CONFIG[key].mat](MATERIALS_CONFIG[key].props) 
    }
    return mats
}


export function prepareMeshesFromAssets (assets) {
    const collisionWalls = [], collisionFloors = []

    const materials = createMaterials(assets)
    const levelGroup = new THREE.Group()

    assets['level'].traverse(child => {
        if (child.name.includes("room_")) {
            const mesh = new THREE.Mesh(child.geometry, materials.wall)
            levelGroup.add(mesh)
            collisionWalls.push(mesh)
            collisionFloors.push(mesh)
        }

        if (child.name.includes("roomBridge")) {
            child.material = materials.wall
            child.material.needsUpdate = true
            levelGroup.add(child)
            collisionWalls.push(child)
            collisionFloors.push(child)
        }
    })

    /*assets.platforms.forEach(child => {
          child.material = materials.wall
          child.material.needsUpdate = true
          levelGroup.add(child)
          collisionWalls.push(child)
          collisionFloors.push(child)
    })*/


    return ({
      collisionWalls,
      collisionFloors,
      levelGroup,
      materials,
    })
}

