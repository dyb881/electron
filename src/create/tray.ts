import { Tray, Menu, app } from 'electron';
import { join } from 'path';

let appIcon;

/**
 * 创建系统托盘按钮
 */
export const createTray = async () => {
  appIcon = new Tray(join(__dirname, '../../src/images/icon.png'));

  const menu = Menu.buildFromTemplate([
    {
      label: '设置',
      click: function () {}, //打开相应页面
    },
    {
      label: '退出',
      click: () => app.quit(),
    },
  ]);

  appIcon.setToolTip('my best app');
  appIcon.setContextMenu(menu);
};
