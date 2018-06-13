// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const file = require('./components/file.js')
const menu = require('./components/menu.js')

module.exports = {
    file,
    menu 
}