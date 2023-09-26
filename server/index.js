import express from "express";
import { createServer } from "http";
import cors from "cors";
import { Server } from "socket.io";

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());

const server = createServer(app);

const io = new Server(server, {
  cors: { origin: true },
});

io.on("connection", (socket) => {
  console.log(`$${socket.id} connected`);
  socket.on("join_room", (roomId) => {
    console.log(`Room ${roomId} joined by user ${socket.id}`);
    socket.join(roomId);
  });
});

server.listen(PORT, () => {
  console.log(`Listening server at ${PORT}`);
});
