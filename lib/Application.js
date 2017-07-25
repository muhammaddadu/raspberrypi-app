/**
 * Application
 */

const path = require('path');
const electron = require('electron');
const {app, powerSaveBlocker, BrowserWindow} = electron;
const { spawn } = require('child_process');

const Config = require('./Config');

module.exports = class Application {
	constructor(opts) {
		this.applicationWindow = null;
		this.powerSaveBlockerId = null;
		this.app = app;

		this.config = new Config(opts);
	}

	initialize() {
		this.powerSaveBlockerId = powerSaveBlocker.start('prevent-display-sleep');
	}

	openApplication() {
		this.app.on('ready', () => {
			this.applicationWindow = new BrowserWindow({
				kiosk: !this.config.isDev,
				autoHideMenuBar: true,
				darkTheme: true,
				backgroundColor: '#021B32'
			});

			this.buildCss('build')
				.then(() => {
					this.applicationWindow.loadURL(`file://${this.config.rootApplicationHtml}`);

					if(this.config.isDev){  
						this.applicationWindow.webContents.enableDeviceEmulation({
							screenSize: this.config.screenSize
						});
						this.applicationWindow.webContents.openDevTools();
					} else {
						this.buildCss('watch');
					}

					this.applicationWindow.on('closed', () => {
						this.applicationWindow = null;
					});
				});
		});

		this.app.on('window-all-closed', () => this.app.quit());
	}

	buildCss(_buildType) {
		let entrypointCss = this.config.entrypointCss;
		let buildType = _buildType || 'build';
		let command = ['run', 'node-sass-' + buildType, '--', '--output', path.join(__dirname, '../build/css')];

		return new Promise((resolve, reject) => {
			// use exec
			if (!entrypointCss || entrypointCss.length === 0) { return Promise.resolve(); }
			command.push(entrypointCss.join(','));

			this.nodeSassProcess = spawn('npm', command);
			this.nodeSassProcess.stdout.on('data', (data) => console.log(`buildCss: ${data}`));
			this.nodeSassProcess.stderr.on('data', (data) => console.log(`buildCss: ${data}`));

			this.nodeSassProcess.on('close', (code) => {
				if (code !== 0) {
					console.error('buildCss: compile failed');
  					console.log(`buildCss: child process exited with code ${code}`);
  					return resolve();
				}

				console.log('buildCss: compiled successfully');
				resolve();
			});
		});
	}
}