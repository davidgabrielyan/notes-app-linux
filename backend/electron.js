const electron = require('electron');
const { ipcMain, nativeImage } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const fs = require('fs');
const uuid = require('uuid');

const BrowserWindow = electron.BrowserWindow;

const app = electron.app;

let mainWindow;

const userDataPath = (app || app.remote.app).getPath('userData');
const filePath = path.join(userDataPath, 'notes.txt');

async function createWindow() {
  let icon = nativeImage.createFromPath(`${__dirname}/../256x256.png`);
  mainWindow = new BrowserWindow({
    width: 1350,
    height: 800,
    icon,
    webPreferences: {
      nodeIntegration: true,
    }
  });

  mainWindow.loadURL(
    isDev ?
    'http://localhost:3000' :
    `file://${path.join(__dirname, '../build/index.html')}`
  );
  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});

ipcMain.handle('save-note', async (event, note) => {
  let exists = fs.existsSync(filePath);
  let id = uuid.v4();
  if (exists) {
    let data = fs.readFileSync(filePath);
    data = JSON.parse(data);
    if (note.id) {
      let index = data.findIndex(n => n.id == note.id);
      if (index === -1) return data;
      data[index] = { id: note.id, title: note.title, text: note.text };
    } else {
      data.push({ id, ...note });
    }
    fs.writeFileSync(filePath, JSON.stringify(data));
    return data;
  } else {
    let data = [{ id, ...note }];
    fs.writeFileSync(filePath, JSON.stringify(data));
    return data;
  }
});

ipcMain.handle('get-notes', async () => {
  let exists = fs.existsSync(filePath);
  if (exists) {
    let data = fs.readFileSync(filePath);
    return JSON.parse(data);
  } else {
    return [];
  }
});