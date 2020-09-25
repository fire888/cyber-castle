export function createSystemTopWorld (mesh, emitter, addToScene) {
    emitter.subscribe('completeDialog')(data => {
        if (data.mesh.userData.terminalKey === 'TERMINAL_06') {
            addToScene(mesh)
        }
    })
}