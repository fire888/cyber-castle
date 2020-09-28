import * as THREE from 'three'



const SIZE = 1500
const TOP = 300
const BOTTOM = -70



export function createLevelBorder () {
    const geometry = new THREE.Geometry()
    geometry.vertices.push(
        new THREE.Vector3(-SIZE, BOTTOM, -SIZE), //0
        new THREE.Vector3(-SIZE, TOP, -SIZE), //1
        new THREE.Vector3(-SIZE, BOTTOM, SIZE), //2
        new THREE.Vector3(-SIZE, TOP, SIZE),//3

        new THREE.Vector3(SIZE, BOTTOM, -SIZE), //0
        new THREE.Vector3(SIZE, TOP, -SIZE), //1
        new THREE.Vector3(SIZE, BOTTOM, SIZE), //2
        new THREE.Vector3(SIZE, TOP, SIZE),//3
    )

    // left
    geometry.faces.push(new THREE.Face3(0, 1, 2))
    geometry.faces.push(new THREE.Face3(1, 3, 2))

    //right
    geometry.faces.push(new THREE.Face3(5, 4, 6))
    geometry.faces.push(new THREE.Face3(6, 7, 5))

    //back
    geometry.faces.push(new THREE.Face3(1, 0, 4))
    geometry.faces.push(new THREE.Face3(4, 5, 1))

    //front
    geometry.faces.push(new THREE.Face3(2, 3, 6))
    geometry.faces.push(new THREE.Face3(7, 6, 3))

    geometry.computeVertexNormals()
    geometry.computeBoundingSphere();

    return new THREE.Mesh(
        geometry,
        new THREE.MeshPhongMaterial({ color: 0xff0000, transparent: true, opacity: 0, })
    )
}

