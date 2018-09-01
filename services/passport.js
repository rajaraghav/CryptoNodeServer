var bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const { speakEasyValueGenerator } = require("./speakEasySecret");
const keys = require("../config/keys");
const saltRounds = 10;
const User = mongoose.model("Users");

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

passport.use(
	"local-signup",
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password",
			passReqToCallback: true
		},
		async (req, email, password, done) => {
			try {
				const existingUser = await User.findOne({ email: email });

				if (existingUser) {
					return done(JSON.stringify({ message: "already exists" }), false);
				}

				bcrypt.hash(password, saltRounds, async function(err, hash) {
					if (err) return done(err, null);
					let speakEasyObj = speakEasyValueGenerator();
					console.log(speakEasyObj);
					let newUser = {
						email: email,
						otpAuthUrl: speakEasyObj.otpAuthURL,
						password: hash,
						twofaSecret: speakEasyObj.value
					};
					const user = await new User(newUser).save();
					console.log(user);
					return done(null, user);
				});
			} catch (err) {
				return done(err, null);
			}
		}
	)
);

passport.use(
	"local-login",
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password",
			passReqToCallback: true
		},
		async (req, email, password, done) => {
			try {
				const existingUser = await User.findOne({ email: email });
				console.log(password);
				if (existingUser) {
					console.log(existingUser);
					bcrypt.compare(password, existingUser.password, function(err, res) {
						if (err) return done(err, null);
						console.log(res);
						if (!res) return done(null, false);

						return done(null, existingUser);
					});
				}
			} catch (err) {
				done(err, null);
			}
		}
	)
);
