import { useSelector } from "react-redux";

import { JoinRoomButton } from "./JoinRoomButton";
import {ParticipantsVideos} from "./ParticipantsVideo";

const convertRoomsRoArray = (videRooms) => {
  const rooms = [];
  Object.entries(videRooms).forEach(([key, value]) => {
    rooms.push({
      id: key,
      creatorUsername: value.participants[0].username,
      amountOfParticipants: value.participants.length,
    });
  });

  return rooms;
};
const RoomsList = () => {
  const rooms = useSelector((state) => state.videoRooms.rooms);

  return (
    <div className="fixed bottom-0 right-0 mr-28 mb-2">
      {convertRoomsRoArray(rooms).map((room) => (
        <JoinRoomButton
          key={room.id}
          creatorUserName={room.creatorUsername}
          roomId={room.id}
          amountOfParticipants={room.amountOfParticipants}
        />
      ))}
    </div>
  );
};

export const VideoRooms = () => {
  return (
    <>
      <RoomsList />
      <ParticipantsVideos />
    </>
  );
};
