/**
 * Application
 */

const path = require('path');
const electron = require('electron');
const {app, powerSaveBlocker, BrowserWindow} = electron;
const sass = require('node-sass');

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
				kiosk: !this.idDev,
				autoHideMenuBar: true,
				darkTheme: true,
				backgroundColor: '#021B32'
			});

			this.buildCss()
				.then(() => {
					this.applicationWindow.loadURL(`file://${this.config.rootApplicationHtml}`);

					if(this.idDev){  
						this.applicationWindow.webContents.enableDeviceEmulation({
							screenSize: this.config.screenSize
						});
						this.applicationWindow.webContents.openDevTools();
					} else {

					}

					this.applicationWindow.on('closed', () => {
						this.applicationWindow = null;
					});
				});
		});

		this.app.on('window-all-closed', () => this.app.quit());
	}

	buildCss() {
		let entrypointCss = this.config.entrypointCss;

		return new Promise((resolve, reject) => {
			// use exec
			if (!entrypointCss || entrypointCss.length === 0) { return Promise.resolve(); }
			sass.render({
				files: this.config.entrypointCss,
			}, (err, result) =>  {
				if (err) {
					console.error('Failed to compile sass');
					console.error(err);
				}

				console.log('Sass compiled successfully');
				console.log(result);
				resolve();
			});
		});
	}
}