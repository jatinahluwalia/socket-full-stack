import { useState } from "react";
import { Message } from "./types/message";

interface Props {
  sendMessage: (arg0: string) => void;
  messagesList: Message[];
  username: string;
}

const Chat = ({ sendMessage, messagesList, username }: Props) => {
  const [message, setMessage] = useState("");
  return (
    <article className="grow my-5 mx-2 px-1 py-1 flex flex-col w-[min(1200px,100%)] shadow-md bg-gray-100">
      <div className="mb-auto flex flex-col gap-5">
        {messagesList.map((message, index) => (
          <div
            className={`${
              message.username === username
                ? "bg-blue-800 text-white ml-auto"
                : "bg-black text-white mr-auto"
            } py-2 px-6 rounded-md flex flex-col gap-2`}
            key={`${message.content}-${index}`}
          >
            <p className="text-gray-400">{message.username}</p>
            <p>{message.content}</p>
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(message);
        }}
        className="flex gap-2 mt-auto"
      >
        <input
          type="text"
          className="focus:outline-none border-black border-2 rounded-md px-6 py-2 mt-auto grow"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button className="px-6 py-2 rounded-md bg-black text-white hover:bg-opacity-80">
          Send
        </button>
      </form>
    </article>
  );
};

export default Chat;
