

export function Emitter () { 
    const storage = {}
    return { 
        emit: id => data => getOrCreateArrFromObj(storage)(id)
            .forEach(action => action(data)),
        subscribe: id => callback => {
            const arrActions = getOrCreateArrFromObj(storage)(id)
            arrActions.push(callback)
            return fn => {
                storage[id] = storage[id].filter(item => item !== fn)
            }
        },
        showAll () { console.log(storage) },
    }
}

const getOrCreateArrFromObj = obj => key => obj[key] = obj[key] || []










