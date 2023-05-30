const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let onlineUsers = {};

const removeOnlineUser = (id) => {
  if (onlineUsers[id]) {
    delete onlineUsers[id];
  }
  console.log(onlineUsers);
};
const disconnectEventHandler = (id) => {
  console.log(`User disconnected of the id: ${id}`);
  removeOnlineUser(id);
  broadcastDisconnectedUserDetails(id);
};

const convertOnlineUsersToArray = () => {
  const onlineUsersArray = [];

  Object.entries(onlineUsers).forEach(([key, value]) => {
    onlineUsersArray.push({
      socketId: key,
      username: value.username,
      coords: value.coords,
    });
  });

  return onlineUsersArray;
};

const broadcastDisconnectedUserDetails = (id) => {
  io.to("logged-users").emit("user-disconnected", id);
};
const loginHandler = (socket, data) => {
  socket.join("logged-users");

  onlineUsers[socket.id] = {
    username: data.username,
    coords: data.coords,
  };

  io.to("logged-users").emit("online-users", convertOnlineUsersToArray());
};

const chatMessageHandler = (socket, data) => {
  const { receiverSocketId, content, id } = data;

  if (onlineUsers[receiverSocketId]) {
    io.to(receiverSocketId).emit("chat-message", {
      senderSocketId: socket.id,
      content,
      id,
    });
  }
};

io.on("connection", (socket) => {
  console.log(`User connected of the id ${socket.id}`);
  socket.on("user-login", (data) => loginHandler(socket, data));

  socket.on("chat-message", (data) => chatMessageHandler(socket, data));
  socket.on("disconnect", () => {
    disconnectEventHandler(socket.id);
  });
});

app.get("/", (req, res) => {
  res.send("Hello server is started");
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
