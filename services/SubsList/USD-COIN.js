// usdt coins
let coins = [
	"BTC",
	"ETH",
	"BCC",
	"TRX",
	"EOS",
	"ETC",
	"BNB",
	"ADA",
	"XRP",
	"NEO",
	"LTC",
	"TUSD",
	"VET",
	"IOTA",
	"ICX",
	"ONT",
	"QTUM",
	"NULS"
];
let CCCAGGstring = "5~CCCAGG~USDT~";
let cccaggUSDarr = [];
for (let coin of coins) {

	cccaggUSDarr.push(CCCAGGstring + coin);

}

module.exports = cccaggUSDarr;
