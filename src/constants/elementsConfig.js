import '../assets/start-img.png'
import '../assets/progress-img.png'
import pxjpg from '../assets/skybox/px.jpg'
import nxjpg from '../assets/skybox/nx.jpg'
import pyjpg from '../assets/skybox/py.jpg'
import nyjpg from '../assets/skybox/ny.jpg'
import pzjpg from '../assets/skybox/pz.jpg'
import nzjpg from '../assets/skybox/nz.jpg'

import levelSrc from '../assets/level.obj'
import terminalSrc from '../assets/terminal1.glb'


export const ASSETS_TO_LOAD = [
    {
        type: 'obj',
        filename: levelSrc,
        key: 'level'
    },
    {
        type: 'glb',
        filename: terminalSrc,
        key: 'terminal'
    },
    {
        type: 'cubeTextures',
        filename: { px: pxjpg, nx: nxjpg, py: pyjpg, ny: nyjpg, pz: pzjpg, nz: nzjpg, },
        key: 'skyBox'
    },
]


const PI = Math.PI
const R = 100

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
    startPos: [0, 0, 130],
    //startPos: [2.354103517969214, 6.5, -107.29721568841998],
    //startPos: [-24.948354188041503, 72.5, 93.69116998603509 ],
    //startPos: [18.357669772732198, 72.5, -104.50015863788533],
    //startPos: [110.99286970990862, 123.5, 19.3252595736 ],
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


export const MATERIALS_CONFIG = {
    'wall': {
        mat: 'MeshPhongMaterial',
        props: {
            side: THREE.DoubleSide,
            color: '#00c7ea',
            emissive: '#6205b0',
            bumpScale: 0.2,
            shininess: 100,
        },
    } 
}


export const PLATFORMS_CONFIG = [
    { key: '01', r: R, angle: PI + 0.1, y: -5, w1: 70, w2: 40, h: 7, },
    { key: '02', r: R, angle: 0, y: 61, w1: 70, w2: 40, h: 7, },
    { key: '03', r: R, angle: PI - 0.1, y: 61, w1: 70, w2: 40, h: 7, },
    { key: '04', r: R + 20, angle: PI/2, y: 112, w1: 70, w2: 40, h: 7, },
    { key: '05', r: R + 20, angle: 0.35, y: 145, w1: 70, w2: 40, h: 7, },
]

export const CONTROLLERS_CONFIG = [
    { keyProgram: 'PROGRAM_00', r: R + 20, angle: 0, y: 0, },
    { keyProgram: 'PROGRAM_01', r: R - 5, angle: PI + 0.3, y: -2, },
    { keyProgram: 'PROGRAM_02', r: R - 5, angle: -0.2, y: 63, },
    { keyProgram: 'PROGRAM_03', r: R - 5, angle: PI - 0.2, y: 63, },
    { keyProgram: 'PROGRAM_04', r: R + 10, angle: PI/2 - 0.2, y: 115, },
]

export const START_STATE =
{time: '3000', count: 60,twist: 11.6840734641021,strengthTwist: 1,radius: 10,height: 78,rotate: 0.858407346410207,width: 0,floor: 0,x: 0,y: -15,z: 0,}
//{time: '3000', count: 100, twist: 1.53407346410207, strengthTwist: 0, radius: 100, height: 2, rotate: 0, width: 10, floor: 17, x: 0, y: 0, z: 0,}
//{time: 1000, count: 100, twist: 0,strengthTwist: 0,radius: 85,height: -73,rotate: PI * 2 + 0.25,width: 12,floor: 30,x: 0,y: 67,z: 0,}
//{time: 3000, count: 100, twist: -2.81592653589793, strengthTwist: 1, radius: 96, height: 0, rotate: -0.341592653589793, width: 8, floor: 18, x: 0, y: 65, z: 0, }
//{ time: 3000,count: 100, twist: 13.7340734641021, strengthTwist: 0.351, radius: 126, height: 52, rotate: -2.84159265358979, width: 10, floor: 17, x: 42, y: 69, z: 0, }

export const PROGRAMS = {
    'PROGRAM_00': [
        {time: 700, count: 60, twist: 14.1340734641021, strengthTwist: 1, radius: 30, height: 78, rotate: -Math.PI, width: 7, floor: 0, x: 0, y: -15, z: 0,},
        {time: 700, count: 172, twist: 14.1340734641021, strengthTwist: 0.383, radius: 40, height: 78, rotate: 0.858407346410207, width: 7, floor: 13.3, x: 0, y: -15, z: 0,},
        {time: 2000, count: 172, twist: -18.1659265358979, strengthTwist: 0.486, radius: 40, height: 62, rotate: -Math.PI, width: 7, floor: 20, x: 0, y: -15, z: 0,},
        {time: 3000, count: 300, twist: -18.1659265358979, strengthTwist: 0.922, radius: 64, height: 30, rotate: 0.858407346410207, width: 4, floor: 5.3, x: 0, y: 40, z: 0,},
        {time: 3000, count: 100, twist: 1.53407346410207, strengthTwist: 0, radius: 110, height: 2, rotate: 0, width: 10, floor: 17, x: 0, y: 0, z: 0,},
    ],
    'PROGRAM_01': [
        {time: 3000, count: 160, twist: -10,strengthTwist: 1,radius: 22,height: -40,rotate: PI,width: 3,floor: 17,x: 0,y: 70,z: 0,},
        {time: 3000, count: 100, twist: 0,strengthTwist: 0,radius: 60,height: -78,rotate: PI * 1.5,width: 30,floor: 5,x: 0,y: 70,z: 0,},
        {time: 1000, count: 100, twist: 0,strengthTwist: 0,radius: 85,height: -73,rotate: PI * 2 + 0.25,width: 12,floor: 30,x: 0,y: 67,z: 0,},
    ],
    'PROGRAM_02': [
        {time: 3000, count: 50, twist: -4, strengthTwist: 1, radius: 7, height: 80, rotate: 1.5, width: 5, floor: 7, x: 0, y: 65, z: 0, },    
        {time: 3000, count: 70, twist: 6, strengthTwist: 1, radius: 40, height: -80, rotate: -1.5, width: 8, floor: 7, x: 0, y: 110, z: 0, },    
        {time: 3000, count: 100, twist: -2.81592653589793, strengthTwist: 1, radius: 96, height: 0, rotate: -0.341592653589793, width: 8, floor: 18, x: 0, y: 65, z: 0, },
    ],
    'PROGRAM_03': [
        { time: 3000,count: 100, twist: 13.7340734641021, strengthTwist: 0.351, radius: 126, height: 52, rotate: -2.84159265358979, width: 10, floor: 17, x: 42, y: 69, z: 0, },
    ],
    'PROGRAM_04': [
        { time: 3000,count: 100, twist: -7.21592653589793, strengthTwist: 1, radius: 114, height: 40, rotate: 1.25840734641021, width: 10, floor: 17, x: 0, y: 113, z: 0, },
    ],
}
