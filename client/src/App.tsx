import { FormEvent, useEffect, useState } from "react";
import Chat from "./Chat";
import { socket } from "./socket";
import { Message } from "./types/message";

function App() {
  const [roomID, setRoomID] = useState("");
  const [username, setUsername] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [messagesList, setMessagesList] = useState<Message[]>([]);

  const handleClick = (e: FormEvent) => {
    e.preventDefault();
    if (username && roomID) {
      socket.emit("join_room", roomID);
      setShowChat(true);
    } else {
      alert("Please enter all fields");
    }
  };

  const sendMessage = (content: string) => {
    if (content) {
      socket.emit("message", { content, roomID, username });
      setMessagesList((prev) => [...prev, { content, username }]);
    } else {
      alert("Enter a message");
    }
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("receive", ({ content, username }) => {
      setMessagesList((prev) => [...prev, { content, username }]);
    });
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {!showChat && (
        <form className="flex flex-col gap-5" onSubmit={handleClick}>
          <input
            type="text"
            className="focus:outline-none border-black border-2 rounded-md px-6 py-2"
            id="username"
            value={username}
            placeholder="Enter username..."
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            className="focus:outline-none border-black border-2 rounded-md px-6 py-2"
            id="room_no"
            value={roomID}
            placeholder="Enter room no."
            onChange={(e) => setRoomID(e.target.value)}
          />
          <button className="px-6 py-2 rounded-md bg-black text-white hover:bg-opacity-80">
            Enter Room
          </button>
        </form>
      )}
      {showChat && (
        <Chat
          sendMessage={sendMessage}
          messagesList={messagesList}
          username={username}
        />
      )}
    </div>
  );
}

export default App;
