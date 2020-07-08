
import { showStartButton } from './systemsHtml/introHtml'

import { KeyBoard } from './utils/keyBoard'
import { Emitter } from './utils/Emitter'
import { loadAssets } from './utils/loadAssets'
import { prepareMeshesFromAssets } from './helpers/prepareMeshesFromAssets'
import { FrameUpdater } from './utils/FrameUpater'

import { createSystemDoors } from './systems/systemDoors'
import { createStudio } from './entities/createStudio'
//import { createBot } from './entities/createBot'
import { Player } from './entities/Player'

import { setFloorsToCollision, setEmitterToCollisionFloors } from './components/componentCollisionFloor'
import { setWallsToCollision } from './components/componentCollisionWalls'

import { assetsToLoad } from './constants/assetsToLoad' 
import { createInfo } from './systemsHtml/info'
import { createInput } from './systemsHtml/insertFileInBrowser'


const initApp = () => {
  const emitter = Emitter()
  const studio = createStudio(emitter)
  let player

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

      createLevel(assets)


      new FrameUpdater(emitter)
      new KeyBoard(emitter)
      
      player = Player(emitter)
      studio.setCamera(player.getCamera())
      studio.addToScene(player.getObj())
  
      showStartButton()

      createInput(createLevel)
    })
}


window.addEventListener('load', initApp)

