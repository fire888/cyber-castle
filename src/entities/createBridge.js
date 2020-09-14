import { createMeshBridge } from '../components/componentMeshBridge'
import { BRIDGE_CONFIG_01 } from '../constants/BRIDGE/config01'
import { createTween } from '../helpers/tween'



export function createBridge (params, emitter, material) {
    let currentState = createCopyObject(getValsFromData(params))


    const bridge = createMeshBridge(material)
    bridge.changeMesh(getValsFromData(params))
    emitter.subscribe('updateBridge')(data => bridge.changeMesh(getValsFromData(data)))


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
            const newState = states[index]

            const actionWithValue = val =>
            {
                const middleState = {}
                for (let key in currentState)
                    middleState[key] = currentState[key] + (newState[key] - currentState[key]) * val
                action(middleState)
            }

            const nextTweenOrResolve = () =>
            {
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


const getValsFromData = data =>
{
    const newData = {}
    for (let key in data) newData[key] = data[key].val
    return newData
}


const createCopyObject = data =>
{
    const obj = {}
    for (let key in data) obj[key] = data[key]
    return obj
}

