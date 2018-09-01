const qrGenerator = require("../services/2fa");
const { speakEasyVerifier } = require("../services/speakEasySecret");
/* eslint-disable max-lines-per-function */
module.exports = (app, passport) => {

	app.post("/login", passport.authenticate("local-login"), (req, res) => {

		let currUser = {
			email: req.user.email,
			/* eslint-disable */
			id: req.user._id
			/* eslint-enable */
		};
		res.send(currUser);

	});
	app.post("/signup", passport.authenticate("local-signup"), (req, res) => {

		res.send({ success: true });

	});
	app.post("/verify_2fa", (req, res) => {

		let userToken = req.body.token;
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
	app.get("/get_twofaqr", (req, res) => {

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

	});

};
