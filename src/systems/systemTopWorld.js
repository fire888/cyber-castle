/**
 * Created by Vasilii on 23.09.2020.
 */


export function createSystemTopWorld (mesh, emitter, addToScene) {
    emitter.subscribe('completeDialog')(data => {
        if (data.mesh.userData.keyProgram === 'PROGRAM_06') {
            addToScene(mesh)
        }
    })
}