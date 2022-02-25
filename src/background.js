'use strict'

import { app, protocol, BrowserWindow, ipcMain, nativeTheme } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
const { plugin } = require('electron-frameless-window-plugin')

const path =  require('path')

const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

const minSize = {width: 1280, height: 720}

async function createWindow() {
  // Create the browser window.
  nativeTheme.themeSource = 'dark'
  const win = new BrowserWindow({
    width: minSize.width,
    height: minSize.height,
    minWidth: minSize.width,
    minHeight: minSize.height,
    // titleBarStyle: 'hidden',
    frame: false,
    // transparent: true,
    resizable: true,
    maximizable: true,
    show: false,
    autoHideMenuBar: true,
    icon: path.join(__dirname, '../build/icons/icon.png'),
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      preload: path.join(__dirname, 'preload.js')
    },
  })


  win.once('ready-to-show', () => {
    win.show()
    win.focus()
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

if (process.platform === "linux") {
    app.commandLine.appendSwitch('enable-transparent-visuals')
    app.disableHardwareAcceleration()
}

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
  } else if (process.platform == "linux") {
    setTimeout(createWindow, 400)
  }
})

ipcMain.on('window-closed', () => {
  app.quit()
})

ipcMain.on('maximized', () => {
  const win = BrowserWindow.getFocusedWindow()
  if (win != null || win != undefined) {
    console.log(`---- Is-Maximized: ${win.isMaximized()} ----`)
    console.log(`---- Is-Maximizable: ${win.isMaximizable()} ----`)
    if (win.isMaximized()) {
      win.unmaximize()
    } else {
      win.maximize()
    }
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

plugin({
  setGlobal: true
}) // apply to each window
