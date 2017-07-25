/**
* Application Bootstrap for The Box
*/
const Application = require('./lib/Application');
const CONFIGURATION = {
	idDev: process.argv[2] === 'dev' || process.env.NODE_ENV === 'development',
	rootApplicationHtml: path.join(__dirname, 'app', 'index.html'),
	entrypointCss: ['style/module.scss'].map((path) => path.resolve(__dirname, path)),
	entrypointJs: ['app/app.js'].map((path) => path.resolve(__dirname, path)),
	screenSize: {
		width: 480,
		height: 320
	}
};

let application = new Application(CONFIGURATION);

application.initialize();
application.openApplication();