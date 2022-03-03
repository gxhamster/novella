import { contextBridge, ipcRenderer, BrowserWindow } from 'electron'

const API = {
  max: false,
  closeWindow: () => ipcRenderer.send('window-closed'),
  minimizeWindow: () => ipcRenderer.send('minimized'),
  maximizeWindow: () => ipcRenderer.send('maximized')
}

// Reply events
ipcRenderer.on('is-window-max:reply', (event, arg) => {
  API.max = arg
})

contextBridge.exposeInMainWorld("api", API)
