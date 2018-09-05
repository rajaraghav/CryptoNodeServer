const Path = require("path-parser").default;
const { URL } = require("url");
const qrGenerator = require("../services/2fa");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const requireCaptcha = require("../middleware/requireCaptcha");
const request = require("request");
const { speakEasyVerifier } = require("../services/speakEasySecret");
const Mailer = require("../services/Mailer");
const mongoose = require("mongoose");
const User = mongoose.model("Users");
const verifyTemplate = require("../services/emailTemplates/verifyTemplates");
/* eslint-disable max-lines-per-function */
module.exports = (app, passport) => {

	app.post(
		"/login",
		requireCaptcha,
		passport.authenticate("local-login", { session: false }),
		(req, res) => {

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
			res.json({
				token,
				user: currUser
			});

		}
	);
	app.post(
		"/signup",
		requireCaptcha,
		passport.authenticate("local-signup", { session: false }),
		(req, res) => {

			const userId = req.user._id.toString();
			request.post({
				form: {
					emailVerificationKey: req.user.emailVerificationKey,
					userEmail: req.user.email,
					userId
				},
				url: "http://localhost:5000/verifyEmail"
			});
			res.json({ success: true });

		}
	);
	app.post("/verify_2fa", (req, res) => {

		let userToken = req.body.googleToken;
		let secret = req.user.twofaSecret;

		var authObj = {
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

		console.log(req.query);
		res.send("Your email has been verified.");

	});
	app.get("/api/changePassword/:userId/:hash", (req, res) => {

		res.send("Your password has been changed.");

	});
	app.post("/api/sendgrid/webhooks", async (req, res) => {

		if (req.body !== undefined || req.body[0].url !== undefined) {

			console.log("called by sendgrid", req.body[0].url);
			const url = req.body[0].url;

			const regPath = new Path("/api/verifyemail/:userId/:hash");
			const matchEmail = regPath.test(new URL(url).pathname);
			if (matchEmail) {

				let verifiedUser = await User.findOne({ _id: matchEmail.userId });
				verifiedUser.verified = true;
				verifiedUser.save();

			}
			res.send({});

		}

	});
	app.post("/verifyEmail", async (req, res) => {

		const verifier = {
			body: "Please click the link below to compolete registration.",
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

		} catch (err) {

			console.log("error", err.response.body);
			res.status(422).send(err);

		}

	});
	app.get(
		"/get_twofaqr",
		passport.authenticate("jwt", { session: false }),
		requireCaptcha,
		(req, res) => {

			qrGenerator(
				req.user.otpAuthUrl,
				req.user.twofaSecret,
				(err, imgsrc, otpAuthSecretKey) => {

					if (err) {

						res.sendStatus(500).send("error");

					}
					res.send({
						imgsrc,
						otpAuthSecretKey
					});

				}
			);

		}
	);

};
