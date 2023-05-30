import { useSelector } from "react-redux";

import { createVideoRoom } from "../store/actions/VideoRoomsActions";

export const RoomButton = () => {
  const inRoom = useSelector((state) => state.videoRooms.inRoom);
  const handleAddRoom = () => {
    if (inRoom) {
      return alert("You are already in room!");
    }

    createVideoRoom();
  };
  return (
    <button
      onClick={handleAddRoom}
      className=" p-2 font-bold tracking-widest uppercase rounded-full
        fixed bottom-0 right-0 mb-5 mr-16 bg-green-400"
    >
      <img src={"/images/call-icon.svg"} className="w-[20px]" />
    </button>
  );
};
