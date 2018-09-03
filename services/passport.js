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
passport.use(new JWTStrategy(
	{
		jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
		secretOrKey: keys.jwtKey
	},
	async (jwtPayload, done) => {

		try {

			const user = await User.findOne({ _id: jwtPayload.id });
			if (user) {

				return done(null, user);

			}

			return done(null, false);

		} catch (err) {

			done(err, null);

		}

	}
));
passport.use(
	"local-signup",
	new LocalStrategy(
		{
			passReqToCallback: true,
			passwordField: "password",
			usernameField: "email"
		},
		/* eslint-disable max-params */

		async (req, email, password, done) => {

			try {

				const existingUser = await User.findOne({ email });
				if (existingUser) {

					return done(null, false);

				}

				bcrypt.hash(password, saltRounds, async (err, hash) => {

					if (err) {

						return done(err, null);

					}
					let speakEasyObj = speakEasyValueGenerator(email);
					let newUser = {
						email,
						otpAuthUrl: speakEasyObj.otpAuthURL,
						password: hash,
						twofaSecret: speakEasyObj.value
					};
					return done(null, await new User(newUser).save());

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
			passReqToCallback: true,
			passwordField: "password",
			usernameField: "email"
		},
		async (req, email, password, done) => {

			try {

				const existingUser = await User.findOne({ email });
				if (existingUser) {

					bcrypt.compare(password, existingUser.password, (err, res) => {

						if (err) {

							return done(err, null);

						}
						if (!res) {

							return done(null, false);

						}

						return done(null, existingUser);

					});

				}

			} catch (err) {

				done(err, null);

			}

		}
	)
);
