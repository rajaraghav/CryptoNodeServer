const mongoose = require("mongoose");
let { Schema } = mongoose;

let UserSchema = new Schema({
	email: String,
	lastIP: String,
	lastLogin: String,
	otpAuthUrl: String,
	password: String,
	twofaSecret: String
});
// UserSchema.methods.generateHash = (password) => {

// 	bcrypt.hash(password, saltRounds, (err, hash) => hash);

// };

mongoose.model("Users", UserSchema);
