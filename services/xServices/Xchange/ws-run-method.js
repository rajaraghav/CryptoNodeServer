import { checkMethod } from "./check-method";

const WebSocket = require("ws");
let callId = 0;
let wsUrl = "ws://localhost:8888";
let ws = null;
function start_ws (onready, onmessage) {

	var created_ws = false;
	if (ws == null || ws.readyState != 1) {

		ws = new WebSocket(wsUrl);
		created_ws = true;

	}
	ws.on("open", (event) => {

		console.log(`opened ws to '${wsUrl}'`);
		onready(ws);

	});
	ws.on("message", (event) => {

		onmessage(ws, event);

	});
	ws.on("error", (event) => {

		console.log(`ws error (${event})`);

	});
	ws.on("close", (event) => {

		console.log(`ws closed (${event.code})`);

	});
	if (!created_ws) {

		onready(ws);

	}

}

function call_ws_server (payload) {

	callId++;
	let params = payload.params;
	let method = payload.method;
	console.log(method);
	console.log(params);
	return start_ws(
		(sock) => {

			var req = JSON.stringify({
				id: callId,
				method,
				params
			});
			sock.send(req);

		},
		(sock, data) => {

			console.log(data);

		}
	);

}

export const wsRunMethod = async (
	method,
	_payload,
	role = "public",
	opts = {}
) => {

	console.log(method, _payload, role, opts);
	const params = checkMethod(method, _payload, role, opts);

	const payload = {
		method,
		params: params || []
	};
	console.log("payload", payload);

	return call_ws_server(payload).then((json) => JSON.parse(json.text));

};
