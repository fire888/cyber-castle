

import { createDeviceResizer } from './utils/deviceResizer'
import { KeyBoard } from './utils/keyBoard'
import { createEmitter } from './utils/emitter'
import { createFrameUpdater } from './utils/frameUpater'
import { updateTweens } from './utils/tween'

import { ASSETS_TO_LOAD } from './constants/elementsConfig'

import { BRIDGE_HTML_DEC_CONFIG } from './constants/htmlDevConfig'

import { loadAssets } from './utils/loadAssets'
import { prepareMeshesFromAssets } from './helpers/prepareMeshesFromAssets'

import { createStudio } from './entities/createStudio'
import { createPlayer } from './entities/createPlayer'

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
            createFrameUpdater(emitter)
            emitter.subscribe('frameUpdate')(updateTweens)

            const studio = createStudio(emitter, assets)

            /** level */
            const { arrMeshes, levelGroup, topLevelGroup, materials} = prepareMeshesFromAssets(assets)
            studio.addToScene(levelGroup)
            arrMeshes.forEach(item => { 
                setItemToWallCollision(item)
                setItemToFloorsCollision(item)
            })
            createSystemTopWorld(topLevelGroup, emitter, studio.addToScene)
            const levelCollisionBorders = createLevelBorder()
            studio.addToScene(levelCollisionBorders)
            setItemToWallCollision(levelCollisionBorders)

            /** bridge */
            const systemBridge = createSystemBridge(emitter, materials)
            setItemToFloorsCollision(systemBridge.mesh)
            setItemToWallCollision(systemBridge.mesh)
            studio.addToScene(systemBridge.mesh)

            /** devel bridge params */
            // const bridgeHtml = bridgeParamsHtml(BRIDGE_HTML_DEC_CONFIG, emitter)
            // document.body.appendChild(bridgeHtml)

            /** platfoms and terminals */
            const systemPlatform = createSystemPlatforms(materials)
            systemPlatform.items.forEach(mesh => {
                setItemToFloorsCollision(mesh)
                setItemToWallCollision(mesh)
                studio.addToScene(mesh)
            })

            createSystemTerminals(assets.terminal, emitter, studio.addToScene, addItemToNearChecker)
            createDialog(emitter)

            /** add top world */
            // emitter.emit('toggleDialog')({ mesh: { userData: { keyProgram: 'PROGRAM_06' } } } )


            /** player */
            new KeyBoard(emitter)
            const player = createPlayer(emitter)
            studio.setCamera(player.getCamera())
            studio.addToScene(player.getObj())

            createInfo(emitter)
            showStartButton(emitter)
        })


window.addEventListener('load', initApp)

