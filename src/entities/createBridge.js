import * as THREE from 'three'



export function createBridge (bridgeParams, emitter, materials) {
    let geom = createGeom(bridgeParams)
    const mat = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    const mesh = new THREE.Mesh(geom, materials.wall)
    mesh.name = 'roomBridge'

    const updateGeom = data => {
        mesh.geometry.dispose()
        mesh.geometry = createGeom(data)
        mesh.geometry.needsUpdate = true
    }
    emitter.subscribe('updateBridge')(updateGeom)

    return {
        mesh,
    }
}


const createGeom = data => {
    const pointsPath = createPointsPath(data)
    const pointsCarcass = createPointsCarcass(pointsPath, data)
    const geom = createGeomFromPoints(pointsCarcass)

    return geom
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


const createGeomFromPoints = data => {
   const points = data

    
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


function createPointsCarcass (points, data) {
    const H = 17
    const W = data['width'].val //W = 10

    const p = []
    for (let i = 0; i < points.length; i ++) {
        const { x, y , z, rotation } = points[i]

        const xW = Math.sin(rotation) * W
        const zW = Math.cos(rotation) * W

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




 function createPointsPath (data) {
     const { count, angle, radius, height, strengthAngle, distance } = getData(data)


    const points = []
    for (let i = 0; i < count; i ++) {
        const phase = i / count

        const d = distance * phase * (1 - strengthAngle)
        const rotation = angle * phase * strengthAngle
        const x = Math.sin(rotation) * radius + d
        const y = phase * height
        const z = Math.cos(rotation) * radius

        points.push({ x, y, z, rotation })
    }
    return points
 }



 const getData = data => {
     const newData = {}
     for (let key in data) {
         newData[key] = data[key].val
     }
     return newData
 }


/*
function createPointsPath (data) {
    const COUNT = data.count.val // || 20
    const ROT = data.angle.val // || Math.PI / 5
    const RADIUS = data.radius.val // || 100
    const HEIGHT = data.height.val // || 30

    const points = []
    for (let i = -COUNT; i < COUNT; i ++) {
        const phase = i / COUNT 

        const offsetCenter = phase * RADIUS     
        const rotation = phase * ROT * Math.sign(i)
        const x = Math.sin(rotation) * offsetCenter
        const y = Math.sin(phase) * HEIGHT 
        const z = Math.cos(rotation) * offsetCenter

        points.push({ x, y, z, rotation }) 
    }
    return points
}*/
































/** TRESH *************************************************

 */


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

 /*
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
 */


