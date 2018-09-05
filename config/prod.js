let dotenv = require("dotenv");
dotenv.load();
/* eslint-disable no-undef*/
module.exports = {
	captchaSecretKey: process.env.CAPTCHA_SECRET_KEY,
	cookieKey: process.env.COOKIE_KEY,
	jwtKey: process.env.JWT_KEY,
	mongoURI: process.env.MONGO_URI,
	port: process.env.PORT,
	redisHost: process.env.REDIS_HOST,
	redisPort: process.env.REDIS_PORT,
<<<<<<< HEAD
	sendGridKey: process.env.SENDGRID_KEY
=======
	captchaSecretKey: process.env.CAPTCHA_SECRET_KEY,
>>>>>>> f74db20616a49b78ae7f81dfd63f1157a09eaacf
};
