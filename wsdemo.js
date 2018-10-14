const io = require("socket.io-client");
const ioClient = io.connect("http://localhost:9000");
ioClient.on("xresponse", (msg) => console.info(msg));
ioClient.emit('wsx',{method:"server.auth",params:["acacas","web"]});
