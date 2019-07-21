const {app, BrowserWindow, session, ipcMain} = require('electron')

let mainWindow
let vidWindow
var dev = false

function createMainWindow () {
  mainWindow = new BrowserWindow({
    width: 974,
    height: 390,
    webPreferences: {
      nodeIntegration: true
    }
  })

  vidWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      webSecurity: false,
      plugins: false,
      nodeIntegration: true
    }
  });

  if (dev) {
    vidWindow.webContents.openDevTools()
  }

  vidWindow.loadFile("./assets/html/video.html");

  vidWindow.on('close', function (e){
    vidWindow = null
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
  videoURL = "https://www.youtube.com/embed/" + arg.split("/")[4];
  console.log(videoURL);
  vidWindow.webContents.send('nextvid', videoURL);
  vidWindow.show();
});
