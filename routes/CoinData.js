let axios = require("axios");
let allCoinsSyms = require("../config/allCoinsSyms");
let baseURL = "https://min-api.cryptocompare.com/data/pricemultifull?";
let fURL = "";
let tURL = "";
function getTSYMS(reqCurrencies) {
	return reqCurrencies.split("~");
}
function getFSYMS(reqCurrencies) {
	return reqCurrencies.split("~");
}
module.exports = app => {
	app.get("/api/coindata", async (req, res) => {
		let from = getFSYMS(req.query.from);
		let to = getTSYMS(req.query.to);
		console.log("from", from);
		console.log("to", to);
		(fURL = ""), (tURL = "");
		for (let froms of from) {
			fURL += froms + ",";
		}
		console.log("FromData", fURL);
		for (let tos of to) {
			tURL += `${tos},`;
		}
		console.log("ToDAata", tURL);
		tURL = tURL.substring(0, tURL.length - 1);
		fURL = fURL.substring(0, fURL.length - 1);
		let finalURL = baseURL + "fsyms=" + fURL + "&tsyms=" + tURL;
		console.log("FinalURL", finalURL);
		let cryptoRes = await axios.get(finalURL);
		let jsonCrypto = cryptoRes.data;
		console.log("GETDATA", jsonCrypto);

		let finRes = [];
		for (let froms of from) {
			let coinRawData = jsonCrypto.RAW[froms];
			//console.log("coinRawData", coinRawData);
			for (let key in coinRawData) {
				let subData = coinRawData[key];
				let data = {};
				data.FROM = froms;
				data.TO = key;
				if (allCoinsSyms[froms] !== undefined)
					data.FROMFULLNAME = allCoinsSyms[froms];
				if (allCoinsSyms[key] !== undefined)
					data.TOFULLNAME = allCoinsSyms[key];
				data.PRICE = subData.PRICE;
				data.HIGH24HOUR = subData.HIGH24HOUR;
				data.LOW24HOUR = subData.LOW24HOUR;
				data.CHANGE24HOUR = subData.CHANGE24HOUR;
				data.VOLUME24HOUR = subData.TOTALVOLUME24HTO;
				data.CHANGEPCT24HOUR = subData.CHANGEPCT24HOUR;
				finRes.push(data);
			}
		}

		res.send(finRes);
	});
	app.get("/api/getCoinName", async (req, res) => {
		res.send(allCoinsSyms[req.query.sym]);
	});
};
