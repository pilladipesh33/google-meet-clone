import { useRouter } from "next/router";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [roomId, setRoomId] = useState("");

  const router = useRouter();

  const createAndJoin = () => {
    const roomId = uuidv4();
    router.push(`${roomId}`);
  };

  const joinRoom = () => {
    if (roomId) {
      router.push(`${roomId}`);
    } else {
      alert("Enter a room id");
    }
  };
  return (
    <div className="flex flex-col">
      <h1>Google Meet</h1>
      <div>
        <input
          placeholder="enter code"
          value={roomId}
          onChange={(e) => setRoomId(e?.target?.value)}
        />
        <button onClick={joinRoom}>Join Room</button>
      </div>
      <span>--------------------OR---------------------</span>
      <button onClick={createAndJoin}>Create Room</button>
    </div>
  );
}
