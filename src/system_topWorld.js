

export function createSystemTopWorld (mesh, emitter, addToScene) {
    emitter.subscribe('toggleTerminal')(data =>
    data.terminalKey === 'TERMINAL_06' && !data.isOpen && addToScene(mesh))
}

