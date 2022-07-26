import { BrowserWindow } from 'electron';
import { toHome } from '../funs/shortcut';
import { browserWindowOptions } from '../config';

let wins: BrowserWindow[] = [];

/**
 * 创建窗口
 */
export const createWindow = async () => {
  // 创建一个窗口
  const win = new BrowserWindow(browserWindowOptions);

  // 记录到内存
  wins.push(win);
  // 关闭窗口
  win.on('closed', () => {
    // 销毁对象
    const index = wins.indexOf(win);
    wins.splice(index, 1);
  });

  // 确保窗口创建完成
  await new Promise((r) => setTimeout(r));

  // 跳转首页
  await toHome(win);

  return win;
};
