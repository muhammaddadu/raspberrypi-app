/**
* Application Bootstrap for The Box
*/
const path = require('path');
const electron = require('electron');
const {app, powerSaveBlocker, BrowserWindow} = electron;

const INDEX_HTML_PATH = path.join(__dirname, 'app', 'index.html');
const NODE_ENV = process.env.NODE_ENV || 'development';

// prevent sleep
let powerSaveBlockerId = powerSaveBlocker.start('prevent-display-sleep');
let applicationWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', () => app.quit());

app.on('ready', () => {
	applicationWindow = new BrowserWindow({
		width: 800,
		height: 600,
		kiosk: NODE_ENV !== 'development',
		autoHideMenuBar: true,
		darkTheme: true,
		backgroundColor: '#021B32'
	});

	// and load the index.html of the app.
	applicationWindow.loadURL(`file://${INDEX_HTML_PATH}`);

	// Open the DevTools if run with "npm start dev"
	if(process.argv[2] === 'dev'){  
		applicationWindow.webContents.openDevTools();
	}

	applicationWindow.on('closed', () => {
		applicationWindow = null;
	});
});
