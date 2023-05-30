import { ChatBox } from "../ChatBox/ChatBox";
import { useSelector } from "react-redux";

export const Messenger = () => {
  const chatBoxes = useSelector((state) => state.messenger.chatBoxes);

  return (
    <div className="fixed bottom-0 mx-3 flex flex-row space-x-3 mb-2">
      {chatBoxes.map((chatBox) => (
        <ChatBox
          username={chatBox.username}
          socketId={chatBox.socketId}
          key={chatBox.socketId}
        />
      ))}
    </div>
  );
};
