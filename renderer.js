/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

window.addEventListener("DOMContentLoaded", () => {
  const oBnt = document.getElementById("btn");
  oBnt.addEventListener("click", async () => {
    // 如何创建新窗口
    myApi.handleSendEvent();
  });

  document.querySelector("#btn2").addEventListener("click", () => {
    myApi.copy("hello world");
  });

  document.querySelector("#btn3").addEventListener("click", () => {
    myApi.show();
  });

  document.querySelector("#btn4").addEventListener("click", async () => {
    const imgUrl = await myApi.capture();
    console.log(imgUrl);
    document.querySelector("#img").src = imgUrl;
  });

  document.querySelector("#btn5").addEventListener("click", async () => {
    myApi.testNativeImage();
  });
});
