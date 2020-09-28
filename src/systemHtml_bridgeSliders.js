

export function bridgeParamsHtml (data, emitter) {
    const container = document.createElement('div')
    container.id = 'bridge-params'


    const slides = {}
    for (let key in data) {
        const c = createChangerParam(Object.assign({}, data[key], { key, callback: vals => {
                data[vals.key].val = vals.val
                emitter.emit('updateBridge')(data)
                insertInText(data)
            }
        }))
        slides[key] = c
        container.appendChild(c)
    }

    emitter.subscribe('completeProgram')(data => {
        for (let key in slides) {
            slides[key].children[4].value = data[key]
        }
    })


    const textArea = document.createElement('div')
    const insertInText = data => {
        let stroke = '{\n time: 3000,'
        for (let key in data) {
            stroke += `${ key }: ${data[key].val}, \n`
        }
        stroke += '},\n'
        textArea.innerText = stroke
    }
    textArea.style.userSelect = 'all'
    container.appendChild(textArea)

    return container
}



function createChangerParam (data) {
    let { max, min, val, callback, label, key, step } = data

    const cont = document.createElement('div')


    const labelElem = document.createElement('span')
    labelElem.innerText = label
    cont.appendChild(labelElem)

    const valElem = document.createElement('span')
    valElem.innerText = val.toFixed(2)
    cont.appendChild(valElem)


    const buttMore = document.createElement('button')
    buttMore.innerText = 'more'
    buttMore.addEventListener('click', () => {
        val < max && (val += step)
        valElem.innerHTML = val.toFixed(2)
        callback({ key, val })
    })
    cont.appendChild(buttMore)

    const buttLess = document.createElement('button')
    buttLess.innerText = 'less'
    cont.appendChild(buttLess)
    buttLess.addEventListener('click', () => {
        val > min && (val -= step)
        valElem.innerHTML = val.toFixed(2)
        callback({ key, val })
    })


    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = min;
    slider.max = max;
    slider.value = val;
    slider.step = step;
    slider.oninput = e => {
        let val = +e.target.value
        valElem.innerHTML = val.toFixed(2)
        callback({ key, val })
    }
    cont.appendChild(slider);

    return cont
}

