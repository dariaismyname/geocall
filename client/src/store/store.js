import { configureStore } from "@reduxjs/toolkit";

import mapReducer from "../MapPage/MapSlice";
import messengerReducer from "../Messanger/MessenderSlice";
import videoRoomReducer from "../realtimeCommunication/videoroomSlice";

const store = configureStore({
  reducer: {
    map: mapReducer,
    messenger: messengerReducer,
    videoRooms: videoRoomReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [
          "videoRooms/setLocalStream",
          "videoRooms/setRemoteStream",
        ],
        ignoredPaths: ["videoRooms.localStream", "videoRooms.remoteStream"],
      },
    }),
});

export default store;
