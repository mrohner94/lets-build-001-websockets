import http from "http";
import { Server } from "socket.io";
import { AllMessage } from "./types";

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "http://localhost:1234",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("message all", (payload: AllMessage) => {
    console.log("payload: ", payload);
    io.emit("message all", payload);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
