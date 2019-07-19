const {app, BrowserWindow, session, ipcMain} = require('electron')
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

let mainWindow
let vidWindow
var dev = true

function createMainWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 300,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('./assets/html/index.html')

  // Open the DevTools.
  if (dev) {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('close', function(e){
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
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
    app.quit()
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createMainWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createMainWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

//ipcMain.on will receive the “playvideo” info from renderprocess
ipcMain.on("playvideo",function (event, arg) {
  //create new window
  if (vidWindow == null){
    vidWindow = new BrowserWindow({ width: 800, height: 600, show: false,
      webPreferences: { webSecurity: false, plugins: true, nodeIntegration: false } });  // create a new window
    vidWindow.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      vidWindow = null
    })
  }
  videoURL = "https://www.youtube.com/embed/" + arg.split("/")[4];
  console.log(videoURL);
  // loading an external url. We can
  //load our own another html file , like how we load index.html earlier
  vidWindow.loadURL(videoURL);
  vidWindow.show();
  // inform the render process that the assigned task finished. Show a message in html
  // event.sender.send in ipcMain will return the reply to renderprocess
  //event.sender.send("btnclick-task-finished", "yes");
});
