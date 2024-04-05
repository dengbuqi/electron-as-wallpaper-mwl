const { exec } = require('child_process');

function attach(win) {
    const WINDOW_ID = win.getNativeWindowHandle().readUInt32LE(0);
    exec(`xprop -id ${WINDOW_ID} -f _NET_WM_WINDOW_TYPE 32a -set _NET_WM_WINDOW_TYPE _NET_WM_WINDOW_TYPE_DESKTOP`, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        // console.log(`stdout: ${stdout}`);
        // console.error(`stderr: ${stderr}`);
      });
}

function detach(win) {
    const WINDOW_ID = win.getNativeWindowHandle().readUInt32LE(0);
    exec(`xprop -id ${WINDOW_ID} -f _NET_WM_WINDOW_TYPE 32a -set _NET_WM_WINDOW_TYPE _NET_WM_WINDOW_TYPE_NORMAL`, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        // console.log(`stdout: ${stdout}`);
        // console.error(`stderr: ${stderr}`);
      });
}

module.exports = { attach, detach };