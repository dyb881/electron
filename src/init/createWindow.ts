import { BrowserWindow } from 'electron';
import { browserWindowOptions } from '../config';
import { toHome } from './shortcutFunction';

/**
 * 创建窗口
 */
export const createWindow = async () => {
  // 创建一个窗口
  const win = new BrowserWindow(browserWindowOptions);

  // 跳转首页
  await toHome(win);
};
