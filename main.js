const {app, BrowserWindow, session, ipcMain} = require('electron')

let mainWindow
let vidWindow
var dev = true

function createMainWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 300,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadFile('./assets/html/index.html')

  if (dev) {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('close', function(e){
    if (!dev){
      var choice = require('electron').dialog.showMessageBox(this,
        {
          type: 'question',
          buttons: ['Yes', 'No'],
          title: 'Confirm',
          message: 'Are you sure you want to quit?\nThis will stop playing videos and delete the queue.'
        });
      if(choice == 1){
        e.preventDefault();
      }
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null
    app.quit()
  })
}

app.on('ready', createMainWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow()
  }
})

ipcMain.on("playvideo",function (event, arg) {
  if (vidWindow == null){
    vidWindow = new BrowserWindow({ width: 800, height: 600, show: false, webPreferences: { webSecurity: false, plugins: true, nodeIntegration: false } });
    if (dev) {
      vidWindow.webContents.openDevTools()
    }
    vidWindow.loadFile("./assets/html/video.html");
    vidWindow.on('closed', () => {
      vidWindow.hide();
    })
  }
  videoURL = "https://www.youtube.com/embed/" + arg.split("/")[4];
  console.log(videoURL);
  vidWindow.webContents.send('nextvid', videoURL);
  vidWindow.show();
});
