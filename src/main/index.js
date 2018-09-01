import {
	app,
	BrowserWindow
} from 'electron'
import DBManager from '../core/DBManager';



/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
	global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development' ?
	`http://localhost:9080` :
	`file://${__dirname}/index.html`

const appDB = DBManager.GetAppDB();

function createWindow() {
	const isMac = process.platform == 'darwin';
	appDB.SetValue('isMac', isMac);

	/**
	 * Initial window options
	 */
	mainWindow = new BrowserWindow({
		width: appDB.GetValue('window_width', 800),
		height: appDB.GetValue('window_height', 600),
		useContentSize: true,
		frame: isMac,
		title: 'Topsi Project Manager'
	})

	// Disable the default menu
	mainWindow.setMenu(null);

	mainWindow.loadURL(winURL)

	mainWindow.on('resize', () => {
		const rect = mainWindow.getBounds();
		appDB.SetValue('window_width', rect.width);
		appDB.SetValue('window_height', rect.height);
	})

	mainWindow.on('closed', () => {
		mainWindow = null
	})
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow()
	}
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */