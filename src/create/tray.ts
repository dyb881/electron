import { Tray, Menu, app, BrowserWindow } from 'electron';
import { join } from 'path';
import { menuAddFolder, menuEmptyProjects, menuSortProjects, getApp, getTerminal } from '../funs/projectSet';

let tray: Tray;

/**
 * 创建系统托盘按钮
 */
export const createTray = async (win: BrowserWindow) => {
  tray = new Tray(join(__dirname, '../../src/images/icon.png'));

  const menu = Menu.buildFromTemplate([
    {
      label: '选择IDE',
      click: () => getApp(true),
    },
    {
      label: '选择终端',
      click: () => getTerminal(true),
    },
    {
      label: '添加文件夹',
      click: menuAddFolder,
    },
    {
      label: '清空列表',
      click: menuEmptyProjects,
    },
    {
      label: '清空排序',
      click: menuSortProjects,
    },
    { type: 'separator' },
    {
      label: '退出',
      click: () => app.quit(),
    },
  ]);

  tray.setToolTip(app.getName());

  tray.on('right-click', () => {
    tray.popUpContextMenu(menu);
  });

  tray.on('click', async (_event, bounds) => {
    const [width] = win.getSize();
    win.setPosition(bounds.x - (width - bounds.width) / 2, bounds.height, true);
    win.show();
  });
};
