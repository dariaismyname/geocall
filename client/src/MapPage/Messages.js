import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { SingleMessage } from "../Messanger/SingleMessage";

export const Messages = ({ socketId }) => {
  const messages = useSelector(
    (state) => state.messenger.chatHistory[socketId]
  );

  const scrollRef = useRef();
  const scrollToBottom = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div>
      {messages?.map((message) => (
        <SingleMessage
          key={message?.id}
          content={message?.content}
          myMessage={message?.myMessage}
        />
      ))}
      <div ref={scrollRef}></div>
    </div>
  );
};
