import {useDispatch} from "react-redux";
import {addChatBoxes} from "../Messanger/MessenderSlice";

export const ChatButton = ({ socketId, username }) => {
  const dispatch = useDispatch();
  const handleAddChatBox = () => {
    dispatch(addChatBoxes({
      username,
      socketId,
    }))
  }
  return (
    <button
      onClick={handleAddChatBox}
      className="px-10 py-2 my-5 font-bold tracking-widest uppercase border-2 rounded
        border-black font-alata hover:bg-black hover:text-white"
    >Direct Me</button>
  );
};
