'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'

const path =  require('path')

const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

const minSize = {width: 1280, height: 720}

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: minSize.width,
    height: minSize.height,
    minWidth: minSize.width,
    minHeight: minSize.height,
    frame: false,
    transparent: true,
    resizable: false,
    autoHideMenuBar: true,
    icon: path.join(__dirname, '../build/icons/icon.png'),
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      preload: path.join(__dirname, 'preload.js')
    },
  })
  win.focus()

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on("resized", testFunc)

}

const testFunc = () => {
    console.log('resized')
}


if(process.platform === "linux") {
  app.commandLine.appendSwitch('enable-transparent-visuals');
  app.disableHardwareAcceleration();

  app.on('ready', () => setTimeout(createWindow, 400));
}


// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  if (process.platform == "win32") {
    createWindow()
  }
})


ipcMain.on('window-closed', () => {
  app.quit()
})

ipcMain.on('maximized', () => {
  const win = BrowserWindow.getFocusedWindow()
  if (win.isMaximizable()) {
    win.setResizable(true)
    win.maximize()
  } 
  if (win.isMaximized()) {
    win.unmaximize()
  }
})


ipcMain.on('minimized', () => {
  const win = BrowserWindow.getFocusedWindow()
  if (win != null || win != undefined)
    win.minimize()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }

}
