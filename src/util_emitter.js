

export function createEmitter () { 
    const storage = {}
    return { 
        emit: id => data => getOrCreateArrFromObj(storage)(id).forEach(action => action(data)),
        subscribe: id => callback => {
            getOrCreateArrFromObj(storage)(id).push(callback)
            return () => storage[id] = storage[id].filter(item => item !== callback)
        },
        showAll () { 
            const s = {}
            for (let key in storage) {
                s[key] = storage[key].length
            }
            console.log(s) 
        },
    }
}



const getOrCreateArrFromObj = obj => key => obj[key] = obj[key] || []

