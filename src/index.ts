import { app, BrowserWindow } from 'electron';
import { createIpcMain } from './create/ipcMain';
import { createGlobalShortcut } from './create/globalShortcut';
import { createApplicationMenu } from './create/applicationMenu';
import { createTray } from './create/tray';
import { createWindow } from './create/window';

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
  // 创建自定义菜单
  await createApplicationMenu();
  // 创建系统托盘
  await createTray();
  // 创建窗口
  await createWindow();

  /**
   * 激活应用
   */
  app.on('activate', async () => {
    // 当前窗口数量为0时，创建新的窗口
    if (BrowserWindow.getAllWindows().length === 0) {
      await createWindow();
    }
  });
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
