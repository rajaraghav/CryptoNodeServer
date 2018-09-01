var QRCode = require("qrcode");

let qrGenerator = (userSecretUrl, userSecretKey, callback) => {

	QRCode.toDataURL(userSecretUrl, (err, dataUrl) => {

		callback(err, dataUrl, userSecretKey);

	});

};
module.exports = qrGenerator;
