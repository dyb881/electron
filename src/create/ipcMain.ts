import { ipcMain } from 'electron';
import {
  selectFolder,
  readFolder,
  parsingProjects,
  topProject,
  deleteProject,
  getApp,
  getTerminal,
} from '../funs/projectSet';
import { exec } from 'child_process';

/**
 * 注册主进程IPC模块监听
 */
export const createIpcMain = async () => {
  // 页面准备
  ipcMain.on('page-ready', async (event) => {
    event.sender.send('loading', true);
    const projects = await parsingProjects();
    event.sender.send('loading', false);
    // 发送消息到主进程
    event.sender.send('show-projects', projects);
  });

  // 点击添加
  ipcMain.on('add', async (event) => {
    const filePaths = await selectFolder();
    if (!filePaths) return;
    event.sender.send('loading', true);
    const projects = await readFolder(filePaths);
    event.sender.send('loading', false);
    // 发送消息到主进程
    projects && event.sender.send('show-projects', projects);
  });

  ipcMain.on('folder', async (event, arg) => {
    exec(`open ${arg}`);
    const projects = await topProject(arg);
    // 发送消息到主进程
    projects && event.sender.send('show-projects', projects);
  });

  ipcMain.on('terminal', async (event, path) => {
    const terminal = await getTerminal();
    exec(`open ${path} -a ${terminal}`);
    const projects = await topProject(path);
    // 发送消息到主进程
    projects && event.sender.send('show-projects', projects);
  });

  ipcMain.on('code', async (event, path) => {
    const app = await getApp();
    exec(`open ${path} -a ${app}`);
    const projects = await topProject(path);
    // 发送消息到主进程
    projects && event.sender.send('show-projects', projects);
  });

  ipcMain.on('delete', async (event, arg) => {
    const projects = await deleteProject(arg);
    // 发送消息到主进程
    projects && event.sender.send('show-projects', projects);
  });
};
