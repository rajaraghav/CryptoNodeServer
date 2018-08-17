let axios = require("axios");
let baseURL = "https://min-api.cryptocompare.com/data/pricemultifull?";
let fURL = "fsyms=";
let tURL = "&tsyms=";
function getTSYMS (reqCurrencies) {

	return reqCurrencies.split("~");

}
module.exports = (app) => {

	app.get("/api/coindata", async (req, res) => {

		let from = req.query.from;
		let to = getTSYMS(req.query.to);
		fURL += from;
		for (let tos of to) {

			tURL += `${tos},`;

		}
		tURL = tURL.substring(0, tURL.length - 1);
		let finalURL = baseURL + fURL + tURL;
		let cryptoRes = await axios.get(finalURL);
		let jsonCrypto = cryptoRes.data;
		let coinRawData = jsonCrypto.RAW[from];
		let finRes = [];
		for (let key in coinRawData) {

			let subData = coinRawData[key];
			let data = {};
			data.FROM = from;
			data.TO = key;
			data.PRICE = subData.PRICE;
			data.HIGH24HOUR = subData.HIGH24HOUR;
			data.LOW24HOUR = subData.LOW24HOUR;
			data.CHANGE24HOUR = subData.CHANGE24HOUR;
			data.VOLUME24HOUR = subData.VOLUME24HOUR;
			finRes.push(data);

		}
		res.send(finRes);

	});

};
