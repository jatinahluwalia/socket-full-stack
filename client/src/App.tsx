import { FormEvent, useState } from "react";
import io from "socket.io-client";
import "./App.css";

function App() {
  const [roomID, setRoomID] = useState("");
  const socket = io("http://localhost:4000");

  const handleClick = (e: FormEvent) => {
    e.preventDefault();
    socket.emit("join_room", roomID);
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form className="flex flex-col gap-5" onSubmit={handleClick}>
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
    </div>
  );
}

export default App;
