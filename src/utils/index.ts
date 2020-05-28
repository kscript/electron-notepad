const electron = require('electron')
const { remote, ipcRenderer } = electron
let _mainWindow
export const mainWindow: () => Promise<Electron.BrowserWindow> = async () => {
    return _mainWindow || new Promise((resolve) => {
        ipcRenderer.send('mainWindow')
        ipcRenderer.on('mainWindow-reply', async (event, mainWindow: Electron.BrowserWindow) => {
            resolve(_mainWindow = mainWindow)
        })
    })
}
export default {
    mainWindow
}