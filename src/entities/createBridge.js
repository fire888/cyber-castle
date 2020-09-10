import * as THREE from 'three'



export function createBridge (bridgeParams, emitter, materials)
{
    const geom = new THREE.BoxGeometry(3, 2, 3)
    const mesh = new THREE.Mesh(geom, materials.wall)
    mesh.name = 'roomBridge'

    emitter.subscribe('updateBridge')(data => updateMesh(data, mesh))
    updateMesh(bridgeParams, mesh)

    return {
        mesh,
    }
}



const updateMesh = (bridgeParams, mesh) =>
{
    const data = getData(bridgeParams)

    mesh.geometry.dispose()
    mesh.geometry = createGeom(data)
    mesh.geometry.needsUpdate = true

    mesh.rotation.y = data.rotate + (Math.PI/2 * (1 - data.strengthTwist))
    mesh.position.z = ((1 - data.strengthTwist) * data.radius) + data.distance / 2
    mesh.position.x = (1 - data.strengthTwist) * (-data.radius)
}



const createGeom = data =>
{
    const pointsPath = createPointsPath(data)
    const pointsCarcass = createPointsCarcass(pointsPath, data)
    const geom = createGeomFromPoints(pointsCarcass)

    return geom
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
function createPointsPath (data)
{
    const {
        count,
        twist,
        radius,
        height,
        strengthTwist,
        distance,
        offsetCenter
    } = data

    const points = []
    for (let i = 0; i < count; i ++) {
        const phase = i / count

        const d = distance * phase * (1 - strengthTwist)
        const twistPoint = twist * phase * strengthTwist
        const x = Math.sin(twistPoint) * radius + d
        const y = phase * height
        const z = Math.cos(twistPoint) * radius

        points.push({ x, y, z, twistPoint })
   }
   return points
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
function createPointsCarcass (points, data)
{
    const H = 17
    const W = data['width'] //W = 10

    const p = []
    for (let i = 0; i < points.length; i ++) {
        const { x, y , z, twistPoint } = points[i]

        const xW = Math.sin(twistPoint) * W
        const zW = Math.cos(twistPoint) * W

        p.push([
            [x + xW, y, z + zW],
            [x + xW, y + H, z + zW],
            [x - xW, y + H, z - zW],
            [x - xW, y, z - zW],
        ])
    }
    return p
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
const createGeomFromPoints = data =>
{
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



const getData = data =>
{
     const newData = {}
     for (let key in data) newData[key] = data[key].val
     return newData
}

