let dotenv = require("dotenv");
dotenv.load();
/* eslint-disable no-undef*/
console.log(process.env.REDIS_HOST);
module.exports = {
	redisHost: process.env.REDIS_HOST,
	redisPort: process.env.REDIS_PORT
};
