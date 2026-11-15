const {contextBridge,ipcRenderer}=require("electron");
contextBridge.exposeInMainWorld("maxDesktop",{isDesktop:true,openExternal:(url)=>ipcRenderer.invoke("max:open-external",url)});
