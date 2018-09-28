const mongoose = require("mongoose");
let { Schema } = mongoose;

const roles = ['user', 'admin']

let UserSchema = new Schema({
	email: String,
	emailVerificationKey: String,
	lastIP: String,
	lastLogin: String,
	otpAuthUrl: String,
	xid: Number,
	password: String,
	twofaSecret: String,
	name: {
		type: String,
	  },
	role: {
		type: String,
		enum: roles,
		default: 'user'
	  },
	  xid: {
		type: Number,
		unique: true,
		default: 0
	  },
	verified: Boolean
});
UserSchema.pre('save', function (next) {
	const User = model
  
	if (this.isNew) {
	  User.countDocuments().then(res => {
		this.xid = res + 1 // start from one
		next()
	  })
	} else {
	  next()
	}
  })
// UserSchema.methods.generateHash = (password) => {

// 	bcrypt.hash(password, saltRounds, (err, hash) => hash);

// };

const model = mongoose.model("Users", UserSchema);
