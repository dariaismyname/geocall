import { configureStore } from "@reduxjs/toolkit";

import mapReducer from "../MapPage/MapSlice";
import messengerReducer from "../Messanger/MessenderSlice";

const store = configureStore({
  reducer: {
    map: mapReducer,
    messenger: messengerReducer,
  },
});

export default store;
