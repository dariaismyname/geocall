import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inRoom: null,
  rooms: [],
  localStream: null,
  remoteStream: null,
  isMicOn: true,
  isCameraOn: true,
};

export const videRoomSlice = createSlice({
  name: "videRoom",
  initialState,
  reducers: {
    setInRoom: (state, action) => {
      state.inRoom = action.payload;
    },
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    setLocalStream: (state, action) => {
      state.localStream = action.payload;
    },
    setRemoteStream: (state, action) => {
      state.remoteStream = action.payload;
    },
    setIsMicOn: (state, action) => {
      state.isMicOn = action.payload;
    },
    setIsCameraOn: (state, action) => {
      state.isCameraOn = action.payload;
    },
  },
});

export const {
  setInRoom,
  setRooms,
  setLocalStream,
  setRemoteStream,
  setIsMicOn,
  setIsCameraOn,
} = videRoomSlice.actions;

export default videRoomSlice.reducer;
