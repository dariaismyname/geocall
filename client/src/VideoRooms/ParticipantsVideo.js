import { useSelector } from "react-redux";

import { Video } from "./Video";
import { VideoRoomButtons } from "./VideoRoomButtons";

export const ParticipantsVideos = () => {
  const { inRoom, localStream, remoteStream } = useSelector(
    (state) => state.videoRooms
  );
  return (
    <div className="fixed bottom-0 right-0 mb-28 flex space-x-2">
      <div>
        {inRoom && localStream && <Video stream={localStream} muted />}
        {inRoom && <VideoRoomButtons inRoom={inRoom} />}
      </div>
      {inRoom && remoteStream && <Video stream={remoteStream} />}
    </div>
  );
};
