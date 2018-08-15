// socketClient and cccUtilities object from services.
let CCC = require("./cccStreamerUtilities");
let socketClient = require("./streamer");

const io = (socketIo, redisAdapter) => {

	//Server Socket Settings
	socketIo.adapter(redisAdapter);
	//Server socket Settings end.

	/* Server socket emits data to it's react clients on recieving data
	   from cryptoCompare socket connection.
	   These are the events you can listen to.
	   	"TRADE",
    	"FEEDNEWS",
    	"CURRENT",
    	"LOADCOMPLETE",
    	"COINPAIRS",
    	"CURRENTAGGREGATE",
    	"TOPLIST",
    	"TOPLISTCHANGE",
    	"ORDERBOOK",
    	"FULLORDERBOOK",
    	"ACTIVATION",
    	"FULLVOLUME",
    	"TRADECATCHUP",
    	"NEWSCATCHUP",
    	"TRADECATCHUPCOMPLETE",
    	"NEWSCATCHUPCOMPLETE"
	*/
	socketClient.on("m", (data) => {

		let unpackedData = CCC.CURRENT.unpack(data);
		console.log(unpackedData);
		let textType = CCC.STATIC.TYPE_INVERTED[unpackedData.TYPE];
		unpackedData.TYPE = textType;
		console.log(textType);
		console.log(unpackedData);
		console.log("done");
		socketIo.emit(textType, unpackedData);

	});

};
exports.default = io;