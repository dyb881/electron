import { app, globalShortcut } from 'electron';
import { inputFocus } from '../funs/shortcut';

/**
 * 创建全局快捷键
 */
export const createGlobalShortcut = async () => {
  // globalShortcut.register('F12', () => devTools());
  globalShortcut.register('alt+z', inputFocus);
};

/**
 * 退出程序
 */
app.on('will-quit', () => {
  // 注销所有快捷键
  globalShortcut.unregisterAll();
});
