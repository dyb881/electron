import { app, BrowserWindow } from 'electron';
import { createGlobalShortcut } from './init/createGlobalShortcut';
import { createWindow } from './init/createWindow';
import { createIpcMain } from './init/createIpcMain';
import { createApplicationMenu } from './init/createApplicationMenu';

/**
 * 是否开发环境
 */
export const isDev = require('electron-is-dev');

// 安装时、更新完成时、卸载时
if (require('electron-squirrel-startup')) {
  // 退出程序;
  app.quit();
}

/**
 * Electron 初始化
 * 某些API仅在此事件发生后才能使用。
 */
app.on('ready', async () => {
  // 注册主进程IPC模块事件
  await createIpcMain();
  // 创建全局快捷键
  await createGlobalShortcut();
  // 创建菜单
  await createApplicationMenu();
  // 创建窗口
  await createWindow();
});

/**
 * 激活应用
 */
app.on('activate', () => {
  // 当前窗口数量为0时，创建新的窗口
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

/**
 * 关闭所有窗口时
 */
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    // 退出程序
    app.quit();
  }
});
