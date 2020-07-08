import '../assets/start-img.png'
import '../assets/progress-img.png'

import levelSrc from '../assets/level.obj'
import levelRaySrc from '../assets/level-ray.obj'
import monster from '../assets/monster-head.obj'
import wallSrc from '../assets/wall.jpg'
import doorSrc from '../assets/door.jpg'
import botSkin from '../assets/bot-skin.jpg'

import monsterMap from '../assets/monster-skin.jpg'
import monsterAnimSrc from '../assets/monster-animate3.glb'


export const assetsToLoad = [
    {
        type: 'obj',
        filename: levelSrc,
        key: 'level'
    },
    {
        type: 'img',
        filename: wallSrc,
        key: 'wall-map'
    }, 
    //{
    //    type: 'obj',
    //    filename: levelRaySrc,
    //    key: 'levelCollisions'
    //},
    //{
    //    type: 'obj',
    //    filename: monster,
    //    key: 'monster'
    //},
    //{
    //    type: 'glb',
    //    filename: monsterAnimSrc,
    //    key: 'monsterAnim'
    //}, 
    //{
    //   type: 'glb',
    //    filename: monsterAnimSrc,
    //    key: 'monsterAnim2'
    //},
    //{
    //    type: 'img',
    //    filename: botSkin,
    //    key: 'bot-skin'
    //},
    //{
    //    type: 'img',
    //    filename: monsterMap,
    //    key: 'monster-skin'
    //},
    //{
    //    type: 'img',
    //    filename: doorSrc,
    //    key: 'doorTexture'
    //},
]

