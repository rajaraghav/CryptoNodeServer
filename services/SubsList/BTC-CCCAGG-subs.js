let coins = require("./coins").default;
let CCCAGGstring = "5~CCCAGG~BTC~";
let cccaggBTCarr = [];
for (let coin of coins) {

	cccaggBTCarr.push(CCCAGGstring + coin);

}

module.exports = cccaggBTCarr;
