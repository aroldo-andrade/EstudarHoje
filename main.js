const { app, BrowserWindow, ipcMain } = require('electron')


global.mainWindow
let devtoolWidth = 0//  rmeover apos o desenvolvimento
let x = 1000; // ajustar aqui onde vc quer que a tela apareça primeiro
let y = 400;
app.on('ready', () => {

    mainWindow = new BrowserWindow({
        width: 250 + devtoolWidth,
        height: 300,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            devTools: true
        },
        x, y,
        maximizable: false,
        resizable: false
    })
    mainWindow.loadFile('app/views/principal/principal.html')
    if (devtoolWidth > 0)
        mainWindow.webContents.openDevTools()

})
global.configuracaoWin = null
ipcMain.on('abrir-configuracao', () => {
    if (configuracaoWin == null) {
        configuracaoWin = new BrowserWindow({
            width: 250 + devtoolWidth,
            height: 300,
            frame: false,
            webPreferences: {
                nodeIntegration: true,
                devTools: true
            },
            alwaysOnTop: true,
            x, y,
            maximizable: false,
            resizable: false
        });
        configuracaoWin.on('closed', () => {
            configuracaoWin = null;
        })
    } else {
        configuracaoWin.focus()
    }
    configuracaoWin.loadFile(`app/views/configuracao/configuracao.html`);
    if (devtoolWidth > 0)
        configuracaoWin.webContents.openDevTools()


})

ipcMain.on('close-principal', event => {
    app.quit();
})
ipcMain.on('close-config', event => {
    configuracaoWin.close();
})