import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

type MaximizeCallback = (event: IpcRendererEvent, args: any[]) => void;

const API = {
  handleMax: (callback: MaximizeCallback) =>
    ipcRenderer.on("is-window-max:reply", callback),
  closeWindow: () => ipcRenderer.send("window-closed"),
  minimizeWindow: () => ipcRenderer.send("minimized"),
  maximizeWindow: () => ipcRenderer.send("maximized"),
};

contextBridge.exposeInMainWorld("api", API);
