import { leaveVideoRoom } from "../store/actions/VideoRoomsActions";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsCameraOn,
  setIsMicOn,
} from "../realtimeCommunication/videoroomSlice";

export const VideoRoomButtons = ({ inRoom }) => {
  const { isMicOn, isCameraOn, localStream } = useSelector(
    (state) => state.videoRooms
  );

  const dispatch = useDispatch();

  const handleLeaveRoom = () => {
    leaveVideoRoom(inRoom);
  };

  const handleMuteChange = () => {
    localStream.getAudioTracks()[0].enabled =
      !localStream.getAudioTracks()[0].enabled;
    dispatch(setIsMicOn(!isMicOn));
  };

  const handleCameraChange = () => {
    localStream.getVideoTracks()[0].enabled =
      !localStream.getVideoTracks()[0].enabled;
    dispatch(setIsCameraOn(!isCameraOn));
  };
  return (
    <div className="flex justify-center space-x-3 mt-2 mb-2">
      <button
        className="rounded-full bg-gray-300 p-2"
        onClick={handleMuteChange}
      >
        <img
          src={`/images/${isMicOn ? "microphone-icon.svg" : "mute-icon.svg"}`}
          className="w-[20px]"
        />
      </button>
      <button
        onClick={handleLeaveRoom}
        className="rounded-full border border-red-500 bg-red-400 p-2"
      >
        <img src={"/images/end-call-icon.svg"} className="w-[20px]" />
      </button>
      <button
        className="rounded-full bg-gray-300 p-2"
        onClick={handleCameraChange}
      >
        <img
          src={`/images/${
            isCameraOn ? "camera-icon.svg" : "camera-off-icon.svg"
          }`}
          className="w-[20px]"
        />
      </button>
    </div>
  );
};
