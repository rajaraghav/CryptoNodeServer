const socket = require('socket.io-client')("http://localhost:8888")

socket.on('connection',(socket)=>{
    console.log(socket);
})
console.log(socket.emit("DAJ"))