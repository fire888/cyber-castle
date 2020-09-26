import * as THREE from 'three'

import { playerConfig } from '../constants/elementsConfig'

import { createComponentCollisionFloors } from '../components/componentCollisionFloor'
import { createComponentCollisionWalls } from '../components/componentCollisionWalls'
import { createCheckerNearItem } from '../components/componentCheckNearItem'


export function Player (emitterLink) {
  const emitter = emitterLink

      const {
            startPos,
            startRot,
            cameraData,
            frontObjPos,
            lightData,
            speed,
            offsetFromFloor,
            offsetFromFloorFactor,
            speedDown,
            offsetWallCollision,
            speedRot,
      } = playerConfig

  let camera
  let keys = {}
  
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
      const { color, strenth, pos } = lightData
      const light = new THREE.PointLight(0x00ff00, strenth)
      light.position.fromArray(pos)
      mainObj.add(light)
  }

  {
    const { color, strenth, pos } = lightData
    const light = new THREE.PointLight(0xff0000, 0.4)
    light.position.fromArray([-10, -6, 0])
    mainObj.add(light)
}

  const checkFloors = createComponentCollisionFloors(mainObj, offsetFromFloor, offsetFromFloorFactor, speedDown)
  const checkWalls = createComponentCollisionWalls(mainObj, frontObj, offsetWallCollision)
  const checkNearItem = createCheckerNearItem(mainObj, emitter) 

  const update = data => {
    if (isButtonsDisabled) return;
    checkFloors.check()

    if (!keys) return;


    if (keys['up']) {
      if (checkWalls.check()) return;
      mainObj.translateZ( -speed * data.count )

      checkNearItem()
    }

    keys['left'] && (mainObj.rotation.y += (speedRot * data.count))
    keys['right'] && (mainObj.rotation.y -= (speedRot * data.count))
  }


  emitter.subscribe('keyEvent')(data => keys = data)
  emitter.subscribe('frameUpdate')(update)

  let isButtonsDisabled = false
  emitter.subscribe('messagesIsShow')(val => isButtonsDisabled = val) 
  emitter.subscribe('startDialog')(val => {
    isButtonsDisabled = val.isOpen
  })
  emitter.subscribe('completeDialog')(() => {
    isButtonsDisabled = false
})


  return {
    getObj: () => mainObj,
    getCamera: () => camera,
    setToPos: (x, y, z) => mainObj.position.set(x, y, z)
  }
}


