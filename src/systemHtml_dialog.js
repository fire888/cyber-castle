import { REPLICIES_CONFIG, TRANSLATE_WORLDS } from './constants_replicies'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
gsap.registerPlugin(TextPlugin)


let currentLanguage = 'en'



export function createDialog (emitter) {
    prepareOpenDialogButton(emitter)
    prepareDialog(emitter)
    emitter.subscribe('setLanguage')(keyLanguage => currentLanguage = keyLanguage)
}



const prepareOpenDialogButton = emitter => {
    const button = document.getElementById('dialog-button-toggle')
    let currentMesh = null

    const showHideButton = is => {
        button.style.display = is ? 'flex' : 'none'
        button.innerText = t('open')
    }

    button.addEventListener('click', () => emitter.emit('toggleDialog')({ mesh: currentMesh, isOpen: true }))
    emitter.subscribe('toggleDialog')(data => {
        if (data.mesh.userData.terminalKey === "START_MESS") return;
        showHideButton(!data.isOpen)
    })

    emitter.subscribe('nearMesh')(data => {
        currentMesh = data.mesh
        showHideButton(data.toNear)
    })
    
    return button
}



const prepareDialog = emitter => {
    const dialogContainer = document.getElementById('messages-wrapper')
    const repliciesContainer = document.getElementById('replicies')
    const messagesContainer = document.getElementById('messages')
    const messagesList = []
    const playerRepliciesList = []

    let currentMesh = null
    let currentPraseIndex = 0

    const updateDialog = () =>
    {
        const dialogDATA = REPLICIES_CONFIG[currentMesh.userData.terminalKey][currentPraseIndex]

        /** clear old dialog */
        playerRepliciesList.forEach(item => item.parentNode.removeChild(item))
        playerRepliciesList.length = 0
        messagesList.forEach(item => item.parentNode.removeChild(item))
        messagesList.length = 0

        /** create message */
        const mess = document.createElement('p')
        messagesContainer.appendChild(mess)
        messagesList.push(mess)
        gsap.to(mess, 0.4, {duration: 0.4, text: t(dialogDATA.q.txt)})

        /** create answers */
        for (let i = 0; i < dialogDATA.a.length; i++ ) {

            if (!dialogDATA.a[i].isShow) continue;

            const answer = document.createElement('button')
            answer.innerText = t(dialogDATA.a[i].txt)
            answer.onclick = () => {
                if (dialogDATA.a[i].action === 'next') {
                    currentPraseIndex ++;
                    updateDialog()
                }

                if (dialogDATA.a[i].action === 'close') {
                    currentPraseIndex = 0
                    showHideDialog({ isOpen: false, mesh: currentMesh })
                    emitter.emit('toggleDialog')({ isOpen: false, mesh: currentMesh })
                }

                if (dialogDATA.a[i].action === 'startBridge') {
                    currentPraseIndex = 0
                    showHideDialog({ isOpen: false, mesh: currentMesh })
                    emitter.emit('toggleDialog')({ isOpen: false, mesh: currentMesh })
                    emitter.emit('startBridgeProgram')({ keyProgram: dialogDATA.a[i].dataAction.keyProgramBridge })
                }

                if (dialogDATA.a[i].dataAction && dialogDATA.a[i].dataAction.idChangerState) {
                    changePhrasesState(dialogDATA.a[i].dataAction.idChangerState)
                }
            }
            repliciesContainer.appendChild(answer)
            playerRepliciesList.push(answer)
        }
    }


    const showHideDialog = data =>{
        const action = () => {
            currentMesh = data.mesh
            updateDialog(data)
            dialogContainer.style.display = data.isOpen ? 'flex' : 'none'
        } 
        data.isOpen
            ? setTimeout(action, 1200)
            : action()
    }

    emitter.subscribe('toggleDialog')(showHideDialog)
}



const changePhrasesState = id => {
    if (id === 'openPhrasePROGRAM_00') 
    {
        REPLICIES_CONFIG['TERMINAL_00'][1].a[0].isShow = false
        REPLICIES_CONFIG['TERMINAL_00'][1].a[1].isShow = false
        REPLICIES_CONFIG['TERMINAL_00'][1].a[2].isShow = true
    }

    if (id === 'resetAllAfterEnd') 
    {
        setTimeout(() => {
            for (let key in REPLICIES_CONFIG) {
                REPLICIES_CONFIG[key][0].q.txt = REPLICIES_CONFIG['TERMINAL_LAST'][0].q.txt
                for (let i = 0; i < REPLICIES_CONFIG[key][0].a.length; i ++) {
                    REPLICIES_CONFIG[key][0].a[i].isShow = false
                }
                REPLICIES_CONFIG[key][0].a[0].isShow = true
                REPLICIES_CONFIG[key][0].a[0].txt = ''
                REPLICIES_CONFIG[key][0].a[0].action = 'close'
                REPLICIES_CONFIG[key][0].a[0].idChangerState = null
            }
        }, 1000)
    }
}



/** translate */
const t = val => TRANSLATE_WORLDS[currentLanguage] && TRANSLATE_WORLDS[currentLanguage][val] || val

