import { io } from "socket.io-client";

import {
  onlineUsersHandler,
  userDisconnectedHandler,
} from "../store/actions/UserActions";
import { chatMessageHandler } from "../store/actions/MessengerActions";
import { videoRoomsListHandler } from "../store/actions/VideoRoomsActions";
import {call, disconnect} from "../realtimeCommunication/webRTCHandler";

let socket = null;

export const connectionWithSocketIOServer = () => {
  socket = io("http://localhost:5000");

  socket.on("connect", () => {
    console.log("connected to socket server");
  });

  socket.on("online-users", (usersData) => {
    onlineUsersHandler(socket.id, usersData);
  });
  socket.on("chat-message", (messageData) => {
    chatMessageHandler(messageData);
  });
  socket.on("video-rooms", (videoRooms) => {
    videoRoomsListHandler(videoRooms);
  });
  socket.on("video-room-init", (data) => {
    call(data);
  });
  socket.on('video-call-disconnect', () => {
    disconnect()
  })
  socket.on("user-disconnected", (id) => {
    userDisconnectedHandler(id);
  });
};

export const login = (data) => {
  socket.emit("user-login", data);
};

export const sendingMessage = (data) => {
  socket.emit("chat-message", data);
};

export const createVideoRoom = (data) => {
  socket.emit("video-room-create", data);
};

export const joinVideoRoom = (data) => {
  console.log("emitting event to join a room");
  socket.emit("video-room-join", data);
};

export const leaveVideoRoom = (data) => {
  socket.emit("video-room-leave", data);
};
