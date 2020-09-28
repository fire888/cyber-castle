import { MATERIALS_CONFIG } from './constants_elements'



export function prepareMeshesFromAssets (assets) {

    const
        arrMeshes = [],
        levelGroup = new THREE.Group(),
        topLevelGroup = new THREE.Group(),
        materials = createMaterials(assets)

    assets['level'].traverse(child => {
        if (child.name.includes("room_")) {
            const mesh = new THREE.Mesh(child.geometry, materials.wall)
            levelGroup.add(mesh)
            arrMeshes.push(mesh)
        }
        if (child.name.includes("topworld_")) {
            const mesh = new THREE.Mesh(child.geometry, materials.wall)
            topLevelGroup.add(mesh)
            arrMeshes.push(mesh)
        }
    })

    return {
        arrMeshes,
        levelGroup,
        topLevelGroup,
        materials,
    }
}



const createMaterials = () => {
    const mats = {}
    for (let key in MATERIALS_CONFIG) {
        mats[key] = new THREE[MATERIALS_CONFIG[key].mat](MATERIALS_CONFIG[key].props) 
    }
    return mats
}

