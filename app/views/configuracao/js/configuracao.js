const {ipcRenderer,remote} = require('electron')
const data = require('../../../core/data.handler')

window.ELECTRON_DISABLE_SECURITY_WARNINGS = true

let closeA = document.querySelector('.close-a')
let btnSalvar = document.querySelector('.btnSalvar')
let segundaInput = document.querySelector('.segundaInput')
let tercaInput = document.querySelector('.tercaInput')
let quartaInput = document.querySelector('.quartaInput')
let quintaInput = document.querySelector('.quintaInput')
let sextaInput = document.querySelector('.sextaInput')
let sabadoInput = document.querySelector('.sabadoInput')
let domingoInput = document.querySelector('.domingoInput')
let principal = remote.getGlobal('mainWindow')

closeA.addEventListener('click',()=>{
    ipcRenderer.send('close-config')
})

window.onload = () => {
    data.pegaDados()
        .then((dados) => {
            segundaInput.value = dados.segunda
            tercaInput.value = dados.terca
            quartaInput.value = dados.quarta
            quintaInput.value = dados.quinta
            sextaInput.value = dados.sexta
            sabadoInput.value = dados.sabado
            domingoInput.value = dados.domingo
        })
}

btnSalvar.addEventListener('click',()=>{
    let database = {
        segunda: segundaInput.value,
        terca: tercaInput.value,
        quarta: quartaInput.value,
        quinta: quintaInput.value,
        sexta: sextaInput.value,
        sabado: sabadoInput.value,
        domingo: domingoInput.value
    }
    data.salvaDados(database,()=>{
        principal.webContents.send('save-config')
        ipcRenderer.send('close-config')
        
    })

})



