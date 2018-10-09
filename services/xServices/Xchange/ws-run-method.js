
import { checkMethod } from './check-method'

const WebSocket = require('ws');
let call_id = 0; 
let ws_url = 'ws://localhost:8888';
let ws = null; 

function start_ws(onready, onmessage) {
    var created_ws = false;
    if (ws == null || ws.readyState != 1) {
        ws = new WebSocket(ws_url);
        created_ws = true;
    }
    ws.on('open' , function (event) {
        console.log("opened ws to '" + ws_url + "'");
        onready(ws);
    })
    ws.on('message' , function(event) {
        onmessage(ws, event);
    })
    ws.on('error' , function(event) {
        console.log("ws error (" + event + ")");
    });
    ws.on('close' , function(event) {
        console.log("ws closed (" + event.code + ")");
    });
    if (!created_ws)
        onready(ws);
}

function call_ws_server(payload) {
    call_id++;
    let params = payload.params;
    let method = payload.method;
    console.log(method);
    console.log(params);
    start_ws(
        function (sock) {
            var req = JSON.stringify({id: call_id, method: method, params: params});
            sock.send(req);
        },
        function (sock, data) {
            console.log(data);
           // var obj = JSON.parse(data);
          //  console.log(obj);
        }
    );
}


export const wsRunMethod = async (method, _payload, role = 'public', opts = {}) => {
  console.log(method,_payload,role,opts)
  const params = checkMethod(method, _payload, role, opts)

  const payload = {
    method,
    params: params || []
  }

  console.log('payload', payload)

  return call_ws_server(payload)
    .then(json => JSON.parse(json.text))
}
