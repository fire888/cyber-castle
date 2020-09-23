import { createModelTerminal } from '../components/componentModelTerminal'
import {
    TERMINALS_CONFIG,
    LAST_TERMINAL_CONFIG
} from '../constants/elementsConfig'



export function createSystemTerminals (model, emitter, addToScene, addItemToNearChecker)
{
    const terminals = {}
    for (let i = 0; i < TERMINALS_CONFIG.length; i ++) {
        const terminal = createModelTerminal(model, TERMINALS_CONFIG[i], emitter)
        terminals[TERMINALS_CONFIG[i].keyProgram] = terminal
        addToScene(terminal.mesh)
        addItemToNearChecker(terminal.mesh)
    }

    emitter.subscribe('startDialog')(data => data.isOpen 
            ? terminals[data.mesh.userData.keyProgram].startOpen()
            : terminals[data.mesh.userData.keyProgram].startClose()
        )

    emitter.subscribe('completeDialog')(data => {
        terminals[data.mesh.userData.keyProgram].startClose()
        if (data.mesh.userData.keyProgram === 'PROGRAM_06') {
            const terminal = createModelTerminal(model, LAST_TERMINAL_CONFIG, emitter)
            terminals[LAST_TERMINAL_CONFIG.keyProgram] = terminal
            addToScene(terminal.mesh)
            addItemToNearChecker(terminal.mesh)
        }
    })
}
