export const SingleMessage = ({ content, myMessage }) => {
  return (
    <div
      className={` container w-full flex ${myMessage ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`${myMessage ? "bg-gray-400" : "bg-gray-300"} ${
          myMessage
            ? "rounded-l-2xl rounded-t-2xl mr-1"
            : "rounded-r-2xl rounded-t-2xl ml-1"
        } pl-2 mb-1 w-1/2 break-words `}
      >
        {content}
      </div>
    </div>
  );
};
