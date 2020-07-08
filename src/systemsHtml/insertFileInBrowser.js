/**
 * Created by Vasilii on 08.07.2020.
 */

import * as THREE from 'three'
import 'three/examples/js/loaders/OBJLoader'

export const createInput = function (callback) {
    const input = document.createElement('input')
    input.type = 'file'
    input.id = 'input'
    input.style.position = 'absolute'
    input.style.zIndex = 100000;
    input.style.top = '0'
    input.style.left = '0'
    document.body.appendChild(input)

    function handleFiles() {
        const fileObject = this.files[0]
        var reader = new FileReader();
        reader.onload = function () {
            var loader = new THREE.OBJLoader();
            const mesh = loader.parse(this.result)
            callback({ level: mesh })
        };
        reader.readAsText(fileObject);
    }

    input.addEventListener("change", handleFiles, false)
}