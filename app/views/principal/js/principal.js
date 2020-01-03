
const {ipcRenderer} = require('electron')
const dataHandler = require('../../../core/data.handler')
window.ELECTRON_DISABLE_SECURITY_WARNINGS = true


let diaSemana = new Date().getDay()
let diaDaSemanaImg = document.querySelector('.diaDaSemana')
let cogA = document.querySelector('.cog-a')
let closeA = document.querySelector('.close-a')
let content = document.querySelector('.content')
let assuntoH1 = document.querySelector('.assuntoH1')
let pathImgns = '../../res/imgs/$dia$.png'
diaSemana = 0
let enumDiasSemana = dataHandler.getEnumDiasSemana()

window.onload = () => {
    carregaAssunto()
}


cogA.addEventListener('click',()=>{
    ipcRenderer.send('abrir-configuracao')
})

closeA.addEventListener('click',()=>{
    ipcRenderer.send('close-principal')
})

carregaAssunto = () =>{
    dataHandler.pegaDados()
        .then((dados) => {
            let enumDia = enumDiasSemana.find(f => f.id == diaSemana)
            assuntoH1.innerHTML = dados[enumDia.dia]
        })
}

ipcRenderer.on('save-config',()=>{
    carregaAssunto();
})

switch (diaSemana) {
    case 0:
        diaDaSemanaImg.src = pathImgns.replace('$dia$', 'domingo')
        content.style.backgroundColor = '#025d08'
        break;
    case 1:
        diaDaSemanaImg.src = pathImgns.replace('$dia$', 'segunda')
        content.style.backgroundColor = '#6d0012'
        break;
    case 2:
        diaDaSemanaImg.src = pathImgns.replace('$dia$', 'terca')
        content.style.backgroundColor = '#b84900'
        break;
    case 3:
        diaDaSemanaImg.src = pathImgns.replace('$dia$', 'quarta')
        content.style.backgroundColor = '#ea6000'
        break;
    case 4:
        diaDaSemanaImg.src = pathImgns.replace('$dia$', 'quinta')
        content.style.backgroundColor = '#cbc200'
        break;
    case 5:
        diaDaSemanaImg.src = pathImgns.replace('$dia$', 'sexta')
        content.style.backgroundColor = '#92b915'
        break;
    case 6:
        diaDaSemanaImg.src = pathImgns.replace('$dia$', 'sabado')
        content.style.backgroundColor = '#07b70f'
        break;

    default:
        break;
}

