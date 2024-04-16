const { app, BrowserWindow, ipcMain } = require('electron/main');
const path = require('node:path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadURL('https://www.ndzy01.com/ndzy-docs/');

  win.webContents.openDevTools();

  // win.loadFile('index.html');
  // win.loadFile('index.html');

  ipcMain.on('toggleFullScreen', (event, arg) => {
    console.log(event, arg);
    win.setFullScreen(!win.isFullScreen());
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
