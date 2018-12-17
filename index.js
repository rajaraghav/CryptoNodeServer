let keys = require("./config/keys");
const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const app = express();
const blockchain = require("./services/xServices/blockchain");

/* eslint-disable */
const server = require("http").Server(app);
/* eslint-enable */
console.log(process.env.NODE_ENV);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
io.adapter(redisAdapter);
/* eslint-enable */

mongoose.Promise = global.Promise;
mongoose.connect(
	keys.mongoURI,
	{ useNewUrlParser: true }
);
//socket io cluster config ends here.
require("./services/socket").default(io);
require("./services/xServices/Xchange/ws-run-method").xchangeWs(io);
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
require("./routes/xApi/index")(app);
require("./routes/walletApi/index")(app);
/* eslint-disable */
const PORT_NUM = process.env.PORT || 5000;
/* eslint-enable */

const port = PORT_NUM;
/* eslint-disable no-undef*/
setImmediate(() => {

	blockchain.init();
	blockchain.syncRunner();
	server.listen(port, () => {

		console.log("node server running at ", port);

	});

});
