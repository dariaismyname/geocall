import { useSelector } from "react-redux";

import { calculateDistance } from "../utils/location";
import { ChatButton } from "./ChatButton";

export const InfoCard = ({ username, userLocation, socketId }) => {
  const myLocation = useSelector((state) => state.map.myLocation);

  return (
    <div className="fixed top-0 w-1/5 h-fit p-3 bg-rose-100 rounded-2xl m-3 text-gray-700 ">
      <p className="text-3xl font-semibold tracking-tight">{username}</p>
      <p className="text-2xl">
        {calculateDistance(myLocation, userLocation)}km
      </p>
      <ChatButton socketId={socketId} username={username} />
    </div>
  );
};
