const path = require('path')

if (process.platform === 'darwin') {
	wp = require(path.join(__dirname, './src/macos'))
} else if (process.platform === 'win32') {
	wp = require(path.join(__dirname, './src/windows'))
} else {
	wp = require(path.join(__dirname, './src/linux'))
}
const {attach, detach} = wp
module.exports = { attach, detach };