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
    const button = document.getElementById('dialog-button-toggle')
    let isPressed = false
    let currentMesh = null

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
    const playerRepliciesList = []

    let currentMesh = null

    const updateDialog = () =>
    {
        playerRepliciesList.forEach(item => item.parentNode.removeChild(item))
        playerRepliciesList.length = 0

        const butt = document.createElement('button')
        butt.innerText = 'start'
        butt.onclick = e => {
            showHideDialog({ isOpen: false, mesh: currentMesh })
            emitter.emit('completeDialog')({ isOpen: false, mesh: currentMesh })
        }
        replicies.appendChild(butt)
        playerRepliciesList.push(butt)
    }


    const showHideDialog = data =>
    {
        currentMesh = data.mesh
        const messagesWrapper = document.getElementById('messages-wrapper')
        updateDialog(data)
        messagesWrapper.style.display = data.isOpen ? 'flex' : 'none'
    }

    emitter.subscribe('startDialog')(showHideDialog)
}

