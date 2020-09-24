import { REPLICIES_CONFIG } from '../constants/repliciesConfig'


export function createDialog (emitter) 
{
    prepareOpenDialogButt(emitter)
    prepareDialog(emitter)
}



const prepareOpenDialogButt = emitter => 
{
    const button = document.getElementById('dialog-button-toggle')
    let isPressed = false
    let currentMesh = null
    let isActive = true

    const showHideButt = is =>
    {
        isPressed = false
        button.style.display = is ? 'flex' : 'none'
        button.innerText = 'dialog'
    }
    const switchButton = () =>
    {
        isPressed = !isPressed
        button.innerText = isPressed ? 'close' : 'dialog'
    }
    button.addEventListener('click', () =>
    {
        if (!isActive) return;

        isActive = false
        setTimeout(() => isActive = true, 1500)
        switchButton()
        emitter.emit('startDialog')({ mesh: currentMesh, isOpen: isPressed  })
    })
    emitter.subscribe('nearMesh')(data =>
    {
        currentMesh = data.mesh
        showHideButt(data.toNear)
        !data.toNear && emitter.emit('dialogTo')({ mesh: currentMesh, isOpen: false })
    })

    emitter.subscribe('completeDialog')(switchButton)

    return button
}



const prepareDialog = emitter => {
    const replicies = document.getElementById('replicies')
    const messages = document.getElementById('messages')
    const messagesList = []
    const playerRepliciesList = []

    let currentMesh = null
    let currentPraseIndex = 0

    const updateDialog = () =>
    {
        const dialogDATA = REPLICIES_CONFIG[currentMesh.userData.keyProgram][currentPraseIndex]
        console.log(dialogDATA)

        playerRepliciesList.forEach(item => item.parentNode.removeChild(item))
        playerRepliciesList.length = 0
        messagesList.forEach(item => item.parentNode.removeChild(item))
        messagesList.length = 0

        const mess = document.createElement('p')
        mess.innerText = dialogDATA.q.rep
        messages.appendChild(mess)
        messagesList.push(mess)


        for (let i = 0; i < dialogDATA.a.length; i++ ) {

            if (!dialogDATA.a[i].show) continue;

            const answer = document.createElement('button')
            answer.innerText = dialogDATA.a[i].rep
            answer.onclick = () => {
                if (dialogDATA.a[i].action === 'next') {
                    currentPraseIndex ++;
                    updateDialog()
                }

                if (dialogDATA.a[i].action === 'startBridge') {
                    currentPraseIndex = 0
                    showHideDialog({ isOpen: false, mesh: currentMesh })
                    emitter.emit('completeDialog')({ isOpen: false, mesh: currentMesh })
                    emitter.emit('startBridgeProgram')({ keyProgram: currentMesh.userData.keyProgram })
                }

                if (dialogDATA.a[i].action === 'close') {
                    currentPraseIndex = 0
                    showHideDialog({ isOpen: false, mesh: currentMesh })
                    emitter.emit('completeDialog')({ isOpen: false, mesh: currentMesh })
                }

            }
            replicies.appendChild(answer)
            playerRepliciesList.push(answer)
        }
    }



    const showHideDialog = data =>
    {
        const action = () => {
            currentMesh = data.mesh
            const messagesWrapper = document.getElementById('messages-wrapper')
            updateDialog(data)
            messagesWrapper.style.display = data.isOpen ? 'flex' : 'none'
        } 

        data.isOpen
            ? setTimeout(action, 1200)
            : action()
    }

    emitter.subscribe('startDialog')(showHideDialog)
}

