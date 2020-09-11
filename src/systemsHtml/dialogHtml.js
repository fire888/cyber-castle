/**
 * Created by Vasilii on 11.09.2020.
 */


export function createDialog (emitter) {

    prepareOpenDialogButt(emitter)
    prepareDialog(emitter)
}




const prepareOpenDialogButt = emitter => {
    const openDialog = document.getElementById('dialog-button-toggle')

    let isPressed = false
    let currentItemName = null

    openDialog.addEventListener('click', () => {
        isPressed = !isPressed
        openDialog.innerText = isPressed ? 'close' : 'dialog'
        emitter.emit('dialogTo')({ name: currentItemName, isOpen: isPressed  })
    })

    emitter.subscribe('nearMesh')(data => {
        currentItemName = data.name
        openDialog.style.display = data.toNear ? 'flex' : 'none'
    })

    return openDialog
}



const prepareDialog = emitter => {
    const messagesWrapper = document.getElementById('messages-wrapper')
    const messages = document.getElementById('messages')
    const replicies = document.getElementById('replicies')

    const playerRepliciesList = []
    const messagesList = {}

    const updateDialog = () => {
        playerRepliciesList.forEach(item => item.parentNode.removeChild(item))
        playerRepliciesList.length = 0

        const butt = document.createElement('button')
        butt.innerText = 'start'
        butt.onclick = e => {
            updateDialog()
        }
        replicies.appendChild(butt)
        playerRepliciesList.push(butt)
    }

    emitter.subscribe('dialogTo')(data => {
        const messagesWrapper = document.getElementById('messages-wrapper')

        updateDialog()
        console.log('--------', data)
        messagesWrapper.style.display = data.isOpen ? 'flex' : 'none'
    })
}



/*
const openDialogButt = document.getElementById('dialog-button-toggle')
const messagesWrapper = document.getElementById('messages-wrapper')
const messages = document.getElementById('messages')
const replicies = document.getElementById('replicies')

const playerRepliciesList = []
const messagesList = {}

const updateDialog = () => {
    playerRepliciesList.forEach(item => item.parentNode.removeChild(item))
    playerRepliciesList.length = 0

    messages.innerHTML = ''
    messagesList[monsterName].forEach(item => messages.appendChild(item))


    for (let i = 0; i < DIALOGS[monsterName]['messages'].length; i ++) {

        if (!DIALOGS[monsterName]['messages'][i].isDone) {
            const mess = DIALOGS[monsterName]['messages'][i]['player']
            const butt = document.createElement('button')
            butt.innerText = mess
            butt.dataset.index = i
            butt.onclick = e => {
                if (DIALOGS[monsterName]['messages'][i]['event']) {
                    const { type, data } = DIALOGS[monsterName]['messages'][i]['event']
                    eventEmitter.emit(type)(data)
                }

                DIALOGS[monsterName]['messages'][i].isDone = true
                const mesPlayer = DIALOGS[monsterName]['messages'][e.target.dataset.index]['player']
                const pP = document.createElement('p')
                pP.classList.add('player')
                pP.innerText = mesPlayer
                messages.appendChild(pP)
                messagesList[monsterName].push(pP)

                const mes = DIALOGS[monsterName]['messages'][e.target.dataset.index]['nps']
                const p = document.createElement('p')
                p.innerText = mes
                messages.appendChild(p)
                messagesList[monsterName].push(p)

                updateDialog()
            }
            replicies.appendChild(butt)
            playerRepliciesList.push(butt)
        }
    }
}

openDialogButt.addEventListener('click', () => {
    messagesIsShow = !messagesIsShow
    eventEmitter.emit('messagesIsShow')(messagesIsShow)

    messagesIsShow && updateDialog()

    messagesWrapper.style.display = messagesIsShow ? 'flex' : 'none'
    openDialogButt.innerText = messagesIsShow ? 'close' : 'dialog'
})


let buttIsShow = false
let messagesIsShow = false

let monsterName = null

eventEmitter.subscribe('unhideDialogButton')((data) => {
    if (buttIsShow === data.open) return;
    monsterName = data.name
    if (!messagesList[data.name]) messagesList[data.name] = []
    buttIsShow  = data.open
    openDialogButt.style.display = data.open ? 'flex' : 'none'
})

*/