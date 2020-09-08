
import { showStartButton } from './systemsHtml/introHtml'

import { KeyBoard } from './utils/keyBoard'
import { Emitter } from './utils/Emitter'
import { FrameUpdater } from './utils/FrameUpater'

import { loadAssets } from './utils/loadAssets'
import { prepareMeshesFromAssets, createMaterials } from './helpers/prepareMeshesFromAssets'

import { createStudio } from './entities/createStudio'
import { Player } from './entities/Player'
import { createBridge } from './entities/createBridge'
import { createSystemPlatforms } from './systems/systemPlatforms'


import { setItemToFloorsCollision } from './components/componentCollisionFloor'
import { setItemToWallCollision } from './components/componentCollisionWalls'

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
        collisionWalls.forEach(item => setItemToWallCollision(item))
        collisionFloors.forEach(item => setItemToFloorsCollision(item))
    }


    loadAssets(assetsToLoad)
        .then(assets => {

            const materials = createMaterials(assets)
            
            const bridge = createBridge(BRIDGE_CONFIG, emitter, materials)
            setItemToFloorsCollision(bridge.mesh)
            setItemToWallCollision(bridge.mesh)
            studio.addToScene(bridge.mesh)
            const bridgeHtml = bridgeParamsHtml(BRIDGE_CONFIG, emitter)
            document.body.appendChild(bridgeHtml)

            const systemPlatform = createSystemPlatforms(PLATFORMS_CONFIG, materials)
            systemPlatform.items.forEach(item => studio.addToScene(item))

            createLevel(assets)

            new FrameUpdater(emitter)
            new KeyBoard(emitter)

            player = Player(emitter)
            studio.setCamera(player.getCamera())
            studio.addToScene(player.getObj())

            showStartButton()
        })
}


window.addEventListener('load', initApp)

