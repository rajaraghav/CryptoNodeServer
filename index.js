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
const REDIS_URL = process.env.REDIS_URL;
const REDIS_KEY = process.env.REDIS_KEY || "client-socket";
const io = socketIO(server);
const redisAdapter = socketRedis(REDIS_URL, { key: REDIS_KEY });
/* eslint-enable */

//socket io cluster config
require("./services/socket").default(io, redisAdapter);

/* eslint-disable */
const PORT_NUM = process.env.PORT || 5000;
/* eslint-enable */

const port = PORT_NUM;
server.listen(port);
