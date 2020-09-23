const lerp = (x1, x2, t) => x1 * (1 - t) + x2 * t;

const _interpolateTwoVals = (x1, x2, x3, x4, t) => {
    const v1 = (1-t)**3 * x1;
    const v2 = 3 * (1-t)**2 * t * x2
    const v3 = 3 * (1-t)*(t**2) * x3
    const v4 = t**3 * x4
    return v1 + v2 + v3 + v4
}


const backOut = amount => t => (--t * t * ((amount + 1) * t + amount) + 1)



/** auto update with tick ************************************************/

let tweensToUpdate = []

export const updateTweens = () => {
    for (let i = 0; i < tweensToUpdate.length; i ++) {
        tweensToUpdate[i].update()
    }
}


export function createTween (data) {
    return new Promise(resolve => {

        const tweenData = Object.assign({}, data, {
            timeStarted: Date.now(),
            callback: () => {
                tweensToUpdate = tweensToUpdate.filter(item => item.key !== key)
                resolve()
            }
        })
        const update = tweensFunctions[data.tweenType](tweenData)
        const key = Math.random() * 1000000

        tweensToUpdate.push({ update, key })
    })
}



const tweensFunctions = {

    'simpleTween': ({
                        timeStarted,
                        fromValue,
                        toValue,
                        duration,
                        actionWithValue,
                        callback,
                    }) => () => {
        const phase = Math.min(1, (Date.now() - timeStarted) / duration)
        const value = lerp(fromValue, toValue, phase)
        actionWithValue(value)
        phase === 1 && callback()
    },

    'eraseTween': ({
                       timeStarted,
                       fromValue,
                       toValue,
                       duration,
                       actionWithValue,
                       callback,
                   }) => () => {
        const easing = backOut(0.0)
        const phase = Math.min(1, (Date.now() - timeStarted) / duration)
        const value = lerp(fromValue, toValue, easing(phase))
        actionWithValue(value)
        phase === 1 && callback()
    },

    'autoUpdateColumnTwoVals': ({
                                    timeStarted,
                                    fromValue,
                                    middleValueOne,
                                    middleValueTwo,
                                    toValue,
                                    duration,
                                    actionWithValue,
                                    callback,
                                }) => () => {
        const phase = Math.min(1, (Date.now() - timeStarted) / duration)
        const value = _interpolateTwoVals(fromValue, middleValueOne, middleValueTwo, toValue, phase)
        actionWithValue(value)
        phase === 1 && callback()
    },
}



