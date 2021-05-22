# Electron

基于 electron-forge 创建的初始化项目，并完成基础封装配置

## 教程

```sh
npm run start // 运行开发环境
```

## 目录

- build - 前端部分的代码
- src - Electron 代码
  - init - 初始化方法
    - createApplicationMenu.ts - 创建自定义菜单
    - createGlobalShortcut.ts - 创建全局快捷键
    - createIpcMain.ts - 注册主进程 IPC 模块监听
    - shortcutFunction.ts - 快捷方法函数
  - config.ts - 配置文件
  - index.ts - 入口文件，初始化 Electron
  - preload.ts - 预加载文件

## 快捷方法封装

src/init/shortcutFunction.ts

- createWindow - 创建窗口
- toHome - 跳转首页 - F1
- goBack - 返回上一页 - F2
- forward - 前进下一页 - F3
- reload - 刷新页面 - F5
- fullScreen - 窗口全屏 - F11
- devTools - 开发工具 - F12
- quitConfirm - 确认退出对话框
