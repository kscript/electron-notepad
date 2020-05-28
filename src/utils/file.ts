import fs from 'fs'
import { mainWindow } from './'
const electron = require('electron')
const { remote: { dialog } } = electron
const openDirectory = (conf) => {
    return dialog.showOpenDialog({ properties: conf || ['openFile', 'openDirectory', 'multiSelections'] })
}
const openFile = (conf) => {
    return dialog.showOpenDialog({ properties: conf || ['openFile', 'multiSelections'] })
}
const readFile: () => Promise<string> = async () => {
    const { filePaths } = await openFile(['openFile'])
    return new Promise((resolve, reject) => {
        fs.readFile(filePaths[0], 'utf8', (err, data) => {
            err? reject(err) : resolve(data)
        })
    })
}
const setFilePath: () => Promise<Electron.SaveDialogReturnValue> = async () => {
    return dialog.showSaveDialog(await mainWindow(), {})
}
export default {
    fs,
    dialog,
    openFile,
    readFile,
    setFilePath,
    openDirectory
}
