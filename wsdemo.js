const io = require("socket.io-client");
const ioClient = io.connect("http://localhost:9000");
ioClient.on("xresponse", (msg) => console.info(msg));
ioClient.emit('wsx',{method:"server.auth",params:["eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsImlkIjoiNWJjMGE2N2Q1M2RkZjU1NjE4OTEzNmFhIiwieGlkIjoxLCJpYXQiOjE1Mzk1MTM1MTksImV4cCI6MTUzOTY4NjMxOX0.Sb-eD1KHIpDNa7dLs7hh74TcugYDpnAv4UsyrX6GziU","web"]});
