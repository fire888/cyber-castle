import * as THREE from 'three'

import { playerConfig } from './constants_elements'

import { createComponentCollisionFloors } from './component_collisionFloor'
import { createComponentCollisionWalls } from './component_collisionWalls'
import { createCheckerNearItem } from './component_checkNearItem'


export function createPlayer (emitterLink) {
    const emitter = emitterLink

    const {
        startPos,
        startRot,
        cameraData,
        frontObjPos,
        lightDataOne,
        lightDataTwo,
        speed,
        offsetFromFloor,
        offsetFromFloorFactor,
        speedDown,
        offsetWallCollision,
        speedRot,
    } = playerConfig


    let camera
    let keys = {}
    let isButtonsDisabled = false
  

    const mainObj = new THREE.Object3D()
    mainObj.position.fromArray(startPos)
    mainObj.rotation.fromArray(startRot)

    const frontObj = new THREE.Object3D()
    frontObj.position.fromArray(frontObjPos)
    mainObj.add(frontObj)
  
    {
        const { fov, ratio, near, far, pos } = cameraData
        camera = new THREE.PerspectiveCamera(fov, ratio, near, far)
        camera.position.fromArray(pos)
        mainObj.add(camera)
    }

    {
        const { color, strenth, pos } = lightDataOne
        const light = new THREE.PointLight(color, strenth)
        light.position.fromArray(pos)
        mainObj.add(light)
    }

    {
      const { color, strenth, pos } = lightDataTwo
      const light = new THREE.PointLight(color, strenth)
      light.position.fromArray(pos)
      mainObj.add(light)
    }

    const checkFloors = createComponentCollisionFloors(mainObj, offsetFromFloor, offsetFromFloorFactor, speedDown)
    const checkWalls = createComponentCollisionWalls(mainObj, frontObj, offsetWallCollision)
    const checkNearItem = createCheckerNearItem(mainObj, emitter) 

    const update = data => {
        if (isButtonsDisabled) return;
        checkFloors.check(data)

        if (!keys) return;

        if (keys['up']) {
            if (checkWalls.check()) return;

            mainObj.translateZ(-speed * data.count)
            checkNearItem()
        }
        keys['left'] && (mainObj.rotation.y += (speedRot * data.count))
        keys['right'] && (mainObj.rotation.y -= (speedRot * data.count))
    }


    emitter.subscribe('keyEvent')(data => keys = data)
    emitter.subscribe('frameUpdate')(update)
    emitter.subscribe('toggleDialog')(val => isButtonsDisabled = val.isOpen)


    return {
        getObj: () => mainObj,
        getCamera: () => camera,
        setToPos: (x, y, z) => mainObj.position.set(x, y, z)
    }
}


