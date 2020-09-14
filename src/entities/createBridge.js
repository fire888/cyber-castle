import { createMeshBridge } from '../components/componentMeshBridge'
import { BRIDGE_CONFIG_01 } from '../constants/BRIDGE/config01'
import { createTween } from '../helpers/tween'

export function createBridge (params, emitter, material) {
    let currentState = createCopyObject(getData(params))


    const bridge = createMeshBridge(material)
    emitter.subscribe('updateBridge')(data => bridge.changeMesh(getData(params)))
    bridge.changeMesh(getData(params))


    doMarathonAnimations(BRIDGE_CONFIG_01, currentState, bridge.changeMesh)
        .then(newState => currentState = newState)

    return {
        mesh: bridge.mesh
    }
}



const doMarathonAnimations = (states, currentState, action) =>
{
    return new Promise(resolve => {
        const doNextAnimation = index => {
            if (!states[index]) return resolve(currentState)

            const newState = states[index]

            const actionWithValue = val => {
                const middleObj = {}
                for (let key in currentState)
                    middleObj[key] = currentState[key] + (newState[key] - currentState[key]) * val
                action(middleObj)
            }

            const nextTweenOrResolve = () => {
                currentState = newState
                index ++
                states[index] ? doNextAnimation(index) : resolve(currentState)
            }

            createTween({
                tweenType: 'simpleTween',
                fromValue: 0,
                toValue: 1,
                duration: newState.time,
                actionWithValue,
            }).then(nextTweenOrResolve)
        }

        doNextAnimation(0)
    })
}


const getData = data =>
{
    const newData = {}
    for (let key in data) newData[key] = data[key].val
    return newData
}



const createCopyObject = data => {
    const obj = {}
    for (let key in data) obj[key] = data[key]
    return obj
}