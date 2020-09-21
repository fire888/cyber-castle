

import { KeyBoard } from './utils/keyBoard'
import { Emitter } from './utils/Emitter'
import { FrameUpdater } from './utils/FrameUpater'
import { updateTweens } from './helpers/tween'

import {
    PLATFORMS_CONFIG, 
    CONTROLLERS_CONFIG, 
    ASSETS_TO_LOAD
} from './constants/elementsConfig'


import { BRIDGE_HTML_DEC_CONFIG } from './constants/htmlDevConfig'

import { loadAssets } from './utils/loadAssets'
import { prepareMeshesFromAssets, createMaterials } from './helpers/prepareMeshesFromAssets'

import { createStudio } from './entities/createStudio'
import { Player } from './entities/Player'
import { createBridge } from './entities/createBridge'
import { createSystemPlatforms } from './systems/systemPlatforms'
import { createSystemControllers } from './systems/systemControllers'

import { setItemToFloorsCollision } from './components/componentCollisionFloor'
import { setItemToWallCollision } from './components/componentCollisionWalls'
import { addItemToNearChecker } from './components/componentCheckNearItem'

import { bridgeParamsHtml } from './systemsHtml/bridgeParamsHtml'
import { createDialog } from './systemsHtml/dialogHtml'
import { showStartButton } from './systemsHtml/introHtml'


const initApp = () => loadAssets(ASSETS_TO_LOAD)
        .then(assets => {
            const emitter = Emitter()
            emitter.subscribe('frameUpdate')(updateTweens)

            const studio = createStudio(emitter)
            studio.scene.background = assets.skyBox

            const materials = createMaterials(assets)
            
            const bridge = createBridge(emitter, materials)
            setItemToFloorsCollision(bridge.mesh)
            setItemToWallCollision(bridge.mesh)
            studio.addToScene(bridge.mesh)

            
            const bridgeHtml = bridgeParamsHtml(BRIDGE_HTML_DEC_CONFIG, emitter)
            //document.body.appendChild(bridgeHtml)


            const systemPlatform = createSystemPlatforms(PLATFORMS_CONFIG, materials)
            systemPlatform.items.forEach(mesh => {
                setItemToFloorsCollision(mesh)
                setItemToWallCollision(mesh)
                studio.addToScene(mesh)
            })


            createSystemControllers(
                CONTROLLERS_CONFIG,
                assets.terminal,
                emitter,
                [ studio.addToScene,  addItemToNearChecker ]
            )
            createDialog(emitter)


            const { collisionWalls, collisionFloors, levelGroup } = prepareMeshesFromAssets(assets)
            studio.addToScene(levelGroup)
            collisionWalls.forEach(item => setItemToWallCollision(item))
            collisionFloors.forEach(item => setItemToFloorsCollision(item))


            new FrameUpdater(emitter)
            new KeyBoard(emitter)


            const player = Player(emitter)
            studio.setCamera(player.getCamera())
            studio.addToScene(player.getObj())

            
            showStartButton()
        })


window.addEventListener('load', initApp)

