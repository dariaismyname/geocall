import { io } from "socket.io-client";

import {
  onlineUsersHandler,
  userDisconnectedHandler,
} from "../store/actions/UserActions";
import {chatMessageHandler} from "../store/actions/MessengerActions";

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
