let dotenv = require("dotenv");
dotenv.load();
/* eslint-disable no-undef*/
module.exports = {
	captchaSecretKey: process.env.CAPTCHA_SECRET_KEY,
	cookieKey: process.env.COOKIE_KEY,
	jwtKey: process.env.JWT_KEY,
	mongoURI: process.env.MONGO_URI,
	port: process.env.PORT,
	redirectClickUrl: process.env.REDIRECT_CLICK_URL,
	redisHost: process.env.REDIS_HOST,
	redisPort: process.env.REDIS_PORT,
	sendGridKey: process.env.SENDGRID_KEY
};
