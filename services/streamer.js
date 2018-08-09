/*
Streaming service for fetching realtime data from cryptocompare.
Exposes a socketClient
*/
let streamUrl = "https://streamer.cryptocompare.com/";
let socketClient = require("socket.io-client")(streamUrl);
let subscription = [
	"5~CCCAGG~BTC~USD",
	"5~CCCAGG~ETH~USD",
	"5~CCCAGG~BTC~USD",
	"11~BTC",
	"11~ETH"
];
socketClient.emit("SubAdd", { subs: subscription });
module.exports = socketClient;
