

const { 
    app,
    BrowserWindow,
    ipcMain
} = require('electron');
const data = require('./data');

let mainWindow = null;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
            nodeIntegration: true
        },
    });

    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

app.on('window-all-closed', () => app.quit());

let sobreWindow = null;

ipcMain.on('abrir-janela-sobre', () => {
    if (!sobreWindow) {
        sobreWindow = new BrowserWindow({
            width: 300,
            height: 230,
            alwaysOnTop: true,
            frame: false,
            resizable: false,
            webPreferences: {
                nodeIntegration: true
            },
        });
        sobreWindow.loadURL(`file://${__dirname}/app/sobre.html`);
        sobreWindow.on('closed', () => {
            sobreWindow = null;
        })
    }
});
ipcMain.on('fechar-janela-sobre', () => sobreWindow.close());


ipcMain.on('curso-parado', (event, curso, tempoEstudo) => {
    console.log(curso, tempoEstudo);
    data.salvarDados(curso, tempoEstudo);
});
