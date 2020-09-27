
import { createBridgeMesh } from './componentBridgeMesh'
import { createTween } from '../../utils/tween'


export function createBridge (material)
{
    const setPose = state =>
    {
        currentState = state
        bridge.changeMesh(state)
    }


    const startProgram = program =>
    {
        return new Promise(resolve => {
            doMarathonAnimations(currentState, program, bridge.changeMesh)
                .then(newState => {
                    currentState = newState
                    resolve()
                })
        })
    }

    let currentState = null
    const bridge = createBridgeMesh(material)

    return {
        mesh: bridge.mesh,
        setPose,
        startProgram,
    }
}




const doMarathonAnimations = (currentState, arrStates, action) =>
{
    return new Promise(resolve =>
    {
        const doNextAnimation = index =>
        {
            const newState = arrStates[index]


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
                arrStates[index] ? doNextAnimation(index) : resolve(currentState)
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


