import { BrowserWindow, BrowserWindowConstructorOptions, globalShortcut } from 'electron';
import { toHome } from '../funs/shortcut';
import { browserWindowOptions } from '../config';

let win: BrowserWindow;

/**
 * 创建窗口
 */
export const createWindow = async (options?: BrowserWindowConstructorOptions) => {
  // 创建一个窗口
  win = new BrowserWindow({ ...browserWindowOptions, ...options });

  win.on('focus', () => {
    globalShortcut.register('esc', () => {
      win.hide();
    });
  });

  win.on('blur', () => {
    win.hide();
    globalShortcut.unregister('esc');
  });

  // 确保窗口创建完成
  await new Promise((r) => setTimeout(r));

  // 跳转首页
  await toHome(win);

  return win;
};
