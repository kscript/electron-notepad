import file from './file'
const electron = require('electron')

const { remote: { Menu } } = electron
const editor = document.getElementById('mainEditor') as HTMLTextAreaElement
export const headMenu = (merge?: (template: Electron.MenuItemConstructorOptions[]) => Electron.MenuItemConstructorOptions[]) => {
    const template: Electron.MenuItemConstructorOptions[] = [
        {
            label: '编辑',
            submenu: [
                {
                    label: '打开文件',
                    accelerator: 'CommandOrControl + O',
                    async click() {
                        try {
                            if (editor) {
                                editor.value = await file.readFile()
                            }
                        } catch(e) {
                            
                        }
                    }
                },
                {
                    label: '另存为',
                    accelerator: 'Shift + CommandOrControl + S',
                    async click() {
                        const { canceled, filePath } = await file.setFilePath()
                        filePath && file.fs.writeFile(filePath, editor.value, () => {})
                    }
                }
            ]
        },
        {
            label: '查看',
            submenu: [
                { role: 'reload', label: '重载' },
                { role: 'forceReload', label: '硬性重载' },
                { role: 'toggleDevTools', label: '开发者工具', accelerator: 'F12' },
                { type: 'separator' },
                { role: 'resetZoom', label: '重置' },
                { role: 'zoomIn', label: '放大' },
                { role: 'zoomOut', label: '缩小' },
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
    const menu = Menu.buildFromTemplate(merge ? merge(template) : template)
    Menu.setApplicationMenu(menu)
    return Menu
}

export default {
    headMenu
}