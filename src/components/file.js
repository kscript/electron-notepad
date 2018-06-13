const fs = require("fs")
const electron = require("electron")

const remote = electron.remote

const dialog = remote.dialog
function openDirectory(conf) {
    return dialog.showOpenDialog({ properties: conf || ['openFile', 'openDirectory', 'multiSelections'] })
}
function openFile(conf) {
    return dialog.showOpenDialog({ properties: conf || ['openFile', 'multiSelections'] })
}
function readFile(then) {
    var path = openFile(['openFile'])
    return fs.readFile(path[0], 'utf8', then || function (err, data) {
        return data
    });
}
function setFilePath(then) {
    return dialog.showSaveDialog({}, then)
}
module.exports = {
    fs,
    dialog,
    openFile,
    readFile,
    setFilePath,
    // saveFile,
    openDirectory
}
