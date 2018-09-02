let dotenv = require("dotenv");
dotenv.load();
/* eslint-disable no-undef*/
module.exports = {
	cookieKey: process.env.COOKIE_KEY,
	mongoURI: process.env.MONGO_URI,
	redisHost: process.env.REDIS_HOST,
	redisPort: process.env.REDIS_PORT,
	jwtKey: process.env.JWT_KEY
};
