const { ipcRenderer, contextBridge } = require("electron");

const handleSendEvent = async () => {
  const fallback =  await ipcRenderer.invoke('send-event', 'hahahaha');
  console.log(fallback);
  return fallback;
}

contextBridge.exposeInMainWorld('myApi', {
  platform: process.platform,
  handleSendEvent
})