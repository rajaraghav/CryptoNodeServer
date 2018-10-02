const Path = require("path-parser").default;
const { URL } = require("url");
const qrGenerator = require("../services/2fa");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const keys = require("../config/keys");
const requireCaptcha = require("../middleware/requireCaptcha");
const request = require("request");
const { speakEasyVerifier } = require("../services/speakEasySecret");
const Mailer = require("../services/Mailer");
const mongoose = require("mongoose");
const User = mongoose.model("Users");
const verifyTemplate = require("../services/emailTemplates/verifyTemplates");
const passwordTemplate = require("../services/emailTemplates/passwordTemplates");
/* eslint-disable max-lines-per-function */
module.exports = (app, passport) => {

	app.post(
		"/login",
		requireCaptcha,
		passport.authenticate("local-login", { session: false }),
		(req, res) => {

			console.log("POST /login", req.body);
			if (typeof req.user.email === "undefined") {

				console.log(req.user);
				res.status(401).json({
					responseError: req.user
				});

			} else {

				let currUser = {
					email: req.user.email,
					/* eslint-disable */
					id: req.user._id
					/* eslint-enable */
				};
				const token = jwt.sign(currUser, keys.jwtKey, {
					// define time here.
					expiresIn: 48 * 60 * 60
				});
				res.status(200).json({
					token,
					user: currUser
				});

			}

		}
	);
	app.post(
		"/signup",
		requireCaptcha,
		passport.authenticate("local-signup", { session: false }),
		(req, res) => {

			console.log("POST /signup", req.body);
			if (typeof req.user._id === "undefined") {

				res.status(403).json({ responseError: req.user });

			} else {

				const userId = req.user._id.toString();
				try {

					request.post({
						form: {
							emailVerificationKey: req.user.emailVerificationKey,
							userEmail: req.user.email,
							userId
						},
						url: `${keys.redirectClickUrl}/verifyEmail`
					});

				} catch (ex) {

					console.log("request exception in signup");
					res.status(500).json({ responseError: ex });

				}
				res.status(200).json({ response: "signup successful." });

			}

		}
	);
	app.post("/verify_2fa", (req, res) => {

		console.log("POST /signup", req.body);

		let userToken = req.body.googleToken;
		let secret = req.user.twofaSecret;

		let authObj = {
			encoding: "base32",
			secret,
			token: userToken
		};
		if (speakEasyVerifier(authObj)) {

			res.status(200).send("successful");

		} else {

			res.status(403).send("failed");

		}

	});
	app.get("/api/verifyemail/:userId/:hash", (req, res) => {

		console.log("POST /signup", req.query, req.params);
		res.status(200).send("Your email has been verified.");

	});

	app.post("/api/changePassword/:token", async (req, res) => {

		console.log("POST /api/changePassword/:token", req.body);
		console.log(req.body.password);

		try {

			let decoded = jwt.verify(req.params.token, keys.jwtKey);
			console.log(decoded);
			let currUser = await User.findById(decoded.currUser);
			if (typeof currUser === "undefined" || currUser === null) {

				res.
					status(403).
					send({ responseError: "No such user or illegal token." });

			}
			bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {

				if (err) {

					res.status(500).send({ responseError: `server error ${err}` });

				}
				currUser.password = hash;
				await currUser.save();
				console.log(currUser);
				res.status(200);

			});

		} catch (ex) {

			res.status(403).send({ responseError: "wrong jwt token." });

		}

	});
	/* eslint-disable max-statements,max-len*/
	app.post("/api/sendgrid/webhooks", async (req, res) => {

		console.log("POST /api/sendgrid/webhooks", req.body);
		if (
			typeof req.body !== "undefined" ||
			typeof req.body[0].url !== "undefined"
		) {

			const [{ url }] = req.body;
			try {

				let regEmailPath = new Path("/api/verifyemail/:userId/:hash");
				const matchEmail = regEmailPath.test(new URL(url).pathname);
				//const matchPassword = regPasswordPath.test(new URL(url).pathname);
				if (matchEmail) {

					let verifiedUser = await User.findOne({ _id: matchEmail.userId });
					if (verifiedUser.emailVerificationKey === matchEmail.hash) {

						verifiedUser.verified = true;
						verifiedUser.save();

					}

				}
				res.end();

			} catch (ex) {

				console.log("error in sengrid post path", ex, url);
				res.end();

			}
			//const regPasswordPath = new Path("/api/changepassword/:hash");

		}
		res.end();

	});
	/* eslint-enable max-statements */
	app.post("/verifyEmail", async (req, res) => {

		console.log("POST /verifyEmail", req.body);
		const verifier = {
			body: "Please click the link below to complete registration.",
			dateSent: Date.now(),
			recipients: [req.body.userEmail],
			subject: "Action needed for your account at Binance",
			title: "Verify email for Binance."
		};

		const mailer = new Mailer(
			verifier,
			verifyTemplate(req.body.userId, req.body.emailVerificationKey)
		);
		try {

			await mailer.send();
			res.end();

		} catch (err) {

			console.log("error", err.response.body);
			res.status(422).send(err);

		}

	});
	/* eslint-disable max-statements*/
	app.post("/changepassword", async (req, res) => {

		console.log("POST /changepassword", req.body);
		const changer = {
			body: "Please click the link below to change your password.",
			dateSent: Date.now(),
			recipients: [req.body.userEmail],
			subject: "Action needed for your account at Binance",
			title: "Password change request for your account on Binance."
		};
		const currUser = await User.findOne({ email: req.body.userEmail });
		if (typeof currUser === "undefined" || currUser === null) {

			return res.status(404).send({ responseError: "user does not exist" });

		}
		const token = jwt.sign({ currUser: currUser._id.toString() }, keys.jwtKey, {
			// define time here.
			expiresIn: 48 * 60 * 60
		});
		const mailer = new Mailer(changer, passwordTemplate(token));
		try {

			await mailer.send();
			return res.status(200).send({ response: "reset password mail sent." });

		} catch (err) {

			console.log("error", err.response.body);
			return res.status(422).send(err);

		}

	});
	app.get(
		"/get_twofaqr",
		passport.authenticate("jwt", { session: false }),
		requireCaptcha,
		(req, res) => {

			console.log("GET /get_twofaqr", req.params, req.query);
			qrGenerator(
				req.user.otpAuthUrl,
				req.user.twofaSecret,
				(err, imgsrc, otpAuthSecretKey) => {

					if (err) {

						res.status(500).send("error");

					}
					res.status(200).send({
						imgsrc,
						otpAuthSecretKey
					});

				}
			);

		}
	);

};
