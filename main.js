const { app,BrowserWindow } = require('electron')


let mainWindow
let devtoolWidth = 373
app.on('ready',()=>{

    mainWindow = new BrowserWindow({
        width:250+devtoolWidth, 
        height:300,
        frame:false,
        webPreferences:{
            nodeIntegration:true,
            devTools:true
        },
        x:1500, // ajudar aqui onde vc quer que a tela apareça primeiro
        y:300
    })
    mainWindow.loadFile('app/views/principal/principal.html')
     mainWindow.webContents.openDevTools()

})

