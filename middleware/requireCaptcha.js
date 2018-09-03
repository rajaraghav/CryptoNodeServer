const keys = require("../config/keys");
var request = require("request");
module.exports = (req, res, next) => {

	if (
		typeof req.body.captchaToken === "undefined" ||
		req.body.captchaToken === "" ||
		req.body.captchaToken === null
	) {

		return res.json({ responseError: "Please select captcha first" });

	}

	const verificationURL = `https://www.google.com/
    recaptcha/api/siteverify?secret=${keys.captchaSecretKey}&response=${
	req.body.captchaToken
}&remoteip=${req.connection.remoteAddress}`;
	request(verificationURL, (error, response, body) => {

		let resBody = JSON.parse(body);
		if (typeof resBody.success !== "undefined" && !resBody.success) {

			return res.json({ responseError: "Failed captcha verification" });

		}
		next();

	});

	return res.status(500).send({ status: "something went wrong" });

};
