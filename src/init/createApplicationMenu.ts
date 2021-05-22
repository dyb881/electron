import { app, Menu } from 'electron';
import { quitConfirm, toHome, reload, goBack, forward, devTools, fullScreen } from './shortcutFunction';

export const createApplicationMenu = async () => {
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      {
        label: app.getName(),
        submenu: [{ type: 'separator' }, { label: '完全退出', click: () => quitConfirm() }],
      },
      {
        label: '页面',
        submenu: [
          { label: '首页', accelerator: 'F1', click: () => toHome() },
          { type: 'separator' },
          { label: '上一页', accelerator: 'F2', click: () => goBack() },
          { label: '下一页', accelerator: 'F3', click: () => forward() },
          { type: 'separator' },
          { label: '刷新', accelerator: 'F5', click: () => reload() },
        ],
      },
      {
        label: '功能',
        submenu: [
          { label: '窗口全屏', accelerator: 'F11', click: () => fullScreen() },
          { label: '开发工具', accelerator: 'F12', click: () => devTools() },
        ],
      },
    ])
  );
};
