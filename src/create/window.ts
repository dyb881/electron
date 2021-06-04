import { BrowserWindow } from 'electron';
import { toHome } from '../funs/shortcut';
import { browserWindowOptions } from '../config';

/**
 * 创建窗口
 */
export const createWindow = async () => {
  // 创建一个窗口
  const win = new BrowserWindow(browserWindowOptions);

  // 确保窗口创建完成
  await new Promise((r) => setTimeout(r));

  // 跳转首页
  await toHome(win);

  return win;
};
