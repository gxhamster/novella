import { contextBridge, ipcRenderer } from "electron";

const API = {
  handleMax: (callback) => ipcRenderer.on("is-window-max:reply", callback),
  closeWindow: () => ipcRenderer.send("window-closed"),
  minimizeWindow: () => ipcRenderer.send("minimized"),
  maximizeWindow: () => ipcRenderer.send("maximized"),
};

contextBridge.exposeInMainWorld("api", API);
