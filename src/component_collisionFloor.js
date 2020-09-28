import * as THREE from 'three'



const FLOORS_ARRAY = []



export const createComponentCollisionFloors = (objFromLink, offset, delta, speed) => {
    const objFrom = objFromLink
    const offsetFromFloor = offset
    const offsetFromFloorFactor = delta
    const speedDown = speed

    const vec3Src = new THREE.Vector3()
    const vec3Ray = new THREE.Vector3(0, -1, 0)

    return {
        check: updateData => {
            vec3Src.copy(objFrom.position)
            const raycasterDown = new THREE.Raycaster(vec3Src, vec3Ray)
            const intersectsFloor = raycasterDown.intersectObjects(FLOORS_ARRAY)
            if ( intersectsFloor && intersectsFloor[0] && intersectsFloor[0].distance > offsetFromFloor + offsetFromFloorFactor) {
                objFrom.position.y += speedDown * updateData.count
                return;
            }
            objFrom.position.y = intersectsFloor[0].point.y + offsetFromFloor
        }
    }

}



export const setItemToFloorsCollision = item => FLOORS_ARRAY.push(item)

