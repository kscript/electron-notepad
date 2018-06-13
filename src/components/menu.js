const file = require('./file.js')
const electron = require("electron")
const { app, remote, globalShortcut} = electron
let { Menu, MenuItem } = remote

!function () {
    const template = [
        {
            label: '编辑',
            submenu: [
                {
                    label: '打开文件',
                    accelerator: 'CommandOrControl + O',
                    click() {
                        var editor = document.getElementById('mainEditor')
                        file.readFile((err, data) => {
                            if (err === null && editor) {
                                editor.value = data
                            }
                        })
                    }
                },
                {
                    label: '另存为',
                    accelerator: 'Shift + CommandOrControl + S',
                    click() {
                        var editor = document.getElementById('mainEditor')
                        file.setFilePath(filename => {
                            file.fs.writeFile(filename, editor.value, function(){
                                console.log(arguments)
                            })
                        })
                    }
                },
                // { role: 'undo', label: '撤销' },
                // { role: 'redo', label: '恢复' },
                // { type: 'separator' },
                // { role: 'cut', label: '剪切' },
                // { role: 'copy', label: '复制' },
                // { role: 'paste', label: '粘贴' },
                // { role: 'pasteandmatchstyle', label: '粘贴(保留格式)' },
                // { role: 'delete', label: '删除' },
                // { role: 'selectall', label: '选择全部' }
            ]
        },
        {
            label: '查看',
            submenu: [
                { role: 'reload', label: '重载' },
                { role: 'forcereload', label: '硬性重载' },
                { role: 'toggledevtools', label: '开发者工具', accelerator: 'F12' },
                { type: 'separator' },
                { role: 'resetzoom', label: '重置' },
                { role: 'zoomin', label: '放大' },
                { role: 'zoomout', label: '缩小' },
                { type: 'separator' },
                { role: 'togglefullscreen', label: '全屏' }
            ]
        },
        {
            role: 'window',
            label: '桌面',
            submenu: [
                { role: 'minimize', label: '最小化' },
                { role: 'close', label: '关闭' },
                { role: 'quit', label: '退出' }
            ]
        },
        {
            role: 'help',
            label: '帮助',
            submenu: [
                {
                    // label: 'Learn More',
                    label: '学习更多..',
                    click() { require('electron').shell.openExternal('https://electronjs.org') }
                }
            ]
        }
    ]

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}()

const menu = new Menu()

menu.append(new MenuItem({ role: 'copy', label: '复制', click() { console.log(this, arguments) } }))
menu.append(new MenuItem({ role: 'cut', label: '剪切', click() { console.log(this, arguments) } }))
menu.append(new MenuItem({ role: 'paste', label: '粘贴', click() { console.log(this, arguments) } }))
menu.append(new MenuItem({ role: 'delete', label: '删除', click() { console.log(this, arguments) } }))
menu.append(new MenuItem({ type: 'separator' }))
menu.append(new MenuItem({ role: 'toggledevtools', label: '审查元素', click() { console.log(this, arguments) } }))
menu.append(new MenuItem({ role: 'reload', label: '刷新', click() { console.log(this, arguments) } }))
menu.append(new MenuItem({ role: 'quit', label: '退出', click() { console.log(this, arguments) } }))

window.addEventListener('contextmenu', (e) => {
e.preventDefault()
menu.popup({ window: remote.getCurrentWindow() })
}, false)

// app.on('ready', () => {
//     // Register a 'CommandOrControl+Y' shortcut listener.
//     globalShortcut.register('CommandOrControl+Y', () => {
//         // Do stuff when Y and either Command/Control is pressed.
//     })
// })

module.exports = {
    menu
}
