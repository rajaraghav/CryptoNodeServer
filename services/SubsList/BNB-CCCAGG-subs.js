let coins = require("./coins").default;
let CCCAGGstring = "5~CCCAGG~BNB~";
let cccaggBNBarr = [];
for (let coin of coins) {

	cccaggBNBarr.push(CCCAGGstring + coin);

}

module.exports = cccaggBNBarr;
