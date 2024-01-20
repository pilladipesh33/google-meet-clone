import { useSocket } from "@/context/socket";
import { useRouter } from "next/router";

const { useState, useEffect, useRef } = require("react");

const usePeer = () => {
  const socket = useSocket();
  const roomId = useRouter().query.roomId;

  const [peer, setPeer] = useState(null);
  const [myId, setMyId] = useState("");
  const isPeerRef = useRef(false);

  useEffect(() => {
    if (isPeerRef.current || !roomId || !socket) return;
    isPeerRef.current = true;
    let myPeer;
    (async function initPeer() {
      myPeer = new (await import("peerjs")).default();
      setPeer(myPeer);

      myPeer.on("open", (id) => {
        console.log("peer id is ", id);
        setMyId(id);
        socket?.emit("join-room", roomId, id);
      });
    })();
  }, [roomId, socket]);

  return {
    peer,
    myId,
  };
};

export default usePeer;
