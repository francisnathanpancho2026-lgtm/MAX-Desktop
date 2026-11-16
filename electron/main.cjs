const {app,BrowserWindow,ipcMain,shell}=require("electron");
const path=require("path");
function createWindow(){const win=new BrowserWindow({width:1540,height:940,minWidth:1050,minHeight:700,backgroundColor:"#020817",title:"M.A.X.",autoHideMenuBar:true,webPreferences:{preload:path.join(__dirname,"preload.cjs"),contextIsolation:true,nodeIntegration:false,sandbox:true}});if(process.env.VITE_DEV_SERVER_URL)win.loadURL(process.env.VITE_DEV_SERVER_URL);else win.loadFile(path.join(__dirname,"..","dist","index.html"));}
app.whenReady().then(()=>{createWindow();app.on("activate",()=>{if(BrowserWindow.getAllWindows().length===0)createWindow();});});app.on("window-all-closed",()=>{if(process.platform!=="darwin")app.quit();});
ipcMain.handle("max:open-external",async(_e,url)=>{if(typeof url!=="string"||!/^https?:\/\//i.test(url))return false;await shell.openExternal(url);return true;});
