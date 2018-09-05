const keys = require("../config/keys");
var request = require("request");
module.exports = (req, res, next) => {

	console.log(req.body);
	console.log(req.connection.remoteAddress);
	if (
		typeof req.body.captchaToken === "undefined" ||
		req.body.captchaToken === "" ||
		req.body.captchaToken === null
	) {

		return res.json({ responseError: "Please select captcha first" });

	}
	try {

		const verificationURL = `https://www.google.com/
    recaptcha/api/siteverify?secret=${keys.captchaSecretKey}&response=${
	req.body.captchaToken
}&remoteip=${req.connection.remoteAddress}`;
		console.log(verificationURL);
		request.post(verificationURL, (error, response, body) => {

			if (error) {

				return res.json({ responseError: "google server error" });

			}
			console.log("resp", response);
			console.log("bdy", body);
			let resBody = JSON.parse(body);
			if (typeof resBody.success !== "undefined" && !resBody.success) {

				return res.json({
					responseError: "Failed captcha verification"
				});

			}
			next();

		});

	} catch (err) {

		console.log(err);

	}

};
