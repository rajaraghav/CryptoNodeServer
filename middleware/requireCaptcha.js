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

		return res.status(404).json({ responseError: "Please select captcha first" });

	}
const sec = keys.captchaSecretKey;
const tok = req.body.captchaToken;
const ip = req.body.remoteAddress;
	try{
	const verificationURL = "https://www.google.com/recaptcha/api/siteverify";
	console.log(verificationURL);

	request.post({url:verificationURL,form:{secret:sec,response:tok}}, (error, response, body) => {
		if(error){return res.json({responseError:"google server error"})}

		console.log("bdy",body);
		let resBody = JSON.parse(body);
		if (typeof resBody.success !== "undefined" && !resBody.success) {

			return res.json({ responseError: "Failed captcha verification" });

		}
		next();
		});
	}
		catch(err)
		{
			console.log(err);
		}

};
