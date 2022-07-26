import { app, BrowserWindow, dialog, screen } from 'electron';
import { localFile } from '../config';

/**
 * 创建窗口相关函数
 */
export const createWindowFun = <T extends any, R extends any>(fun: (win: BrowserWindow, options?: T) => R) => {
  return (options?: T, win = BrowserWindow.getFocusedWindow()) => {
    if (!win) return;
    return fun(win, options);
  };
};

// 别名
const cwf = createWindowFun;

/**
 * 跳转首页
 */
export const toHome = cwf(async (win) => {
  // 加载本地文件
  win.loadFile(localFile);
});

/**
 * 刷新页面
 */
export const reload = cwf((win) => {
  win.webContents.reload();
});

/**
 * 返回上一页
 */
export const goBack = cwf((win) => {
  win.webContents.goBack();
});

/**
 * 前进下一页
 */
export const forward = cwf((win) => {
  win.webContents.goForward();
});

/**
 * 窗口全屏
 * 全屏时隐藏菜单
 */
export const fullScreen = cwf((win, isFullScreen?: boolean) => {
  if (isFullScreen ?? win.isFullScreen()) {
    win.setFullScreen(false);
    win.setMenuBarVisibility(true);
  } else {
    win.setFullScreen(true);
    win.setMenuBarVisibility(false);
  }
});

/**
 * 开发工具
 */
export const devTools = cwf((win) => {
  const web = win.webContents;
  if (web.isDevToolsOpened()) {
    web.closeDevTools();
  } else {
    web.openDevTools();
  }
});

/**
 * 帮助
 */
export const help = cwf((win) => {
  return dialog.showMessageBox(win, {
    type: 'info',
    buttons: ['我知道了'],
    title: '帮助',
    message: ['帮助？', '有啥好帮的，看看就知道怎么用了'].join('\n'),
  });
});

/**
 * 确认退出对话框
 */
export const quitConfirm = cwf(async (win) => {
  const { response } = await dialog.showMessageBox(win, {
    type: 'warning',
    buttons: ['确定', '取消'],
    title: '提示',
    message: '确定退出吗？',
  });
  response === 0 && app.exit();
});

/**
 * 聚焦
 */
export const inputFocus = () => {
  const [win] = BrowserWindow.getAllWindows();
  const { x, y } = screen.getCursorScreenPoint();
  const [width] = win.getSize();
  win.setPosition(x - width / 2, y - 47);
  win.show();
  win.webContents.send('input-focus');
};
