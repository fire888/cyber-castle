

import { createDeviceResizer } from './utils/deviceResizer'
import { KeyBoard } from './utils/keyBoard'
import { createEmitter } from './utils/emitter'
import { FrameUpdater } from './utils/FrameUpater'
import { updateTweens } from './utils/tween'

import {
    PLATFORMS_CONFIG,
    ASSETS_TO_LOAD
} from './constants/elementsConfig'


import { BRIDGE_HTML_DEC_CONFIG } from './constants/htmlDevConfig'

import { loadAssets } from './utils/loadAssets'
import { prepareMeshesFromAssets, createMaterials } from './helpers/prepareMeshesFromAssets'

import { createStudio } from './entities/createStudio'
import { Player } from './entities/Player'

import { createSystemBridge } from './systems/systemBridge'
import { createSystemPlatforms } from './systems/systemPlatforms'
import { createSystemTerminals } from './systems/systemTerminals'
import { createSystemTopWorld } from './systems/systemTopWorld'

import { setItemToFloorsCollision } from './components/componentCollisionFloor'
import { setItemToWallCollision } from './components/componentCollisionWalls'
import { addItemToNearChecker } from './components/componentCheckNearItem'

import { createLevelBorder } from './components/componentCreateLevelBorders'

import { bridgeParamsHtml } from './systemsHtml/bridgeParamsHtml'
import { createDialog } from './systemsHtml/dialogHtml'
import { showStartButton } from './systemsHtml/introHtml'
import { createInfo } from './systemsHtml/infoHtml'

createDeviceResizer()

const initApp = () => loadAssets(ASSETS_TO_LOAD)
        .then(assets => {
            const emitter = createEmitter()
            new FrameUpdater(emitter)
            emitter.subscribe('frameUpdate')(updateTweens)

            const studio = createStudio(emitter)
            studio.scene.background = assets.skyBox

            const materials = createMaterials(assets)

            /** level */
            const { collisionWalls, collisionFloors, levelGroup, topLevelGroup} = prepareMeshesFromAssets(assets)
            studio.addToScene(levelGroup)
            collisionWalls.forEach(item => setItemToWallCollision(item))
            collisionFloors.forEach(item => setItemToFloorsCollision(item))
            createSystemTopWorld(topLevelGroup, emitter, studio.addToScene)
            const levelCollisionBorders = createLevelBorder()
            studio.addToScene(levelCollisionBorders)
            setItemToWallCollision(levelCollisionBorders)

            /** bridge */
            const systemBridge = createSystemBridge(emitter, materials)
            setItemToFloorsCollision(systemBridge.mesh)
            setItemToWallCollision(systemBridge.mesh)
            studio.addToScene(systemBridge.mesh)

            const bridgeHtml = bridgeParamsHtml(BRIDGE_HTML_DEC_CONFIG, emitter)
            // document.body.appendChild(bridgeHtml)


            /** platfoms and terminals */

            const systemPlatform = createSystemPlatforms(PLATFORMS_CONFIG, materials)
            systemPlatform.items.forEach(mesh => {
                setItemToFloorsCollision(mesh)
                setItemToWallCollision(mesh)
                studio.addToScene(mesh)
            })

            createSystemTerminals(assets.terminal, emitter, studio.addToScene, addItemToNearChecker,)
            createDialog(emitter)

            //emitter.emit('completeDialog')({ mesh: { userData: { keyProgram: 'PROGRAM_06' } } } )


            /** player */
            new KeyBoard(emitter)
            const player = Player(emitter)
            studio.setCamera(player.getCamera())
            studio.addToScene(player.getObj())

            createInfo(emitter)
            showStartButton(emitter)
        })


window.addEventListener('load', initApp)

