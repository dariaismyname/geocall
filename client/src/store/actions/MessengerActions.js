import { v4 as uuid } from "uuid";

import store from "../store";
import { addChatBoxes, addChatMessage } from "../../Messanger/MessenderSlice";
import * as socketConnection from "../../socketConnection/socketConnection";

export const sendChatMessage = (receiverSocketId, content) => {
  const message = {
    content,
    receiverSocketId,
    id: uuid(),
  };

  //socketConnection
  socketConnection.sendingMessage(message);

  store.dispatch(
    addChatMessage({
      socketId: receiverSocketId,
      content,
      myMessage: true,
      id: message.id,
    })
  );
};

export const chatMessageHandler = (messageData) => {
  store.dispatch(
    addChatMessage({
      socketId: messageData.senderSocketId,
      content: messageData.content,
      myMessage: false,
      id: messageData.id,
    })
  );

  openChatBoxIfClose(messageData.senderSocketId);
};

const openChatBoxIfClose = (socketId) => {
  const chatbox = store
    .getState()
    .messenger.chatBoxes.find((c) => c.socketId === socketId);

  const username = store
    .getState()
    .map.onlineUsers.find((user) => user.socketId === socketId)?.username;

  if (!chatbox) {
    store.dispatch(addChatBoxes({ socketId, username }));
  }
};
