// socketClient and cccUtilities object from services.
let CCC = require("./cccStreamerUtilities");
let socketClient = require("./streamer");

const io = (socketIo) => {

	
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

	socketIo.on("connection", (socket) => {

		console.log("connected to");

	});
	socketClient.on("m", (data) => {

		//console.log(data);
		let unpackedData = CCC.CURRENT.unpack(data);
		let textType = CCC.STATIC.TYPE_INVERTED[unpackedData.TYPE];
		unpackedData.TYPE = textType;
		//console.log("sckt", unpackedData);
		socketIo.emit(textType, unpackedData);

	});

};
exports.default = io;
