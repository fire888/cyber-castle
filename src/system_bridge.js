import { createBridge } from './component_bridge'
import { START_STATE, PROGRAMS } from './constants_elements'



export function createSystemBridge (emitter, material) {
    const bridge = createBridge(material)
    bridge.setPose(START_STATE)

    // TODO: remove.
    emitter.subscribe('updateBridge')(data => bridge.setPose(getValuesFromData(data)))

    let inProgram = false
    emitter.subscribe('startBridgeProgram')(data=> {
        if (inProgram) return;
        if (!PROGRAMS[data.keyProgram]) return;

        inProgram = true
        bridge.startProgram(PROGRAMS[data.keyProgram])
            .then(() => inProgram = false)
    })

    return {
        mesh: bridge.mesh
    }
}



const getValuesFromData = data => {
    const newData = {}
    for (let key in data) newData[key] = data[key].val
    return newData
}

