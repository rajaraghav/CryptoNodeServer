// socketClient and cccUtilities object from services.
let CCC = require("./cccStreamerUtilities");
let socketClient = require("./streamer");

const io = (socketIo, redisAdapter) => {

	//Server Socket Settings
	socketIo.adapter(redisAdapter);
	socketIo.on("connection", (socket) => {

		console.log("conected tp", socket.id);
		socket.emit("ssup", "hello");

	});
	//Server socket Settings end.

	/* Server socket emits data to it's react clients on recieving data
	   from cryptoCompare socket connection.
	*/
	socketClient.on("m", (data) => {

		let unpackedData = CCC.CURRENT.unpack(data);
		let textType = CCC.STATIC.TYPE_INVERTED[unpackedData.TYPE];
		unpackedData.TYPE = textType;
		socketIo.emit(textType, unpackedData);

	});

};
exports.default = io;
