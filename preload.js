const { ipcRenderer, contextBridge, nativeImage } = require("electron");

console.log(nativeImage)

const handleSendEvent = async () => {
  const fallback = await ipcRenderer.invoke("send-event", "hahahaha");
  console.log(fallback);
  return fallback;
};

const copy = (msg) => {
  ipcRenderer.invoke("copy-event", msg);
};

const show = async () => {
  const msg = await ipcRenderer.invoke("show-event");
  console.log(msg);
};

const capture = async () => {
  const source = await ipcRenderer.invoke("capture-event");
  const str = source.thumbnail.crop({ x: 0, y: 0, width: 1200, height: 1000 });
  return str.toDataURL();
};

const testNativeImage = () => {
  const img = nativeImage.createFromPath("./favicon.ico");
  console.log(img);
};

contextBridge.exposeInMainWorld("myApi", {
  platform: process.platform,
  handleSendEvent,
  copy,
  show,
  capture,
  testNativeImage,
});
