let dotenv = require("dotenv");
dotenv.load();
/* eslint-disable no-undef*/
module.exports = {
	cookieKey: process.env.COOKIE_KEY,
	redisHost: process.env.REDIS_HOST,
	redisPort: process.env.REDIS_PORT
};
