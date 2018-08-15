let coins = require("./coins").default;

let CCCAGGstring = "5~CCCAGG~";
let USDSTRING = "~USD";
let cccaggBTCarr = [];
for (let coin of coins) {

	cccaggBTCarr.push(CCCAGGstring + coin + USDSTRING);

}
module.exports = cccaggBTCarr;
