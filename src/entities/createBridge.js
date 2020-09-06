import * as THREE from 'three'



export function createBridge (bridgeParams, emitter) {
    let geom = createGeomEasy(bridgeParams)
    const mat = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    const mesh = new THREE.Mesh(geom, mat)
    mesh.name = 'roomBridge'

    //mesh.rotation.x = 2

    const updateGeom = data => {
        mesh.geometry.dispose()
        mesh.geometry = createGeomEasy(data)
        mesh.geometry.needsUpdate = true
    }
    emitter.subscribe('updateBridge')(updateGeom)

    return {
        mesh,
    }
}


/**
 *       p[i-1][2]                p[i][2]
 *            *--------------- *
 *           /|               /|
 * p[i-1][1]/ |      p[i][2] / |    
 *         *----------------*  |
 *         |  * ------------|--* p[i][3]
 *         | / p[i-1][3]    | / 
 *         |/               |/
 *         *----------------*
 *     p[i-1][0]              p[i][0]
 */

function createGeom (data) {
    const points = createPoints(data)
    
    var p = []
    for (let i = 1; i < points.length; i ++) {
        p.push(
            // left
            points[i-1][1][0], points[i-1][1][1], points[i-1][1][2],
            points[i][1][0], points[i][1][1], points[i][1][2],
            points[i][0][0], points[i][0][1], points[i][0][2],

            points[i-1][0][0], points[i-1][0][1], points[i-1][0][2],
            points[i][1][0], points[i][1][1], points[i-1][1][2],
            points[i][0][0], points[i][0][1], points[i][0][2],
            

            // top
            points[i-1][2][0], points[i-1][2][1], points[i-1][2][2],
            points[i][2][0], points[i][2][1], points[i][2][2],
            points[i][1][0], points[i][1][1], points[i][1][2],

            points[i-1][2][0], points[i-1][2][1], points[i-1][2][2],
            points[i][1][0], points[i][1][1], points[i][1][2],
            points[i-1][1][0], points[i-1][1][1], points[i-1][1][2],

            // rigt
            points[i-1][2][0], points[i-1][2][1], points[i-1][2][2],
            points[i][3][0], points[i][3][1], points[i][3][2],
            points[i][2][0], points[i][2][1], points[i][2][2],

            points[i-1][2][0], points[i-1][2][1], points[i-1][2][2],
            points[i-1][3][0], points[i-1][3][1], points[i-1][3][2],
            points[i][3][0], points[i][3][1], points[i][3][2],

            // bottom
            points[i-1][0][0], points[i-1][0][1], points[i-1][0][2],
            points[i][0][0], points[i][0][1], points[i][0][2],
            points[i-1][3][0], points[i-1][3][1], points[i-1][3][2],

            points[i-1][3][0], points[i-1][3][1], points[i-1][3][2],
            points[i][0][0], points[i][0][1], points[i][0][2],
            points[i][3][0], points[i][3][1], points[i][3][2],
        )
    }

    const vertices = Float32Array.from(p)
    var geometry = new THREE.BufferGeometry();
    geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    geometry.computeVertexNormals()
    return geometry
}


/**
 *       p[i-2][2]                 p[i-1][2]         p[i][2]
 *            *--------------------*------------ *
 *           /|                  / |            /|
 * p[i-2][1]/ |      p[i-1][1]  /  |   p[i][2] / |    
 *         *-------------------*--------------*  |
 *         |  * ---------------|---*----------|-* p[i][3]
 *         | / p[i-2][3]       |  /           | / 
 *         |/                  | /            |/
 *         *-------------------*--------------*
 *     p[i-2][0]               p[i-1][0]       p[i][0]
 * 
 * 
 * 
 * @param {object} data 
 */


const createGeomEasy = data => {
   const points = createPoints(data)
    
   var geometry = new THREE.Geometry()
   for (let i = 1; i < points.length - 1; i += 2) {
       geometry.vertices.push(
           new THREE.Vector3(points[i-1][0][0], points[i-1][0][1], points[i-1][0][2]),
           new THREE.Vector3(points[i-1][1][0], points[i-1][1][1], points[i-1][1][2]),
           new THREE.Vector3(points[i-1][2][0], points[i-1][2][1], points[i-1][2][2]),
           new THREE.Vector3(points[i-1][3][0], points[i-1][3][1], points[i-1][3][2]),

           new THREE.Vector3(points[i][0][0], points[i][0][1], points[i][0][2]),
           new THREE.Vector3(points[i][1][0], points[i][1][1], points[i][1][2]),
           new THREE.Vector3(points[i][2][0], points[i][2][1], points[i][2][2]),
           new THREE.Vector3(points[i][3][0], points[i][3][1], points[i][3][2]),
       )

       geometry.faces.push(new THREE.Face3((i - 1) * 4, (i - 1) * 4 + 1, i * 4))
       geometry.faces.push(new THREE.Face3((i - 1) * 4 + 1, i * 4 + 1, i * 4))

       geometry.faces.push(new THREE.Face3((i - 1) * 4 + 1, (i - 1) * 4 + 2, i * 4 + 1))
       geometry.faces.push(new THREE.Face3((i - 1) * 4 + 2, i * 4 + 2, i * 4 + 1))

       geometry.faces.push(new THREE.Face3((i - 1) * 4 + 2, (i - 1) * 4 + 3, i * 4 + 2))
       geometry.faces.push(new THREE.Face3((i - 1) * 4 + 3, i * 4 + 3, i * 4 + 2))

       geometry.faces.push(new THREE.Face3((i - 1) * 4 + 3, (i - 1) * 4, i * 4 + 3))
       geometry.faces.push(new THREE.Face3((i - 1) * 4, i * 4, i * 4 + 3))

       if (i < points.length - 4) { 
            geometry.faces.push(new THREE.Face3(i * 4 + 3, i * 4, (i + 1) * 4 + 3))
            geometry.faces.push(new THREE.Face3(i * 4, (i + 1) * 4, (i + 1) * 4 + 3))
       }
   }
   geometry.computeVertexNormals()
   geometry.computeBoundingSphere();

   return geometry
} 



/**
 *           *--------* 
 *          /        /
 *         *---*----*
 *             | 
 *           *-|-----* 
 *          /  |    /
 *         *---*---*
 *             | 
 *           *-|------*
 *          /  |    /
 *         *---*---*
 */


function createPoints (data) {
    const H = 17
    const W = 10

    const points = createPath(data)
    const p = []
    for (let i = 0; i < points.length; i ++) {
        const { x, y , z, rotation } = points[i]

        const xW = Math.cos(-rotation) * W
        const zW = Math.sin(-rotation) * W

        p.push([
            [x + xW, y, z + zW],
            [x + xW, y + H, z + zW],
            [x - xW, y + H, z - zW],
            [x - xW, y, z - zW],
        ])
    }
    return p;
}




/**
 *         *
 *         |
 *         |
 *         *
 *         |
 *         |
 *         *
 */

function createPath (data) {
    const COUNT = data.count.val // || 20
    const ROT = data.angle.val // || Math.PI / 5
    const RADIUS = data.radius.val // || 100
    const HEIGHT = data.height.val // || 30

    const points = []
    for (let i = -COUNT; i < COUNT; i ++) {
        const phase = i / COUNT 

        const offsetCenter = phase * RADIUS        
        const rotation = phase * ROT
        const x = Math.sin(rotation) * offsetCenter
        const y = Math.sin(phase) * HEIGHT 
        const z = Math.cos(rotation) * offsetCenter

        points.push({ x, y, z, rotation }) 
    }
    return points
}


