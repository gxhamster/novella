import { contextBridge, ipcRenderer } from 'electron'
const { cpus, totalmem } = require('os')

const API = {
  cpus: cpus(),
  closeWindow: () => ipcRenderer.send('window-closed'),
  minimizeWindow: () => ipcRenderer.send('minimized'),
  maximizeWindow: () => ipcRenderer.send('maximized')
}

contextBridge.exposeInMainWorld("api", API)