<<<<<<< HEAD
let ngHost = "wss://echo.websocket.org";

var WebSocketClient = require("websocket").client;
var client = new WebSocketClient();
client.on("connectFailed", (error) => {

	console.log(`Connect Error: ${error.toString()}`);

});

client.on("connect", (connection) => {

	console.log("WebSocket Client Connected", connection);
	connection.on("error", (error) => {

		console.log(`Connection Error: ${error.toString()}`);

	});
	connection.on("close", () => {

		console.log("echo-protocol Connection Closed");

	});
	connection.on("message", (message) => {

		if (message.type === "utf8") {

			console.log(`Received: '${message.utf8Data}'`);

		}

	});

	let sendNumber = () => {

		if (connection.connected) {

			let number = Math.round(Math.random() * 0xffffff);
			connection.sendUTF(number.toString());
			setTimeout(sendNumber, 1000);

		}

	};
	sendNumber();

});

client.connect(
	ngHost,
	null,
	null,
	null
);
=======

const io = require("socket.io-client"),
ioClient = io.connect("http://localhost:9000");

ioClient.on("xresponse", (msg) => console.info(msg));
ioClient.emit('wsx',{method:"server.ping"});
>>>>>>> 3cf4fd4a27d65ad0a2852358fab4fdaf5259497a
