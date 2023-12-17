// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");

function createWindow() {
  // Create the browser window.
  let mainWindow = new BrowserWindow({
    width: 1000,
    height: 1000,
    show: false,
    x: 100,
    y: 20,
    frame: false,  // 用于自定义menu，设置为false可以将默认的菜单栏隐藏
    autoHideMenuBar: true,
    // transparent: true,
    maxHeight: '100vh',
    maxWidth: '100vw',
    minWidth: 300,
    minHeight: 300,
    resizable: true, // default true
    title: '讯飞智文',
    icon: 'favicon.ico',
    titleBarStyle: 'hiddenInset',
    // backgroundColor: '#f00f00',
    webPreferences: {
      // nodeIntegration: true,
      // contextIsolation: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile("index.html");
  // mainWindow.loadURL('https://www.bilibili.com/video/BV1FP4115739?p=29&spm_id_from=pageDriver&vd_source=e53600684ed500337b605cccf613b151')

  // mainWindow.webContents.openDevTools()

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.on("close", () => {
    console.log("close~~~~~~");
    mainWindow = null;
  });

  // const wind2 = new BrowserWindow({
  //   width: 600,
  //   height: 400,
  //   parent: mainWindow,
  //   modal: true
  // })

  // wind2.loadURL('https://www.baidu.com')
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  // console.log(app.getPath('desktop'));
  // console.log(app.getPath('music'));
  // console.log(app.getPath('temp'));
  // console.log(app.getPath('userData'));
});

app.on('before-quit', () => {
  console.log('app is quiting');
})

app.on("window-all-closed", function () {
  console.log("window-all-closed~~~~");
  if (process.platform !== "darwin") app.quit();
});

app.on('browser-window-blur', () => {
  console.log('brower window is blur');
  // setTimeout(() => {
  //   app.quit();
  // }, 3e3);
})

app.on('browser-window-focus', () => {
  console.log('brower window is focus');
})

ipcMain.handle('send-event', (event, msg) => {
  console.log('handle', msg);
  return msg;
})
