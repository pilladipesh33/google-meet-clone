import { useState } from "react";
import { cloneDeep } from "lodash";
import { useSocket } from "@/context/socket";
import { useRouter } from "next/router";

export const usePlayer = (myId, roomId, peer) => {
  const socket = useSocket();
  const router = useRouter();
  const [player, setPlayer] = useState({});
  const playerCopy = cloneDeep(player);

  const playerHighlighted = playerCopy[myId];
  delete playerCopy[myId];

  const playerNotHighlighted = playerCopy;

  const toggleAudio = () => {
    console.log("toggle audio");
    setPlayer((prev) => {
      const copy = cloneDeep(prev);
      copy[myId].muted = !copy[myId].muted;
      return { ...copy };
    });
    socket.emit("user-toggle-audio", myId, roomId);
  };

  const toggleVideo = () => {
    console.log("toggle video");
    setPlayer((prev) => {
      const copy = cloneDeep(prev);
      copy[myId].playing = !copy[myId].playing;
      return { ...copy };
    });
    socket.emit("user-toggle-video", myId, roomId);
  };

  const leaveRoom = () => {
    socket.emit("user-leave", myId, roomId);
    console.log("leaving room", roomId);
    peer?.disconnect();
    router.push("/");
  };

  return {
    player,
    setPlayer,
    playerHighlighted,
    playerNotHighlighted,
    toggleAudio,
    toggleVideo,
    leaveRoom,
  };
};
