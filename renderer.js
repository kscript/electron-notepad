// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const file = require('./src/components/file.js')
const menu = require('./src/components/menu.js')

module.exports = {
    file,
    menu 
}