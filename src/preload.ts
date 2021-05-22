import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

// --------------------------- 页面加载前执行操作 --------------------------- //
// 把 API 共享到渲染器进程
contextBridge.exposeInMainWorld('electron', {
  ipcRenderer,
  send: (channel: string, ...args: any[]) => {
    ipcRenderer.send(channel, ...args);
  },
  on: (channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) => {
    ipcRenderer.on(channel, listener);
  },
});
// --------------------------- 页面加载前执行操作 --------------------------- //

// --------------------------- 页面加载前引入操作 --------------------------- //
window.addEventListener('DOMNodeInserted', () => {});
// --------------------------- 页面加载前引入操作 --------------------------- //

// --------------------------- 页面加载后引入操作 --------------------------- //
window.addEventListener('DOMContentLoaded', () => {});
// --------------------------- 页面加载后引入操作 --------------------------- //

export default {};
