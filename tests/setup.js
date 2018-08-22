const keys = require("../config/keys");
require("../model/user");
const mongoose = require("mongoose");
jest.setTimeout(30000);
mongoose.Promise = global.Promise;
mongoose.connect(
	keys.mongoURI,
	{ useNewUrlParser: true }
);

afterAll((done) => {

	mongoose.connection.close();
	done();

});
