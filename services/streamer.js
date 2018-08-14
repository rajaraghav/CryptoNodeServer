/*
Streaming service for fetching realtime data from cryptocompare.
Exposes a socketClient
*/
let streamUrl = "https://streamer.cryptocompare.com/";
let socketClient = require("socket.io-client")(streamUrl);
let subscription = [
	"5~CCCAGG~BTC~USD",
	"5~CCCAGG~ETH~USD",
	"11~BTC",
	"0~Poloniex~BTC~USD",
	"2~Poloniex~BTC~USD",
	"0~Poloniex~ETH~USD",
	"2~Poloniex~ETH~USD",
	"11~ETH"
];
socketClient.emit("SubAdd", { subs: subscription });
module.exports = socketClient;
