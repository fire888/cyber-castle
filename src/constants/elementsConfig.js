import '../assets/start-img.png'
import '../assets/progress-img.png'
import levelSrc from '../assets/level.obj'


export const assetsToLoad = [
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
        max: Math.PI,
        min: 0,
        val: Math.PI,
        label: 'strengthTwist',
        step: 0.001,
    },
    'distance': {
        max: 200,
        min: 2,
        val: 50,
        label: 'distance',
        step: 0.05,
    },
    'radius': {
        max: 200,
        min: 10,
        val: 80,
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
    'width': {
        max: 30,
        min: 3,
        val: 10,
        label: 'width',
        step: 1,
    },
    'rotate': {
        max: PI,
        min: -PI,
        val: 0,
        label: 'rotate',
        step: 0.1,
    },
    'offsetCenter': {
        max: 100,
        min: -100,
        val: 0,
        label: 'offsetCenter',
        step: 1,
    },
}


const R = 100

export const PLATFORMS_CONFIG = [
    {
        key: '01',
        r: R,
        angle: Math.PI,
        h: 0,
    }, {
        key: '01',
        r: R,
        angle: Math.PI * 1.3,
        h: 20,
    },
]


const NAME = 'console_'


export const CONTROLLERS_CONFIG = [
    {
        key: NAME + '00',
        r: R + 10,
        angle: 0,
        y: 5,
        controls: {
            'rotate': {max: PI, min: -PI, val: 0, label: 'rotate', step: 0.1,},
            'distance': {max: 200, min: 2, val: 50, label: 'distance', step: 0.05,},
        },
    },
    {
        key: NAME + '01',
        r: R + 10,
        angle: 1,
        y: 5,
        controls: {
            'rotate': {max: PI, min: -PI, val: 0, label: 'rotate', step: 0.1,},
            'distance': {max: 200, min: 2, val: 50, label: 'distance', step: 0.05,},
        },
    },
]


