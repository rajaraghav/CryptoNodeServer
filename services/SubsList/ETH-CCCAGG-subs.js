let coins = require("./coins").default;
let CCCAGGstring = "5~CCCAGG~ETH~";
let cccaggETHarr = [];
for (let coin of coins) {

	cccaggETHarr.push(CCCAGGstring + coin);

}

module.exports = cccaggETHarr;
