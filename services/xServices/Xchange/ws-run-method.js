const WebSocket = require("ws");
let callId = 0;
let wsUrl = "ws://localhost:8888";
let ws = null;
let socketServer = null;
let startWs = (onready, onmessage) => {

	var createdWs = false;
	if (ws === null || ws.readyState !== 1) {

		ws = new WebSocket(wsUrl);
		createdWs = true;

	}
	ws.on("open", (event) => {

		console.log(`opened ws to '${wsUrl}'`, event);
		onready(ws);

	});
	ws.on("message", (event) => {

		onmessage(event);

	});
	ws.on("error", (event) => {

		console.log(`ws error (${event})`);

	});
	ws.on("close", (event) => {

		console.log(`ws closed (${event.code})`);

	});
	if (!createdWs) {

		onready(ws);

	}

};
let callWsServer = (payload) => {

	callId += 1;
	let { params, method, socketId } = payload;
	startWs(
		(sock) => {

			var req = JSON.stringify({
				id: callId,
				method,
				params
			});
			sock.send(req);

		},
		(data) => {

			console.log(data);
			socketServer.to(socketId).emit("xresponse", data);

		}
	);

};
/* eslint-disable max-params*/
export const wsRunMethod = (
	method,
	params,
	socketId,
	role = "public",
	opts = {}
) => {

	/* eslint-enable max-params*/
	console.log(method, params, socketId, role, opts);

	const payload = {
		method,
		params: params || [],
		socketId
	};
	callWsServer(payload);

};
export const xchangeWs = (io) => {

	socketServer = io;
	socketServer.on("connection", (socket) => {

		socket.on("wsx", (dat) => {

			console.log(dat);
			wsRunMethod(dat.method, dat.params, socket.id);

		});

	});

};
