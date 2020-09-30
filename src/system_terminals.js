import { createModelTerminal } from './component_modelTerminal'
import { TERMINALS_CONFIG, LAST_TERMINAL_CONFIG } from './constants_elements'



export function createSystemTerminals (model, emitter, addToScene, addItemToNearChecker) {
    const terminals = {}

    const createTerminal = config => {
        const terminal = createModelTerminal(model, config, emitter)
        terminals[config.terminalKey] = terminal
        addToScene(terminal.mesh)
        addItemToNearChecker(terminal.mesh)
    }

    for (let i = 0; i < TERMINALS_CONFIG.length; i ++) createTerminal(TERMINALS_CONFIG[i])

    emitter.subscribe('toggleTerminal')(data => {
        if (!terminals[data.terminalKey]) return;

        data.isOpen 
            ? terminals[data.terminalKey].startOpen()
            : terminals[data.terminalKey].startClose()
            
        data.terminalKey === 'TERMINAL_06' && !data.isOpen && createTerminal(LAST_TERMINAL_CONFIG)
    })
}

