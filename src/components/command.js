const {app, globalShortcut} = require('electron')
app.on('ready', () => {
    // Register a 'CommandOrControl+Y' shortcut listener.
    globalShortcut.register('F12', () => {
        // Do stuff when Y and either Command/Control is pressed.
    })
})