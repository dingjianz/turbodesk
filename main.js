// Modules to control application life and create native browser window
const path = require("node:path");
const { app, BrowserWindow, ipcMain, dialog, globalShortcut, Menu, clipboard, desktopCapturer } = require("electron");
const WinState = require("electron-win-state").default;
const createTray = require("./tray");

const winState = new WinState({
  defaultWidth: 800,
  defaultHeight: 600,
}); // 使用前必须把设置的值注释掉

const menu = Menu.buildFromTemplate([
  {
    label: "electron",
    submenu: [
      {
        label: "menu-1",
        submenu: [
          {
            label: "submenu-1",
          },
        ],
      },
    ],
  },
]);

const contextMenu = Menu.buildFromTemplate([
  {
    label: "item 1",
  },
  {
    role: "editMenu",
  },
]);

function createWindow() {
  // Create the browser window.
  let mainWindow = new BrowserWindow({
    // ...winState.winOptions,
    width: 1000,
    height: 1000,
    show: false,
    x: 100,
    y: 20,
    // frame: false,  // 用于自定义menu，设置为false可以将默认的菜单栏隐藏
    autoHideMenuBar: true,
    // transparent: true,
    maxHeight: "100vh",
    maxWidth: "100vw",
    minWidth: 300,
    minHeight: 300,
    resizable: true, // default true
    title: "讯飞智文",
    icon: "favicon.ico",
    // titleBarStyle: "hiddenInset",
    // backgroundColor: '#f00f00',
    webPreferences: {
      // nodeIntegration: true,
      // contextIsolation: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile("index.html");
  // mainWindow.loadURL('https://www.bilibili.com/video/BV1FP4115739?p=29&spm_id_from=pageDriver&vd_source=e53600684ed500337b605cccf613b151')

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.on("close", () => {
    console.log("close~~~~~~");
    mainWindow = null;
  });

  const wc = mainWindow.webContents;
  wc.openDevTools();
  wc.on("dom-ready", (event) => {
    // const choice = dialog.showMessageBoxSync(mainWindow, {
    //   type: 'question',
    //   buttons: ['Leave', 'Stay'],
    //   title: 'Do you want to leave this site?',
    //   message: 'Changes you made may not be saved.',
    //   defaultId: 0,
    //   cancelId: 1
    // })
    // const leave = (choice === 0)
    // if (leave) {
    //   event.preventDefault()
    // }
    // dialog.showOpenDialog({
    //   buttonLabel: 'dingjian',
    //   defaultPath: app.getPath('desktop'),
    //   properties: ['createDirectory', 'openDirectory', 'openFile', 'multiSelections']
    // }).then((result) => {
    //   console.log(result.filePaths)
    // })
    // dialog.showSaveDialog({}).then((result) => {
    //   console.log(result.filePath)
    // });
    console.log("dom 加载完毕");
  });
  wc.on("did-finish-load", () => {
    console.log("窗口资源全部加载完毕 resource is loaded");
  });
  wc.on("context-menu", (e, params) => {
    console.log(100);
    contextMenu.popup();
  });

  globalShortcut.register("f5", () => {
    mainWindow.reload();
  });

  // // 注册一个'CommandOrControl+X' 快捷键监听器
  // const ret = globalShortcut.register("CommandOrControl+X", () => {
  //   console.log("CommandOrControl+X is pressed");
  //   globalShortcut.unregister("CommandOrControl+X");
  // });
  // if (!ret) {
  //   console.log("registration failed");
  // }
  // 检查快捷键是否注册成功
  // console.log(globalShortcut.isRegistered("CommandOrControl+X"));

  Menu.setApplicationMenu(menu);

  // createTray(app, mainWindow); // 创建托盘
  // const wind2 = new BrowserWindow({
  //   width: 600,
  //   height: 400,
  //   parent: mainWindow,
  //   modal: true
  // })

  // wind2.loadURL('https://www.baidu.com');
  // winState.manage(mainWindow)

  // process.env["ELECTRON_ENABLE_SECURITY_WARNINGS"] = "true";
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
app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});
app.on("before-quit", () => {
  console.log("app is quiting");
});

app.on("window-all-closed", function () {
  console.log("window-all-closed~~~~");
  if (process.platform !== "darwin") app.quit();
});

app.on("browser-window-blur", () => {
  console.log("brower window is blur");
  // setTimeout(() => {
  //   app.quit();
  // }, 3e3);
});

app.on("browser-window-focus", () => {
  console.log("brower window is focus");
});

ipcMain.handle("send-event", (event, msg) => {
  console.log("handle", msg);
  return msg;
});

ipcMain.handle("copy-event", (event, msg) => {
  clipboard.writeText(msg);
});

ipcMain.handle("show-event", () => {
  return clipboard.readText();
});

ipcMain.handle("capture-event", () => {
  return desktopCapturer.getSources({ types: ["window", "screen"] }).then((result) => {
    const source = result?.find((item) => item.name === "屏幕 2");
    return source;
  });
});
