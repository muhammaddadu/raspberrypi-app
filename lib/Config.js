/**
 * Configuration
 */

module.exports = class Config {
	constructor(opts) {
		for (let key in opts) {
			this[key] = opts[key];
		}
	}
}