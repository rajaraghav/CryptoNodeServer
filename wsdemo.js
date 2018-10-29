const io = require("socket.io-client");
const ioClient = io.connect("http://localhost:9000");
ioClient.on("xresponse", msg => console.info(msg));

// ioClient.emit("wsx", {
//   method: "server.auth",
//   params: [
//     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAZ21haWwuY29tIiwiaWQiOiI1YmIwZmUxZGY2YjBhZTQ3MzI2NTk0YTIiLCJpYXQiOjE1Mzk0NDg0OTksImV4cCI6MTUzOTYyMTI5OX0.M8zuKJICVdC1JMGeXM76tsjcW6ALaJCtE00LujMOVas",
//     "web"
//   ]
// });

// ioClient.emit("wsx", {
//   method: "order.query",
//   params: ["BTCETH", 0, 100]
// });

// ioClient.emit("wsx", {
//   method: "price.query",
//   params: { market: "ETHBTC" },
//   role: "public"
// });

ioClient.emit("wsx", {
  method: "today.query",
  params: { market: "ETHBTC" },
  role: "public"
});
