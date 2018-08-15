let coins = require("./coins").default;
let defaultExchangeArr = require("./exchanges").default;

let USDSTRING = "~USD";
let Currarr = [];
for (let defaultExchange of defaultExchangeArr) {

	let SUBstring = `2~${defaultExchange}~`;
	for (let coin of coins) {

		Currarr.push(SUBstring + coin + USDSTRING);

	}

}
module.exports = Currarr;
