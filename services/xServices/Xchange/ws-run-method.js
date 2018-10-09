
import { checkMethod } from './check-method'

const WebSocket = require('ws');
let call_id = 0; 
let ws_url = 'ws://localhost:8888';
let ws = null; 
let socketServer = null;
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
        onmessage(event);

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
    let {params,method,socketId}=payload;

        start_ws(
        function (sock) {
            var req = JSON.stringify({id: call_id, method: method, params: params});
            sock.send(req);
        },
        function (data) {
            console.log(data);
            socketServer.to(socketId).emit('xresponse',data);
           // var obj = JSON.parse(data);
          //  console.log(obj);
        }
    )

}


export const wsRunMethod = async (method, params,socketId, role = 'public', opts = {}) => {
  console.log(method,params,role,opts)
  
  const payload = {
    method,
    params: params || [],
    socketId
  }

  console.log('payload', payload)

  call_ws_server(payload);
}
export const xchangeWs = function (io)
 {
     socketServer = io;
     socketServer.on('connection',socket=>{
         socket.on('wsx',dat=>{
             console.log(dat);
            wsRunMethod(dat.method,dat.params,socket.id)
         })
     })
 }
 