let cccaggSubs = require("./CCCAGG-subs");
let currentCoinsubs = require("./CURRENT-COIN-USD-subs");
let tradeCoinsubs = require("./TRADE-COIN-USD-subs");
let tempArr1 = cccaggSubs.concat(currentCoinsubs);
let tempArr2 = tempArr1.concat(tradeCoinsubs);
module.exports = tempArr2;
