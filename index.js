var express = require("express");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

require("./routes/users")(app);

/* eslint-disable */
const PORT_NUM = process.env.PORT || 5000;
/* eslint-enable */

const port = PORT_NUM;
app.listen(port);

module.exports = app;
