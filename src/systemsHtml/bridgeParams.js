

export function bridgeParamsHtml (data, emitter) {
    const container = document.createElement('div')
    container.id = 'bridge-params'

    for (let key in data) {
        const c = createCont(Object.assign(data[key], { key, callback: vals => { 
            data[vals.key].val = vals.val
            emitter.emit('updateBridge')(data) }
        }))
        container.appendChild(c)
    }

    return container
}



function createCont (data) {
    let { max, min, val, callback, label, key, step } = data

    const cont = document.createElement('div')


    const buttMore = document.createElement('button')
    buttMore.innerText = 'more'
    buttMore.addEventListener('click', () => {
        val < max && (val += step)
        valElem.innerHTML = val
        callback({ key, val })
    })
    cont.appendChild(buttMore)

    const buttLess = document.createElement('button')
    buttLess.innerText = 'less'
    cont.appendChild(buttLess)
    buttLess.addEventListener('click', () => {
        val > min && (val -= step)
        valElem.innerHTML = val
        callback({ key, val })
    })
    
    
    const labelElem = document.createElement('span')
    labelElem.innerText = label
    cont.appendChild(labelElem)

    const valElem = document.createElement('span')
    valElem.innerText = val
    cont.appendChild(valElem)

    return cont
}