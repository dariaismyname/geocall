import store from "../store";
import { setOnlineUsers, removeDisconnectedUser } from "../../MapPage/MapSlice";

export const onlineUsersHandler = (socketId, usersData) => {
  store.dispatch(
    setOnlineUsers(
      usersData.map((user) => {
        if (user.socketId === socketId) {
          user.myself = true;
        }
        return user;
      })
    )
  );
};

export const userDisconnectedHandler = (id) => {
  store.dispatch(removeDisconnectedUser(id));
};
