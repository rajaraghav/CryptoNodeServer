var bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const mongoose = require("mongoose");
const { speakEasyValueGenerator } = require("./speakEasySecret");
const keys = require("../config/keys");
const saltRounds = 10;
const User = mongoose.model("Users");

passport.use(
	new JWTStrategy(
		{
			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
			secretOrKey: keys.jwtKey
		},
		async (jwtPayload, done) => {
			try {
				const user = await User.findOne({ _id: jwtPayload.id });
				if (user) {
					return done(null, user);
				} else return done(null, false);
			} catch (err) {
				done(err, null);
			}
		}
	)
);
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
					return done(null, false);
				}

				bcrypt.hash(password, saltRounds, async function(err, hash) {
					if (err) return done(err, null);
					let speakEasyObj = speakEasyValueGenerator(email);
					let newUser = {
						email: email,
						otpAuthUrl: speakEasyObj.otpAuthURL,
						password: hash,
						twofaSecret: speakEasyObj.value
					};
					const user = await new User(newUser).save();
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
				if (existingUser) {
					bcrypt.compare(password, existingUser.password, function(err, res) {
						if (err) return done(err, null);
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
