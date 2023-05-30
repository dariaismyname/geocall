import { joinVideoRoom } from "../store/actions/VideoRoomsActions";
import { useSelector } from "react-redux";

export const JoinRoomButton = ({
  amountOfParticipants,
  roomId,
  creatorUserName,
}) => {
  const inRoom = useSelector((state) => state.videoRooms.inRoom);

  const handleJoinRoom = () => {
    if (inRoom) {
      return alert("You are already in room!");
    }

    if (amountOfParticipants > 1) {
      return alert("Room is full");
    }

    joinVideoRoom(roomId);
  };

  return (
    <button
      onClick={handleJoinRoom}
      className="w-10 h-10 rounded-full bg-rose-300 mx-2 my-2 uppercase font-light"
    >
      {creatorUserName[0]}
    </button>
  );
};
