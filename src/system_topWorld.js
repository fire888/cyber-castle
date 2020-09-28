

export function createSystemTopWorld (mesh, emitter, addToScene) {
    emitter.subscribe('toggleDialog')(data => 
        data.mesh.userData.terminalKey === 'TERMINAL_06' && !data.isOpen && addToScene(mesh))
}

