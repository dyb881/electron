import { app } from 'electron';
import { createIpcMain } from './create/ipcMain';
import { createGlobalShortcut } from './create/globalShortcut';
import { createTray } from './create/tray';
import { createWindow } from './create/window';

// 安装时、更新完成时、卸载时
if (require('electron-squirrel-startup')) {
  // 退出程序;
  app.quit();
}

app.setActivationPolicy('accessory');

/**
 * Electron 初始化
 * 某些API仅在此事件发生后才能使用。
 */
app.on('ready', async () => {
  // 注册主进程IPC模块事件
  await createIpcMain();
  // 创建快捷键
  await createGlobalShortcut();
  // 创建窗口
  const win = await createWindow();
  // 创建系统托盘
  await createTray(win);
});
