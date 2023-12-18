const { Tray, Menu } = require("electron");

const createTray = (app, mainWindow) => {
  const tray = new Tray("./favicon.ico");
  const contextMenu = Menu.buildFromTemplate([
    { label: "切换", type: "radio", click: () => {
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    } },
    { label: "Item3", type: "radio", checked: true },
    { label: "Item4", type: "radio" },
  ]);
  tray.setToolTip("讯飞智文");
  tray.setContextMenu(contextMenu);
  tray.on("click", (e) => {
    if (e.shiftKey) {
      app.quit();
    } else {
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    }
  });
};

module.exports = createTray;
