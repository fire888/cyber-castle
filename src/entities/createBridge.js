import { createMeshBridge } from '../components/componentMeshBridge'
import { PROGRAM_01 } from '../constants/BRIDGE/program01'
import { createTween } from '../helpers/tween'


const START_STATE = {time: '3000', count: 60,twist: 11.6840734641021,strengthTwist: 1,radius: 10,height: 78,rotate: 0.858407346410207,width: 0,floor: 0,x: 0,y: -15,z: 0,}

const PROGRAMS = {
    'console_00': PROGRAM_01
}



export function createBridge (params, emitter, material) {
    let currentState = START_STATE

    const bridge = createMeshBridge(material)
    bridge.changeMesh(START_STATE)
    emitter.subscribe('updateBridge')(data => bridge.changeMesh(getValsFromData(data)))

    let inProgram = false
    emitter.subscribe('completeDialog')(data => {
        if (inProgram) return;

        inProgram = true
        doMarathonAnimations(PROGRAMS[data.currentConsoleKey], currentState, bridge.changeMesh)
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

