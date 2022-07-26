import { BrowserWindowConstructorOptions } from 'electron';
import { join } from 'path';

/**
 * 是否开发环境
 */
export const isDev = require('electron-is-dev');

/**
 * 开发地址
 */
export const devUrl = 'http://localhost:3000';

/**
 * 本地文件
 */
export const localFile = join(__dirname, '../build/index.html');

/**
 * 浏览器配置
 */
export const browserWindowOptions: BrowserWindowConstructorOptions = {
  width: 300,
  height: 400,
  minWidth: 300,
  minHeight: 400,
  frame: false,
  transparent: true,
  webPreferences: {
    preload: join(__dirname, '../dist/preload.js'),
  },
};
