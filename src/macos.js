const { exec } = require('child_process');

function attach(win) {
    // Electron integrates desktop type window for macos.
    // ex： new BrowserWindow({ type: 'desktop',})
    // We left blank for here program consistency.
}

function detach(win) {
    // Electron integrates desktop type window for macos. 
    // ex： new BrowserWindow({ type: 'desktop',})
    // We left blank for here program consistency.
}

module.exports = { attach, detach };