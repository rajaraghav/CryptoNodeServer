const qrGenerator = require("../services/2fa");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const { speakEasyVerifier } = require("../services/speakEasySecret");
/* eslint-disable max-lines-per-function */
module.exports = (app, passport) => {

	app.post(
		"/login",
		passport.authenticate("local-login", { session: false }),
		(req, res) => {

			let currUser = {
				email: req.user.email,
				/* eslint-disable */
				id: req.user._id
				/* eslint-enable */
			};
			const token = jwt.sign(currUser, keys.jwtKey);
			res.json({
				token,
				user: currUser
			});

		}
	);
	app.post("/signup", passport.authenticate("local-signup"), (req, res) => {

		res.send("success");
		//res.send({ success: true });

	});
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
	app.get(
		"/get_twofaqr",
		passport.authenticate("jwt", { session: false }),
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
