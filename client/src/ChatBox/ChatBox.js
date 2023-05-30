import { Messages } from "../MapPage/Messages";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeChatBoxes } from "../Messanger/MessenderSlice";
import { sendChatMessage } from "../store/actions/MessengerActions";

export const ChatBox = ({ socketId, username, messages }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const onlineUsers = useSelector((state) => state.map.onlineUsers);

  const handleChangeValue = (e) => {
    setMessage(e.target.value);
  };

  const isUserOnline = onlineUsers.find((user) => user.socketId === socketId);
  const proceedChatMessage = () => {
    if (isUserOnline) {
      sendChatMessage(socketId, message);
    } else {
      setIsInputDisabled(true);
    }
    setMessage("");
  };
  const handleKeyPressed = (event) => {
    if (event.code === "Enter" && message.length > 0) {
      proceedChatMessage();
    }
  };
  const handleCloseChatBox = () => {
    dispatch(removeChatBoxes(socketId));
  };
  return (
    <div className="w-[250px] bg-rose-50 rounded-t-2xl h-[300px] flex flex-col items-center ">
      <div className="w-full flex justify-between items-center bg-rose-200 rounded-t-xl mb-2">
        <div className="flex items-center">
          <p className="text-gray-900 ml-28">{username}</p>
          {/*<div*/}
          {/*  className={`w-3 h-3 ml-1 ${*/}
          {/*    isUserOnline ? "bg-green-300" : "bg-red-300"*/}
          {/*  }  rounded-full hover:animate-ping`}*/}
          {/*></div>*/}
        </div>
        <img
          src="/images/close-icon.svg"
          alt="close"
          className="m-2 fill-black, w-[18px]"
          onClick={handleCloseChatBox}
        />
      </div>
      <div className="w-full max-h-[220px] scrollbar scrollbar-thumb-red-900 scrollbar-track-red-100">
        <Messages socketId={socketId} />
      </div>
      <div className="w-full flex justify-between">
        <input
          type="text"
          className="w-[250px] h-[35px] pl-2 fixed bottom-0 border outline-t-gray-400
          bg-rose-100 placeholder:font-sans placeholder:font-light placeholder:text-gray-700 focus:outline-gray-300"
          placeholder="Type your message..."
          value={message}
          onChange={handleChangeValue}
          onKeyDown={handleKeyPressed}
          disabled={isInputDisabled}
        />
      </div>
    </div>
  );
};
