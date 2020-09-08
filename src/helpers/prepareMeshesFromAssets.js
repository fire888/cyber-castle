
let materials

export function prepareMeshesFromAssets (assets) {

    const collisionWalls = [], collisionFloors = []

    !materials && (materials = createMaterials(assets))
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

    assets.platforms.forEach(child => {
          child.material = materials.wall
          child.material.needsUpdate = true
          levelGroup.add(child)
          collisionWalls.push(child)
          collisionFloors.push(child)
    })


    return ({
      collisionWalls,
      collisionFloors,
      levelGroup,
      materials,
    })
}


const createMaterials = assets => {
  const wall = new THREE.MeshPhongMaterial({ 
    color: 0xa7b4b2,
    side: THREE.DoubleSide,
    emissive: 0x191c38,
    bumpScale: 0.2,
    shininess: 100,
  })

  return ({
    wall,
  })
}