
import { showStartButton } from './systemsHtml/introHtml'

import { KeyBoard } from './utils/keyBoard'
import { Emitter } from './utils/Emitter'
import { loadAssets } from './utils/loadAssets'
import { prepareMeshesFromAssets } from './helpers/prepareMeshesFromAssets'
import { FrameUpdater } from './utils/FrameUpater'

//import { createSystemDoors } from './systems/systemDoors'
import { createStudio } from './entities/createStudio'
//import { createBot } from './entities/createBot'
import { createBridge } from './entities/createBridge'
import { Player } from './entities/Player'

import { setFloorsToCollision, setEmitterToCollisionFloors } from './components/componentCollisionFloor'
import { setWallsToCollision } from './components/componentCollisionWalls'

import { assetsToLoad } from './constants/assetsToLoad' 
// import { createInfo } from './systemsHtml/info'
// import { createInput } from './systemsHtml/insertFileInBrowser'
import { bridgeParamsHtml } from './systemsHtml/bridgeParams'


const DATA_BRIDGE = {
  'count': {
      max: 100,
      min: 3,
      val: 100,
      label: 'count',
      step: 1,
  },
  'angle': {
      max: Math.PI * 3,
      min: -Math.PI * 3,
      val: Math.PI,
      label: 'angle',
      step: 0.05,
  },
  'radius': {
      max: 200,
      min: 10,
      val: 140,
      label: 'radius',
      step: 2,
  },
  'height': {
      max: 50,
      min: -50,
      val: 20,
      label: 'height',
      step: 2,
  },
  'width': {
      max: 50,
      min: 10,
      val: 20,
      label: 'width',
      step: 1, 
  }
}



const initApp = () => {
  const emitter = Emitter()
  const studio = createStudio(emitter)
  let player, bridge

  /**
   * create new level from assets and input 
   * example: createInput(createLevel)
   * @param {object} assets 
   */
  function createLevel (assets) {
    const { collisionWalls, collisionFloors, levelGroup } = prepareMeshesFromAssets(assets)
    studio.changeLevel(levelGroup)
    setWallsToCollision(collisionWalls)
    setFloorsToCollision(collisionFloors)
    setEmitterToCollisionFloors(emitter)
    player && player.setToPos(0, 0, 0)
  }


  loadAssets(assetsToLoad)
    .then(assets => {

      bridge = createBridge(DATA_BRIDGE, emitter)
      assets.level.add(bridge.mesh)

      createLevel(assets)

      new FrameUpdater(emitter)
      new KeyBoard(emitter)
      
      player = Player(emitter)
      studio.setCamera(player.getCamera())
      studio.addToScene(player.getObj())
  
      showStartButton()
    
      const bridgeHtml = bridgeParamsHtml(DATA_BRIDGE, emitter)
      document.body.appendChild(bridgeHtml)
    })
}


window.addEventListener('load', initApp)

