// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// @ts-ignore
import * as Electron from 'Electron'

import file from './utils/file'
import { headMenu } from './utils/menu'

headMenu()

export default {
    file,
    headMenu
}