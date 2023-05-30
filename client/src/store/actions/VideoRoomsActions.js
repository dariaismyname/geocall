import { v4 as uuid } from "uuid";

import {
  setInRoom,
  setRooms,
} from "../../realtimeCommunication/videoroomSlice";
import store from "../store";
import * as socketConnection from "../../socketConnection/socketConnection";
import {
  disconnect,
  getAccessToLocalStream,
  getPeerId,
} from "../../realtimeCommunication/webRTCHandler";

export const createVideoRoom = async () => {
  //get access to local stream

  const success = await getAccessToLocalStream();

  if (success) {
    const newRoomId = uuid();

    store.dispatch(setInRoom(newRoomId));

    socketConnection.createVideoRoom({
      peerId: getPeerId(),
      newRoomId,
    });
  }
};

export const joinVideoRoom = async (roomId) => {
  const success = await getAccessToLocalStream();

  if (success) {
    store.dispatch(setInRoom(roomId));

    socketConnection.joinVideoRoom({
      roomId,
      peerId: getPeerId(),
    });
  }
};
export const videoRoomsListHandler = (videoRooms) => {
  store.dispatch(setRooms(videoRooms));
};

export const leaveVideoRoom = (roomId) => {
  disconnect()
  socketConnection.leaveVideoRoom({
    roomId,
  });

  store.dispatch(setInRoom(false));
};
