
let materials

export function prepareMeshesFromAssets (assets) {

    const levelItems = [], collisionWalls = [], collisionFloors = [], doors = {}
    let bot

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


      if (child.name.includes("os_")) {
        levelGroup.add(new THREE.Mesh(child.geometry, materials.bot))
      } 

      
      if (child.name.includes("doormesh_")) {
        const key = child.name.split('_')[1]
        !doors[key] && (doors[key] = {})
        doors[key]['mesh'] = new THREE.Mesh(child.geometry, materials.door)
        doors[key]['mesh']['userData'] = {
          part: 'mesh',
          type: 'door',
          id: key,
        }
      }
    })


    return ({
      monsterAnim: assets.monsterAnim,
      doors,
      collisionWalls,
      collisionFloors,
      levelGroup,
      materials,
      bot,
    })
}


const createMaterials = assets => {
  const easyMat = new THREE.MeshBasicMaterial({ color: 0xff0000 })

  const door = new THREE.MeshPhongMaterial({ 
    color: 0xa7b4b2,
    map: assets['doorTexture'],
    emissive: 0x191c38,
    bumpMap: assets['doorTexture'],
    bumpScale: 0.2,
    shininess: 100,
  })

  assets['wall-map'].wrapS = assets['wall-map'].wrapT = THREE.RepeatWrapping
  const wall = new THREE.MeshPhongMaterial({ 
    color: 0xa7b4b2,
    side: THREE.DoubleSide, 
    //map: assets['wall-map'],
    emissive: 0x191c38,
    // bumpMap: assets['wall-map'],
    bumpScale: 0.2,
    shininess: 100,
  })

  const monster = new THREE.MeshPhongMaterial({ 
    color: 0xa7b4b2,
    map: assets['monster-skin'],
    emissive: 0x191c38,
    bumpMap: assets['monster-skin'],
    bumpScale: 0.2,
    shininess: 500,
    specular: 0xffffff,
    skinning: true,
  })


  const bot = new THREE.MeshPhongMaterial({ 
    color: 0xff0000,
    //map: assets['bot-skin'],
    //emissive: 0x191c38,
    //bumpMap: assets['bot-skin'],
    bumpScale: 0.2,
    shininess: 500,
    specular: 0xffffff,
  })

  return ({
    door,
    wall,
    monster,
    easyMat,
    bot,
  })
}