const express = require("express") ;
const { createServer } = require("http") ;
const { Server } = require("socket.io") ;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors:{
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log(`${socket.id} user connected`);
  // console.log(socket);
  socket.on("message", (msg)=>{
    // console.log(msg);
    io.emit("message", `${socket.id} said ${msg}`)
  })
});

httpServer.listen(5000, ()=>{
  console.log("chat server is online");
});