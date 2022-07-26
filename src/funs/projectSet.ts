import { dialog, BrowserWindow } from 'electron';
import { readdir, lstat, readFile } from 'fs/promises';
import { join, basename } from 'path';
import { store, TProject, TWeight } from './store';
import pinyin from 'pinyin';

const pinyinOptions = { style: pinyin.STYLE_NORMAL, heteronym: true };
const excludes = ['.git', '.svn', 'node_modules', '.webpack', '.cache', '.npm'];

// 用于判断web项目的文件
const webProjectFile = 'package.json';
// 项目类型
const webProjectTypes = ['react', 'vue', 'nestjs', 'electron'];

/**
 * 选择文件夹
 */
export const selectFolder = async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    title: '请选择包含项目的文件夹',
    properties: ['openDirectory', 'multiSelections'],
    buttonLabel: '选中',
  });
  if (canceled) return;
  return filePaths;
};

/**
 * 读取目录
 */
export const readFolder = async (filePaths: string[]) => {
  // web项目列表
  const webProjects: string[] = [];
  for await (let path of filePaths) {
    // 读取当前目录下文件
    const files = await readdir(path);
    // 判断该文件夹是否web项目
    if (files.includes(webProjectFile)) {
      // 加入项目列表
      webProjects.push(path);
    } else if (files.length) {
      // // 进入一级目录
      for await (let name of files) {
        if (excludes.includes(name)) continue;
        const childPath = join(path, name);
        const stat = await lstat(childPath);
        if (!stat.isDirectory()) continue;
        webProjects.push(childPath);
      }
    }
  }
  const storeWebProjects = store.get('webProjects');
  const newWebProjects = [...new Set([...storeWebProjects, ...webProjects])];
  store.set('webProjects', newWebProjects);
  const projects = await parsingProjects(newWebProjects);
  return projects;
};

/**
 * 解析项目列表
 */
export const parsingProjects = async (webProjects = store.get('webProjects')) => {
  // 项目列表数据
  const projects: TProject[] = [];

  // 遍历文件夹
  for await (let path of webProjects) {
    const name = basename(path);
    const project = {
      name,
      namePinyin: pinyin(name, pinyinOptions).flat().join(''),
      path,
      pathPinyin: pinyin(path, pinyinOptions).flat().join(''),
    };

    // 尝试写入 web 项目的信息
    try {
      const file = await readFile(join(path, webProjectFile), { encoding: 'utf8' });
      const json = JSON.parse(file);
      const { scripts = {}, dependencies = {}, devDependencies = {} } = json;

      // 读取项目类型
      const types: string[] = [];
      const allDependencies = Object.keys({ ...dependencies, ...devDependencies });
      for (let type of webProjectTypes) {
        if (allDependencies.some((key) => new RegExp(type).test(key))) {
          types.push(type);
          continue;
        }
      }
      Object.assign(project, { web: { scripts: Object.keys(scripts), types } });
    } catch (e) {
      // console.log(e);
    }

    projects.push(project);
  }

  store.set('projects', projects);

  return sortProject({ projects });
};

/**
 * 置顶项目
 */
export const topProject = async (path: string) => {
  const weights = store.get('weights');
  if (!weights[path]) weights[path] = 1;
  else weights[path]++;
  store.set('weights', weights);
  return sortProject({ weights });
};

export const deleteProject = async (path: string) => {
  const webProjects = store.get('webProjects');
  const index = webProjects.indexOf(path);
  webProjects.splice(index, 1);
  store.set('webProjects', webProjects);
  console.log(webProjects);
  return parsingProjects(webProjects);
};

/**
 * 排序项目
 */
export const sortProject = async (options?: { projects?: TProject[]; weights?: TWeight }) => {
  const { projects = store.get('projects'), weights = store.get('weights') } = options || {};
  projects.sort((a, b) => (weights[b.path] ?? 0) - (weights[a.path] ?? 0));
  return projects;
};

/**
 * 添加文件夹
 */
export const menuAddFolder = async () => {
  const [win] = BrowserWindow.getAllWindows();
  const filePaths = await selectFolder();
  if (!filePaths) return;
  win.webContents.send('loading', true);
  const projects = await readFolder(filePaths);
  win.webContents.send('loading', false);
  // 发送消息到主进程
  projects && win.webContents.send('show-projects', projects);
};

/**
 * 清空文件夹
 */
export const menuEmptyProjects = async () => {
  const [win] = BrowserWindow.getAllWindows();
  store.set('webProjects', []);
  store.set('projects', []);
  win.webContents.send('show-projects', []);
};

/**
 * 清空排序记录
 */
export const menuSortProjects = async () => {
  const [win] = BrowserWindow.getAllWindows();
  store.set('weights', {});
  const projects = store.get('projects');
  win.webContents.send('show-projects', projects);
};

export const getApp = async (force?: boolean) => {
  let app = store.get('app');
  if (app && !force) return app;

  const { canceled, filePaths } = await dialog.showOpenDialog({
    title: '请选择打开项目的应用程序',
    filters: [{ name: '', extensions: ['app'] }],
    properties: ['openFile'],
  });
  if (!canceled) {
    app = basename(filePaths[0]).replace(/\s/g, '\\ ');
    store.set('app', app);
  }

  return app || `Sublime\\ Text.app`;
};

export const getTerminal = async (force?: boolean) => {
  let app = store.get('terminal');
  if (app && !force) return app;

  const { canceled, filePaths } = await dialog.showOpenDialog({
    title: '请选择打开项目的应用程序',
    filters: [{ name: '', extensions: ['app'] }],
    properties: ['openFile'],
  });
  if (!canceled) {
    app = basename(filePaths[0]).replace(/\s/g, '\\ ');
    store.set('terminal', app);
  }

  return app || 'Terminal.app';
};
