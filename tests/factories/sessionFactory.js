const { Buffer } = require("safe-buffer");
const keys = require("../../config/keys");
const KeyGrip = require("keygrip");
const kgrip = new KeyGrip([keys.cookieKey]);
module.exports = (user) => {

	/*eslint-disable*/
	const sessionObject = { passport: { user: user._id.toString() } };
	const session = Buffer.from(JSON.stringify(sessionObject)).toString("base64");
	const sig = kgrip.sign("session=", session);

	return {
		session,
		sig
	};
};
