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
};

/**
 * 跳转首页
 */
export const toHome = async (win = BrowserWindow.getFocusedWindow()) => {
  if (!win) return;
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
};

/**
 * 刷新页面
 */
export const reload = (win = BrowserWindow.getFocusedWindow()) => {
  win?.webContents.reload();
};

/**
 * 返回上一页
 */
export const goBack = (win = BrowserWindow.getFocusedWindow()) => {
  win?.webContents.goBack();
};

/**
 * 前进下一页
 */
export const forward = (win = BrowserWindow.getFocusedWindow()) => {
  win?.webContents.goForward();
};

/**
 * 窗口全屏
 * 全屏时隐藏菜单
 */
export const fullScreen = (win = BrowserWindow.getFocusedWindow()) => {
  if (!win) return;
  if (win.isFullScreen()) {
    win.setFullScreen(false);
    win.setMenuBarVisibility(true);
  } else {
    win.setFullScreen(true);
    win.setMenuBarVisibility(false);
  }
};

/**
 * 开发工具
 */
export const devTools = (win = BrowserWindow.getFocusedWindow()) => {
  if (!win) return;
  const web = win.webContents;
  if (web.isDevToolsOpened()) {
    web.closeDevTools();
  } else {
    web.openDevTools();
  }
};

/**
 * 帮助
 */
export const help = () => {
  dialog.showMessageBox({
    type: 'info',
    buttons: ['我知道了'],
    title: '帮助',
    message: ['帮助？', '有啥好帮的，看看就知道怎么用了'].join('\n'),
  });
};

/**
 * 确认退出对话框
 */
export const quitConfirm = async (win = BrowserWindow.getFocusedWindow()) => {
  if (!win) return;
  const { response } = await dialog.showMessageBox(win, {
    type: 'warning',
    buttons: ['确定', '取消'],
    title: '提示',
    message: '确定退出吗？',
  });
  if (response !== 0) return;
  app.exit();
};
