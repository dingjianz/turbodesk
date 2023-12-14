// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const path = require("node:path");

function createWindow() {
  // Create the browser window.
  let mainWindow = new BrowserWindow({
    width: 1000,
    height: 1000,
    show: false,
    x: 100,
    y: 20,
    // frame: true,  // 用于自定义menu，设置为false可以将默认的菜单栏隐藏
    autoHideMenuBar: true,
    // transparent: true,
    maxHeight: '100vh',
    maxWidth: '100vw',
    minWidth: 300,
    minHeight: 300,
    resizable: true, // default true
    title: '讯飞智文',
    icon: 'favicon.ico',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
      // preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.on("close", () => {
    console.log("close~~~~~~");
    mainWindow = null;
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  console.log("window-all-closed~~~~");
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
