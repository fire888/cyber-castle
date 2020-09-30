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
    let currentTerminalKey = null

    const showHideButton = is => {
        button.style.display = is ? 'flex' : 'none'
        button.innerText = t('open')
    }

    button.addEventListener('click', () => emitter.emit('toggleTerminal')({ terminalKey: currentTerminalKey, isOpen: true }))
    emitter.subscribe('toggleTerminal')(data => {
        if (!data.mesh) return;
        showHideButton(!data.isOpen)
    })

    emitter.subscribe('nearMesh')(data => {
        currentTerminalKey = data.mesh.userData.terminalKey
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

    let currentTerminalKey = null
    let currentPhraseIndex = 0

    const updateDialog = () =>
    {
        const dialogDATA = REPLICIES_CONFIG[currentTerminalKey][currentPhraseIndex]

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
                    currentPhraseIndex ++;
                    updateDialog()
                }

                if (dialogDATA.a[i].action === 'close') {
                    currentPhraseIndex = 0
                    showHideDialog({ isOpen: false, terminalKey: currentTerminalKey })
                    emitter.emit('toggleTerminal')({ isOpen: false, terminalKey: currentTerminalKey })
                }

                if (dialogDATA.a[i].action === 'startBridge') {
                    currentPhraseIndex = 0
                    showHideDialog({ isOpen: false, terminalKey: currentTerminalKey })
                    emitter.emit('toggleTerminal')({ isOpen: false, terminalKey: currentTerminalKey })
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
            currentTerminalKey = data.terminalKey
            updateDialog(data)
            dialogContainer.style.display = data.isOpen ? 'flex' : 'none'
        } 
        data.isOpen
            ? setTimeout(action, 1200)
            : action()
    }

    emitter.subscribe('toggleTerminal')(showHideDialog)
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
                for (let i = 1; i < REPLICIES_CONFIG[key][0].a.length; i ++) {
                    REPLICIES_CONFIG[key][0].a[i].isShow = false
                }
                REPLICIES_CONFIG[key][0].a[0].isShow = true
                REPLICIES_CONFIG[key][0].a[0].txt = ''
                REPLICIES_CONFIG[key][0].a[0].action = 'close'
                REPLICIES_CONFIG[key][0].a[0].idChangerState = null
            }
            REPLICIES_CONFIG['TERMINAL_LAST'][0].a[0].action = 'next'
        }, 1000)
    }

    if (id === 'clearMessagesAfterLastEnd')
    {
        REPLICIES_CONFIG['TERMINAL_LAST'][0].a[0].isShow = false
        REPLICIES_CONFIG['TERMINAL_LAST'][0].a[1].isShow = true
    }
}



/** translate */
const t = val => TRANSLATE_WORLDS[currentLanguage] && TRANSLATE_WORLDS[currentLanguage][val] || val

