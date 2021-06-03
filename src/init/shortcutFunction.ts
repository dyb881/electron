import { app, BrowserWindow, dialog } from 'electron';
import { browserWindowOptions, isDev, devUrl, localFile } from '../config';
import fetch from 'node-fetch';

/**
 * 创建窗口
 */
export const createWindow = async () => {
  // 创建一个窗口
  const win = new BrowserWindow(browserWindowOptions);
  // 跳转首页
  await toHome(win);
  return win;
};

/**
 * 创建窗口相关函数
 */
export const createWindowFun = <T extends any, R extends any>(fun: (win: BrowserWindow, options?: T) => R) => {
  return (options?: T) => {
    const win = BrowserWindow.getFocusedWindow();
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
  if (isDev) {
    // 检查地址是能够访问
    await fetch(devUrl)
      .then(() => {
        // 加载开发环境地址
        win.loadURL(devUrl);
      })
      .catch(() => {
        // 加载本地文件
        win.loadFile(localFile);
      });
  } else {
    // 加载本地文件
    win.loadFile(localFile);
  }
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
