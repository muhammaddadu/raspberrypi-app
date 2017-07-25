/**
* Application Bootstrap for The Box
*/
const path = require('path');
const Application = require('./lib/Application');

const CONFIGURATION = {
	isDev: process.argv[2] === 'dev' || process.env.NODE_ENV === 'development',
	rootApplicationHtml: path.join(__dirname, 'app', 'index.html'),
	entrypointCss: ['style/module.scss'].map((file) => path.resolve(__dirname, file)),
	entrypointJs: ['app/app.js'].map((file) => path.resolve(__dirname, file)),
	// raspberry PI 3.5 INCH
	screenSize: {
		width: 480,
		height: 320
	}
};

let application = new Application(CONFIGURATION);

application.initialize();
application.openApplication();