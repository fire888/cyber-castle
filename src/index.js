
import { showStartButton } from './systemsHtml/introHtml'

import { KeyBoard } from './utils/keyBoard'
import { Emitter } from './utils/Emitter'
import { FrameUpdater } from './utils/FrameUpater'

import { loadAssets } from './utils/loadAssets'
import { prepareMeshesFromAssets } from './helpers/prepareMeshesFromAssets'

import { createStudio } from './entities/createStudio'
import { Player } from './entities/Player'
import { createBridge } from './entities/createBridge'
import { createSystemPlatforms } from './systems/systemPlatforms'


import { setFloorsToCollision, setEmitterToCollisionFloors } from './components/componentCollisionFloor'
import { setWallsToCollision } from './components/componentCollisionWalls'

import { assetsToLoad } from './constants/elementsConfig'

import { BRIDGE_CONFIG, PLATFORMS_CONFIG } from './constants/elementsConfig'
import { bridgeParamsHtml } from './systemsHtml/bridgeParamsHtml'




const initApp = () => {
      const emitter = Emitter()
      const studio = createStudio(emitter)
      let player

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
        }


        loadAssets(assetsToLoad)
            .then(assets => {

                const bridge = createBridge(BRIDGE_CONFIG, emitter)
                assets.bridge = bridge.mesh
                studio.addToScene(bridge.mesh)

                const systemPlatform = createSystemPlatforms(PLATFORMS_CONFIG)
                assets.platforms = systemPlatform.items

                createLevel(assets)

                new FrameUpdater(emitter)
                new KeyBoard(emitter)

                player = Player(emitter)
                studio.setCamera(player.getCamera())
                studio.addToScene(player.getObj())

                const bridgeHtml = bridgeParamsHtml(BRIDGE_CONFIG, emitter)
                document.body.appendChild(bridgeHtml)

                showStartButton()
            })
}


window.addEventListener('load', initApp)

