import { app, globalShortcut } from 'electron';
import { toHome, goBack, forward, reload, fullScreen, devTools } from './shortcutFunction';

/**
 * 创建全局快捷键
 */
export const createGlobalShortcut = async () => {
  globalShortcut.register('F1', toHome);
  globalShortcut.register('F2', goBack);
  globalShortcut.register('F3', forward);
  globalShortcut.register('F5', reload);
  globalShortcut.register('F11', fullScreen);
  globalShortcut.register('F12', devTools);
};

/**
 * 退出程序
 */
app.on('will-quit', () => {
  // 注销所有快捷键
  globalShortcut.unregisterAll();
});
