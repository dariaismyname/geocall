const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { Peer, PeerServer } = require("peer");

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
let videoRooms = {};

//Socket Events
const disconnectEventHandler = (socket) => {
  checkIfUserIsInCall(socket);
  removeOnlineUser(socket.id);
  broadcastDisconnectedUserDetails(socket.id);
};

const loginHandler = (socket, data) => {
  socket.join("logged-users");

  onlineUsers[socket.id] = {
    username: data.username,
    coords: data.coords,
  };

  io.to("logged-users").emit("online-users", convertOnlineUsersToArray());
  broadcastVideoRooms();
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

const videoRoomCreateHandler = (socket, data) => {
  const { peerId, newRoomId } = data;

  videoRooms[newRoomId] = {
    participants: [
      {
        socketId: socket.id,
        username: onlineUsers[socket.id].username,
        peerId,
      },
    ],
  };

  broadcastVideoRooms();
  console.log("new room", data);
};

const videoRoomJoinHandler = (socket, data) => {
  const { roomId, peerId } = data;

  if (videoRooms[roomId]) {
    videoRooms[roomId].participants.forEach((participant) => {
      socket.to(participant.socketId).emit("video-room-init", {
        newParticipantPeerId: peerId,
      });
    });

    videoRooms[roomId].participants = [
      ...videoRooms[roomId].participants,
      {
        socketId: socket.id,
        username: onlineUsers[socket.id].username,
        peerId,
      },
    ];

    broadcastVideoRooms();
  }
};

const videoRoomLeaveHandler = (socket, data) => {
  const { roomId } = data;

  if (videoRooms[roomId]) {
    videoRooms[roomId].participants = videoRooms[roomId].participants.filter(
      (p) => p.socketId !== socket.id
    );
  }

  if (videoRooms[roomId].participants.length > 0) {
    socket
      .to(videoRooms[roomId].participants[0].socketId)
      .emit("video-call-disconnect");
  }

  if (videoRooms[roomId].participants.length < 1) {
    delete videoRooms[roomId];
  }

  broadcastVideoRooms();
};

//helper functions
const broadcastDisconnectedUserDetails = (id) => {
  io.to("logged-users").emit("user-disconnected", id);
};
const broadcastVideoRooms = () => {
  io.to("logged-users").emit("video-rooms", videoRooms);
};

const removeOnlineUser = (id) => {
  if (onlineUsers[id]) {
    delete onlineUsers[id];
  }
  console.log(onlineUsers);
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

const checkIfUserIsInCall = (socket) => {
  Object.entries(videoRooms).forEach(([key, value]) => {
    const participant = value.participants.find(
      (p) => p.socketId === socket.id
    );

    if (participant) {
      removeUserFromTheVideoRoom(socket.id, key);
    }
  });
};

const removeUserFromTheVideoRoom = (socketId, roomId) => {
  videoRooms[roomId].participants = videoRooms[roomId].participants.filter(
    (p) => p.socketId !== socketId
  );

  if (videoRooms[roomId].participants.length < 1) {
    delete videoRooms[roomId];
  } else {
    io.to(videoRooms[roomId].participants[0].socketId).emit(
      "video-call-disconnect"
    );
  }

  broadcastVideoRooms();
};

io.on("connection", (socket) => {
  console.log(`User connected of the id ${socket.id}`);
  socket.on("user-login", (data) => loginHandler(socket, data));

  socket.on("chat-message", (data) => chatMessageHandler(socket, data));

  socket.on("video-room-create", (data) =>
    videoRoomCreateHandler(socket, data)
  );

  socket.on("video-room-join", (data) => {
    videoRoomJoinHandler(socket, data);
  });

  socket.on("video-room-leave", (data) => {
    videoRoomLeaveHandler(socket, data);
  });

  socket.on("disconnect", () => {
    disconnectEventHandler(socket);
  });
});

app.get("/", (req, res) => {
  res.send("Hello server is started");
});

const peerServer = PeerServer({ port: 9000, path: "/peer" });

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
