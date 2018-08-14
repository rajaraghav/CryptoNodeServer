/*
Streaming service for fetching realtime data from cryptocompare.
Exposes a socketClient
 "BTC"ETH"BCC"TRX"EOS"ETC"BNB"ADA"XRP"NEO"LTC"TUSD"VET"IOTA"ICX"ONT"QTUM"NULS"

*/
let subscriptionArr = require("./SubsList/subscriptions");
let streamUrl = "https://streamer.cryptocompare.com/";
let socketClient = require("socket.io-client")(streamUrl);
socketClient.emit("SubAdd", { subs: subscriptionArr });
module.exports = socketClient;
