const speakeasy = require("speakeasy");
const generateOAuthUrl = (userSecret, userEmail) => speakeasy.otpauthURL({
	algorithm: "sha512",
	label: `WebExchange ${userEmail}`,
	secret: userSecret
});

const generateSecret = () => speakeasy.generateSecret({ length: 20 });
const generateSecret32 = (userEmail) => {

	let speakEasySecret = generateSecret();
	let secretObj = {
		otpAuthURL: generateOAuthUrl(speakEasySecret.base32, userEmail),
		value: speakEasySecret.base32
	};
return secretObj;

};
const verify = (authObj) => speakeasy.totp.verify(authObj);
module.exports = generateSecret;
module.exports.speakEasyVerifier = verify;
module.exports.speakEasyValueGenerator = generateSecret32;
module.exports.generateOAuthUrl = generateOAuthUrl;
