

export function createSystemControllers (config, materials, emitter) 
{
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(2, 1, 2),
        new THREE.MeshBasicMaterial({ color: 0xff0000 }),
    )

    const setPositionFromData = data => 
    {
        const { r, angle, y, key } = data
        mesh.position.set(Math.sin(angle) * r, y, Math.cos(angle) *  r)
        mesh.rotation.set(0, angle, 0)
        mesh.userData.key = key
    }
    const onCompleteLast = () => 
    {
        console.log('complete')
    }


    const toNext = nexter(config, setPositionFromData, onCompleteLast) 
    toNext()


    emitter.subscribe('nextPoint')(toNext)


    return {
        mesh,
    }
}



const nexter = (arrConfig, action, callback) => {
    let currentIndex = -1
    return () => {
        currentIndex ++
        arrConfig[currentIndex] 
            ? action(arrConfig[currentIndex])
            : callback()
    }
}