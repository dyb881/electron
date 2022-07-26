import { ipcMain } from 'electron';

/**
 * 注册主进程IPC模块监听
 */
export const createIpcMain = async () => {
  // 注册监听
  ipcMain.on('asynchronous-message', (event, arg) => {
    // 反转文案
    const reply = arg.split('').reverse().join('');
    // 打印日志到终端
    console.log('reply: ', reply);
    // 发送消息到主进程
    event.sender.send('asynchronous-reply', reply);
  });
};
