# electron-as-wallpaper-mwl

## A package to set electron window as the wallpaper for macos, windows and linux

### Example
```javascript
const { app, BrowserWindow, screen } = require('electron/main')

const {attach, detach} = require("./main")

let mainWindow;
let wallpaperwins = [];
const closeAllWallpaperwins = () => {
    wallpaperwins.forEach(wallpaperwin => {
        wallpaperwin.close();
        wallpaperwin = null;;
    });
}
const createMainwin = (winObj) => {
    const mainWindow = new BrowserWindow({
    //   frame: false,
        width: 800,
        height: 600
    });
    mainWindow.loadFile(winObj);

    mainWindow.on('closed', () => {
        // Close all other windows when the main window is closed
        closeAllWallpaperwins();
    });
  };

const createWallpaperwin = (display, wallpaperObj) => {
  const wallpaperwin = new BrowserWindow({
    opacity: 1,
    frame: false,
    focusable: true,
    skipTaskbar: true,
    enableLargerThanScreen: true, // 超过 mac dock
    type: 'desktop',
    x:display.bounds.x,
    y:display.bounds.y,
    width: display.bounds.width,
    height: display.bounds.height
  });

  wallpaperwin.loadFile(wallpaperObj);
  wallpaperwin.once('ready-to-show', () => {
    wallpaperwin.show()
    attach(wallpaperwin);
    // detach(wallpaperwin);
  });
  return wallpaperwin;
};

app.whenReady().then(() => {
  const displays = screen.getAllDisplays()
  createMainwin('index.html');
  displays.forEach(display => {
    wallpaperwins.push(createWallpaperwin(display, 'index.html'));
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainwin();
    }
  })
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
```