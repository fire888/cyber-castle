import * as THREE from 'three'
import { createModelTerminal } from '../components/componentModelTerminal'



export function createSystemControllers (config, model, emitter, arrActionsMesh)
{
    const terminals = {}
    for (let i = 0; i < config.length; i ++) {
        const terminal = createModelTerminal(model, config[i], emitter)
        terminals[config[i].keyProgram] = terminal
        arrActionsMesh.forEach(item => item(terminal.mesh))
    }

    emitter.subscribe('startDialog')(data => data.isOpen 
            ? terminals[data.mesh.userData.keyProgram].startOpen()
            : terminals[data.mesh.userData.keyProgram].startClose()
        )
}
