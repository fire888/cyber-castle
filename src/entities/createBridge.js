import { createMeshBridge } from '../components/componentMeshBridge'
import {
    START_STATE,
    PROGRAMS
} from '../constants/elementsConfig'
import { createTween } from '../helpers/tween'


export function createBridge (emitter, material) {
    let currentState = START_STATE

    const bridge = createMeshBridge(material)
    bridge.changeMesh(START_STATE)
    emitter.subscribe('updateBridge')(data => bridge.changeMesh(getValuesFromData(data)))

    let inProgram = false
    emitter.subscribe('completeDialog')(data => {
        if (inProgram) return;
        if (!PROGRAMS[data.mesh.userData.keyProgram]) return;

        inProgram = true
        doMarathonAnimations(PROGRAMS[data.mesh.userData.keyProgram], currentState, bridge.changeMesh)
            .then(newState => {
                currentState = newState
                inProgram = false
            })
    })

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


const getValuesFromData = data =>
{
    const newData = {}
    for (let key in data) newData[key] = data[key].val
    return newData
}



