/**
 * Created by Vasilii on 08.07.2020.
 */

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
        const fileList = this.files;
        callback(fileList[0])
    }

    input.addEventListener("change", handleFiles, false)
}