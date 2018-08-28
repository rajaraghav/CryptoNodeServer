let keys = require("./config/keys");
const express = require("express");
const passport = require("passport");
const app = express();
/* eslint-disable */
const server = require("http").Server(app);
/* eslint-enable */
var cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({
	keys: [keys.cookieKey],
	maxAge: 30 * 24 * 60 * 60 * 1000
}));
app.use(passport.initialize());
app.use(passport.session());

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

mongoose.Promise = global.Promise;
mongoose.connect(
	keys.mongoURI,
	{ useNewUrlParser: true }
);
//socket io cluster config ends here.
require("./services/socket").default(io, redisAdapter);
require("./model/user");
require("./services/passport");
//cors setting
app.use((req, res, next) => {

	res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Authorization, Origin, Content-Type, Accept"
	);
	res.setHeader("Access-Control-Allow-Credentials", "true");
	next();

});
//cors setting
app.get("/", (req, res) => {

	res.send("42");

});
require("./routes/CoinData")(app);
require("./routes/authRoutes")(app, passport);
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
