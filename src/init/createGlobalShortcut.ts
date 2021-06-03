import { app, globalShortcut } from 'electron';
import { toHome, goBack, forward, reload, fullScreen, devTools } from './shortcutFunction';

/**
 * 创建全局快捷键
 */
export const createGlobalShortcut = async () => {
  globalShortcut.register('F1', toHome);
  globalShortcut.register('F3', goBack);
  globalShortcut.register('F4', forward);
  globalShortcut.register('F5', reload);
  globalShortcut.register('F11', fullScreen);
  globalShortcut.register('F12', devTools);
  globalShortcut.register('ESC', () => fullScreen(true));
};

/**
 * 退出程序
 */
app.on('will-quit', () => {
  // 注销所有快捷键
  globalShortcut.unregisterAll();
});
