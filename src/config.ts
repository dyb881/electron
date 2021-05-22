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
  width: 1200,
  height: 800,
  minWidth: 600,
  minHeight: 400,
  backgroundColor: '#fff',
  webPreferences: {
    preload: join(__dirname, '../dist/preload.js'),
  },
};
