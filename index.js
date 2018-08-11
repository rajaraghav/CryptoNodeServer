let keys = require("./config/keys");
const express = require("express");
const app = express();
/* eslint-disable */
const server = require("http").Server(app);
/* eslint-enable */
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//socket io cluster config
const socketIO = require("socket.io");
const socketRedis = require("socket.io-redis");
/* eslint-disable */
const io = socketIO(server);
const redisAdapter = socketRedis({
	host: keys.redisHost,
	port: keys.redisPort
});
/* eslint-enable */

//socket io cluster config
require("./services/socket").default(io, redisAdapter);

app.get("/", (req, res) => {

	res.send("42");

});
/* eslint-disable */
const PORT_NUM = process.env.PORT || 5000;
/* eslint-enable */

const port = PORT_NUM;
/* eslint-disable no-undef*/
if (process.env.NODE_ENV === "production") {

	server.listen(port, process.env.HOST_ADDRESS, () => {

		/* eslint-enable */
		console.log("node server running.");

	});

} else {

	server.listen(port, () => {

		console.log("node server running.");

	});

}
