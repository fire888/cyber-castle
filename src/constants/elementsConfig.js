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
  backgroundCoor: 0x222024,
  fogData: { 
    color: 0x0e2535, 
    strength: 0.0117,
  },
  amb: {
    color: 0xffffff, 
    strength: 0.8, 
  },
  "zero": -15,
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
    'angle': {
        max: Math.PI * 10,
        min: -Math.PI * 10,
        val: Math.PI,
        label: 'angle',
        step: 0.05,
    },
    'strengthAngle': {
        max: 1,
        min: 0,
        val: 1,
        label: 'strengthAngle',
        step: 0.05,
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
    }
}


export const PLATFORMS_CONFIG = [
    {
        key: '01',
        r: 30,
        angle: Math.PI,
        h: 10,
    },
    {
        key: '01',
        r: 30,
        angle: Math.PI * 1.3,
        h: 20,
    },
    {
        key: '01',
        r: 30,
        angle: Math.PI,
        h: 20,
    },
    {
        key: '01',
        r: 30,
        angle: Math.PI,
        h: 40,
    },
    {
        key: '01',
        r: 30,
        angle: Math.PI,
        h: 50,
    },
    {
        key: '01',
        r: 30,
        angle: Math.PI,
        h: 60,
    },

]


