import http from "http";
import { Server } from "socket.io";
import { AllMessage } from "./types";
import NodeCache from "node-cache"

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "http://localhost:1234",
    methods: ["GET", "POST"],
  },
});
const userSocketCache = new NodeCache();

io.on("connection", (socket) => {
  console.log("a user connected");
  const userId = socket.handshake.query.userId as string;

  userSocketCache.set(userId, socket.id);

  console.log(userSocketCache)
  console.log(userSocketCache.keys());
  io.emit("update users", userSocketCache.keys())

  socket.on("disconnect", () => {
    console.log("user disconnected");

    const disconnectedSocketId = socket.id;
    const userIds = userSocketCache.keys();
    userIds.forEach((userId) => {
      const socketId = userSocketCache.get(userId);
      if (socketId === disconnectedSocketId) {
        userSocketCache.del(userId);
        console.log(`User ${userId} disconnected`);
      }
    })

    io.emit("update users", userSocketCache.keys())

    // console.log(userSocketCache.data)
  });

  socket.on("message all", (payload: AllMessage) => {
    console.log("payload: ", payload);
    io.emit("message all", payload);
  });


});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
