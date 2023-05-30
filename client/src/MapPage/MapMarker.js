import { useDispatch } from "react-redux";

import { setCardChosenOption } from "./MapSlice";

export const MapMarker = ({ myself, socketId, username, coords }) => {
  const dispatch = useDispatch();

  const handlerOptionChose = () => {
    if (!myself) {
      dispatch(
        setCardChosenOption({
          socketId,
          username,
          coords,
        })
      );
    }
  };
  return (
    <div
      className="absolute shadow-xl rounded-2xl w-12 h-12 flex justify-center items-center flex-col"
      onClick={handlerOptionChose}
    >
      <img
        src={"/images/location-icon.svg"}
        alt={username}
        className="w-[25px]"
      />
      <p className="text-white tracking-widest uppercase m-1">
        {myself ? "Me" : username}
      </p>
    </div>
  );
};
