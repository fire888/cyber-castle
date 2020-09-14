/**
 * Created by Vasilii on 11.09.2020.
 */


export function createDialog (emitter) 
{
    prepareOpenDialogButt(emitter)
    prepareDialog(emitter)
}



const prepareOpenDialogButt = emitter => 
{
    let isPressed = false
    let currentConsoleKey = null

    const showHideButt = (is) => {
        isPressed = false
        openDialog.style.display = is ? 'flex' : 'none'
        openDialog.innerText = 'dialog'
    }
    const switchButton = () => {
        isPressed = !isPressed
        openDialog.innerText = isPressed ? 'close' : 'dialog'
    }
    const openDialog = document.getElementById('dialog-button-toggle')
    openDialog.addEventListener('click', () => { 
        switchButton()
        emitter.emit('startDialog')({ name: currentConsoleKey, isOpen: isPressed  })
    })

    emitter.subscribe('nearMesh')(data => {
        currentConsoleKey = data.name
        showHideButt(data.toNear)
        !data.toNear && emitter.emit('dialogTo')({ name: currentConsoleKey, isOpen: false })
    })
    emitter.subscribe('completeDialog')(switchButton)

    return openDialog
}



const prepareDialog = emitter => {
    const replicies = document.getElementById('replicies')
    const playerRepliciesList = []

    let currentConsoleKey = null

    const updateDialog = () => {
        playerRepliciesList.forEach(item => item.parentNode.removeChild(item))
        playerRepliciesList.length = 0

        const butt = document.createElement('button')
        butt.innerText = 'start'
        butt.onclick = e => {
            showHideDialog({ isOpen: false, name: currentConsoleKey })
            emitter.emit('completeDialog')({ isOpen: false, currentConsoleKey })
        }
        replicies.appendChild(butt)
        playerRepliciesList.push(butt)
    }


    const showHideDialog = data => {
        currentConsoleKey = data.name
        const messagesWrapper = document.getElementById('messages-wrapper')
        updateDialog(data)
        messagesWrapper.style.display = data.isOpen ? 'flex' : 'none'
    }

    emitter.subscribe('startDialog')(showHideDialog)
}

