import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatBoxes: [],
  chatHistory: {},
};

export const messengerSlice = createSlice({
  name: "messenger",
  initialState,
  reducers: {
    addChatBoxes: (state, action) => {
      if (
        !state.chatBoxes.find(
          (chatBox) => chatBox.socketId === action.payload.socketId
        )
      ) {
        state.chatBoxes.push(action.payload);
      }
    },
    removeChatBoxes: (state, action) => {
      state.chatBoxes = state.chatBoxes.filter(
        (chatBox) => chatBox.socketId !== action.payload
      );
    },
    addChatMessage: (state, action) => {
      if (state.chatHistory[action.payload.socketId]) {
        state.chatHistory[action.payload.socketId].push({
          content: action.payload.content,
          myMessage: action.payload.myMessage,
          id: action.payload.id,
        });
      } else {
        state.chatHistory[action.payload.socketId] = [
          {
            content: action.payload.content,
            myMessage: action.payload.myMessage,
            id: action.payload.id,
          },
        ];
      }
    },
  },
});

export const { addChatBoxes, removeChatBoxes, addChatMessage } = messengerSlice.actions;

export default messengerSlice.reducer;
