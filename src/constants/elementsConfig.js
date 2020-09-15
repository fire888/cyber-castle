import '../assets/start-img.png'
import '../assets/progress-img.png'
import levelSrc from '../assets/level.obj'


export const ASSETS_TO_LOAD = [
    {
        type: 'obj',
        filename: levelSrc,
        key: 'level'
    },
]



const PI = Math.PI
const hPI = PI / 2


export const studioConfig = {
    canId: 'webgl-canvas',
    rendererCon: {
        antialias: true
    },
    clearColor: 0x0e2535,
    backgroundColor: 0x222024,
    fogData: {
        color: 0x0e2535,
        strength: 0.0057,
    },
    amb: {
        color: 0xffffff,
        strength: 0.8,
    },
}

export const playerConfig = {
    speed: 0.35,
    speedRot: 0.02,
    speedDown: -0.25,
    offsetFromFloor: 8.0,
    offsetFromFloorFactor: 0.5,
    offsetWallCollision: 3.5,
    level: -13,
    startRot: [0, 0, 0],
    startPos: [0, 0, 120],
    cameraData: {
        fov: 90,
        ratio: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 1000,
        pos: [0, 0, -0.5],
    },
    frontObjPos: [0, 0, -1],
    lightData: {
        color: 0xffffcc,
        strength: 0.5,
        pos: [15, 40, 0],
    },
}


export const BRIDGE_CONFIG = {
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


const R = 100

export const PLATFORMS_CONFIG = [
    {
        key: '01',
        r: R,
        angle: PI,
        y: -5,
        w1: 30,
        w2: 40,
        h: 7,
    },
]


const NAME = 'console_'

export const CONTROLLERS_CONFIG = [
    {
        key: NAME + '00',
        r: R + 10,
        angle: 0,
        y: 5,
    },
    {
        key: NAME + '01',
        r: R + 10,
        angle: PI,
        y: 5,
    },
    /*{
        key: NAME + '02',
        r: R + 10,
        angle: .4,
        y: 5,
        controls: {
            'rotate': {max: PI, min: -PI, val: 0, label: 'rotate', step: 0.1,},
            'distance': {max: 200, min: 2, val: 50, label: 'distance', step: 0.05,},
        },
    },
    {
        key: NAME + '03',
        r: R + 10,
        angle: 0.6,
        y: 5,
        controls: {
            'rotate': {max: PI, min: -PI, val: 0, label: 'rotate', step: 0.1,},
            'distance': {max: 200, min: 2, val: 50, label: 'distance', step: 0.05,},
        },
    },
    {
        key: NAME + '04',
        r: R + 10,
        angle: 0.8,
        y: 5,
        controls: {
            'rotate': {max: PI, min: -PI, val: 0, label: 'rotate', step: 0.1,},
            'distance': {max: 200, min: 2, val: 50, label: 'distance', step: 0.05,},
        },
    },
    {
        key: NAME + '05',
        r: R + 10,
        angle: 1,
        y: 5,
        controls: {
            'rotate': {max: PI, min: -PI, val: 0, label: 'rotate', step: 0.1,},
            'distance': {max: 200, min: 2, val: 50, label: 'distance', step: 0.05,},
        },
    },
    {
        key: NAME + '06',
        r: R + 10,
        angle: 1.2,
        y: 5,
        controls: {
            'rotate': {max: PI, min: -PI, val: 0, label: 'rotate', step: 0.1,},
            'distance': {max: 200, min: 2, val: 50, label: 'distance', step: 0.05,},
        },
    },
    {
        key: NAME + '07',
        r: R + 10,
        angle: 1.4,
        y: 5,
        controls: {
            'rotate': {max: PI, min: -PI, val: 0, label: 'rotate', step: 0.1,},
            'distance': {max: 200, min: 2, val: 50, label: 'distance', step: 0.05,},
        },
    },
    {
        key: NAME + '08',
        r: R + 10,
        angle: 1.6,
        y: 5,
        controls: {
            'rotate': {max: PI, min: -PI, val: 0, label: 'rotate', step: 0.1,},
            'distance': {max: 200, min: 2, val: 50, label: 'distance', step: 0.05,},
        },
    },
    {
        key: NAME + '09',
        r: R + 10,
        angle: 1.8,
        y: 5,
        controls: {
            'rotate': {max: PI, min: -PI, val: 0, label: 'rotate', step: 0.1,},
            'distance': {max: 200, min: 2, val: 50, label: 'distance', step: 0.05,},
        },
    },*/
]


