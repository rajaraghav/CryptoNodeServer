const speakeasy = require("speakeasy");

const generateSecret = () => speakeasy.generateSecret({ length: 20 });
const generateSecret32 = () => {

	let speakEasySecret = speakeasy.generateSecret({ length: 20 });
	let secretObj = {
		otpAuthURL: speakEasySecret.otpauth_url,
		value: speakEasySecret.base32
	};
return speakEasyObj;

};
const verify = (authObj) => speakeasy.totp.verify(authObj);
const generateOAuthUrl = (userSecret) => {

	let otpAuthUrlObj = {
		oAuthUrl: speakeasy.otpauthURL({
			algorithm: "sha512",
			label: "WebExchange",
			secret: userSecret
		}),
		secretKey: userSecret
	};
	/*eslint-disable newline-before-return*/
	return otpAuthUrlObj;

};
module.exports = generateSecret;
module.exports.speakEasyVerifier = verify;
module.exports.speakEasyValueGenerator = generateSecret32;
module.exports.generateOAuthUrl = generateOAuthUrl;
