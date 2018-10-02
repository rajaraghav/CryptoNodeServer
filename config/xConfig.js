/* eslint-disable no-unused-vars */
import merge from "lodash/merge";
import path from "path";

/* istanbul ignore next */
const requireProcessEnv = (name) => {

	/* eslint-disable no-undef */
	if (!process.env[name]) {

		throw new Error(`You must set the ${name} environment variable`);

	}
	return process.env[name];
	/* eslint-enable no-undef */

};
/* istanbul ignore next */

/* eslint-disable no-undef */
if (process.env.NODE_ENV !== "production") {

	const dotenv = require("dotenv-safe");
	dotenv.load({
		path: path.join(__dirname, "../.env"),
		sample: path.join(__dirname, "../.env.example")
	});
	/* eslint-enable no-undef */

}
/* eslint-disable no-undef */
const config = {
	all: {
		env: process.env.NODE_ENV || "development",
		root: path.join(__dirname, ".."),
		port: process.env.PORT || 9000,
		ip: process.env.IP || "0.0.0.0",
		apiRoot: process.env.API_ROOT || "/api",
		masterKey: requireProcessEnv("MASTER_KEY"),
		jwtSecret: requireProcessEnv("JWT_SECRET"),
		mongo: {
			options: {
				db: {
					safe: true
				}
			}
		}
	},
	test: {},
	development: {
		mongo: {
			uri: "mongodb://localhost:27017/testnet-xchange-backend-dev",
			options: {
				debug: true
			}
		}
	},
	production: {
		ip: process.env.IP || undefined,
		port: process.env.PORT || 8030,
		mongo: {
			uri:
				process.env.MONGODB_URI ||
				"mongodb://localhost:27017/testnet-xchange-backend"
		}
	}
};
module.exports = merge(config.all, config[config.all.env]);
export default module.exports;
