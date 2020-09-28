

const PI = Math.PI



export const BRIDGE_HTML_DEC_CONFIG = {
    'count': {
        max: 300,
        min: 3,
        val: 100,
        label: 'count',
        step: 1,
    },
    'twist': {
        max: PI * 10,
        min: -PI * 10,
        val: PI,
        label: 'twist',
        step: 0.05,
    },
    'strengthTwist': {
        max: 1,
        min: 0,
        val: 1,
        label: 'strengthTwist',
        step: 0.001,
    },
    'radius': {
        max: 200,
        min: 10,
        val: 100,
        label: 'radius',
        step: 2,
    },
    'height': {
        max: 200,
        min: -200,
        val: 40,
        label: 'height',
        step: 2,
    },
    'rotate': {
        max: PI,
        min: -PI,
        val: 0,
        label: 'rotate',
        step: 0.1,
    },
    'width': {
        max: 30,
        min: 0,
        val: 10,
        label: 'width',
        step: 1,
    },
    'floor': {
        max: 20,
        min: 0,
        val: 17,
        label: 'floor',
        step: 0.1,
    },
    'x': {
        max: 300,
        min: -300,
        val: 0,
        label: 'x',
        step: 1,
    },
    'y': {
        max: 300,
        min: -300,
        val: 0,
        label: 'y',
        step: 1,
    },
    'z': {
        max: 300,
        min: -300,
        val: 0,
        label: 'z',
        step: 1,
    },
}

