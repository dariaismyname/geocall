import { Peer } from "peerjs";

import store from "../store/store";
import { setLocalStream, setRemoteStream } from "./videoroomSlice";

let peer;
let peerId;

export const getPeerId = () => {
  return peerId;
};
export const getAccessToLocalStream = async () => {
  const localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });

  if (localStream) {
    store.dispatch(setLocalStream(localStream));
  }

  return Boolean(localStream);
};

export const connectWithPeerServer = () => {
  peer = new Peer(undefined, {
    host: "geocall-react-server.onrender.com",
    port: 443,
    path: "peer",
  });

  peer.on("open", (id) => {
    console.log(`My peerId is ${id}`);
    peerId = id;
  });

  peer.on("call", async (call) => {
    const localStream = store.getState().videoRooms.localStream;

    call.answer(localStream);
    call.on("stream", (remoteStream) => {
      console.log("remote stream came");
      store.dispatch(setRemoteStream(remoteStream));
    });
  });
};

export const call = (data) => {
  const { newParticipantPeerId } = data;

  const localStream = store.getState().videoRooms.localStream;

  const peerCall = peer.call(newParticipantPeerId, localStream);

  peerCall.on("stream", (remoteStream) => {
    console.log("remote stream came");
    store.dispatch(setRemoteStream(remoteStream));
  });
};

export const disconnect = () => {
  for (let conns in peer.connections) {
    peer.connections[conns].forEach((c) => {
      c.peerConnection.close();

      if (c.close) c.close();
    });
  }

  store.dispatch(setRemoteStream(null));
};
