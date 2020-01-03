const { app,BrowserWindow, ipcMain } = require('electron')


let mainWindow
let devtoolWidth = 0//  rmeover apos o desenvolvimento
app.on('ready',()=>{

    mainWindow = new BrowserWindow({
        width:250+devtoolWidth, 
        height:300,
        frame:false,
        webPreferences:{
            nodeIntegration:true,
            devTools:true
        },
        x:1100, // ajustar aqui onde vc quer que a tela apareça primeiro
        y:400,
        maximizable:false,
        resizable:false
    })
    mainWindow.loadFile('app/views/principal/principal.html')
    if(devtoolWidth>0)
     mainWindow.webContents.openDevTools()

})
let configuracaoWin = null
ipcMain.on('abrir-configuracao',()=>{
    if(configuracaoWin == null){
        configuracaoWin = new BrowserWindow({
            width:250+devtoolWidth, 
            height:300,
            frame:false,
            webPreferences:{
                nodeIntegration:true,
                devTools:true
            },
            alwaysOnTop:true,
            x:1500, // ajudar aqui onde vc quer que a tela apareça primeiro
            y:300,
            maximizable:false,
            resizable:false
        });
        configuracaoWin.on('closed', () => {
            configuracaoWin = null;
        })
    }else{
        configuracaoWin.focus()
    }
    configuracaoWin.loadFile(`app/views/configuracao/configuracao.html`);
    if(devtoolWidth>0)
    configuracaoWin.webContents.openDevTools()


})

ipcMain.on('close-principal',event=>{
    app.quit();
})
ipcMain.on('close-config',event=>{
    configuracaoWin.close();
})