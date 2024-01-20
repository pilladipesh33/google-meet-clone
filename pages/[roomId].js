import Player from "@/components/player";
import { ControlPanel } from "@/components/control-panel";
import { GenerateLink } from "@/components/generate-link";

import { useSocket } from "@/context/socket";

import useMediaStream from "@/hooks/useMediaStream";
import usePeer from "@/hooks/usePeer";
import { usePlayer } from "@/hooks/usePlayer";

import styles from "@/styles/room.module.css";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import { cloneDeep } from "lodash";

const Room = () => {
  const { roomId } = useRouter().query;
  const socket = useSocket();
  const { peer, myId } = usePeer();
  const { stream } = useMediaStream();
  const {
    player,
    setPlayer,
    playerHighlighted,
    playerNotHighlighted,
    toggleAudio,
    toggleVideo,
    leaveRoom,
  } = usePlayer(myId, roomId, peer);

  const [user, setUser] = useState([]);

  useEffect(() => {
    if (!socket || !peer || !stream) return;
    const handleUserConnected = (newUser) => {
      console.log("new user is connected", newUser);
      const call = peer.call(newUser, stream);

      call.on("stream", (incomingStream) => {
        console.log("incoming stream from ", newUser);
        setPlayer((prev) => ({
          ...prev,
          [newUser]: {
            url: incomingStream,
            muted: true,
            playing: true,
          },
        }));
        setUser((prev) => ({
          ...prev,
          [newUser]: call,
        }));
      });
    };
    socket.on("user-connected", handleUserConnected);

    return () => {
      socket.off("user-connected", handleUserConnected);
    };
  }, [peer, setPlayer, socket, stream]);

  useEffect(() => {
    if (!socket) return;
    const handleToggleAudio = (userId) => {
      console.log(userId, "toggled with audio");
      setPlayer((prev) => {
        const copy = cloneDeep(prev);
        copy[userId].muted = !copy[userId].muted;
        return { ...copy };
      });
    };
    const handleToggleVideo = (userId) => {
      console.log(userId, "toggled with video");
      setPlayer((prev) => {
        const copy = cloneDeep(prev);
        copy[userId].playing = !copy[userId].playing;
        return { ...copy };
      });
    };
    const handleUserLeave = (userId) => {
      console.log(`user ${userId} is leaving the room`);
      user[userId]?.close();
      const playerCopy = cloneDeep(player);
      delete playerCopy[userId];
      setPlayer(playerCopy);
    };
    socket.on("user-toggle-audio", handleToggleAudio);
    socket.on("user-toggle-video", handleToggleVideo);
    socket.on("user-leave", handleUserLeave);

    return () => {
      socket.off("user-toggle-audio", handleToggleAudio);
      socket.off("user-toggle-video", handleToggleVideo);
      socket.on("user-leave", handleUserLeave);
    };
  }, [player, setPlayer, socket, user]);

  useEffect(() => {
    if (!peer || !stream) return;
    peer.on("call", (call) => {
      const { peer: callerId } = call;
      call.answer(stream);

      call.on("stream", (incomingStream) => {
        console.log("incoming stream from ", callerId);
        setPlayer((prev) => ({
          ...prev,
          [callerId]: {
            url: incomingStream,
            muted: true,
            playing: true,
          },
        }));
        setUser((prev) => ({
          ...prev,
          [callerId]: call,
        }));
      });
    });
  }, [peer, setPlayer, stream]);

  useEffect(() => {
    if (!stream || !myId) return;
    console.log("setting my stream ", myId);
    setPlayer((prev) => ({
      ...prev,
      [myId]: {
        url: stream,
        muted: true,
        playing: true,
      },
    }));
  }, [myId, setPlayer, stream]);

  return (
    <>
      <div className={styles.activePlayerContainer}>
        {playerHighlighted && (
          <Player
            url={playerHighlighted.url}
            muted={playerHighlighted.muted}
            playing={playerHighlighted.playing}
            isActive
          />
        )}
      </div>
      <div className={styles.inActivePlayerContainer}>
        {Object.keys(playerNotHighlighted).map((playerId) => {
          const { url, muted, playing } = playerNotHighlighted[playerId];
          return (
            <Player
              key={playerId}
              url={url}
              muted={muted}
              playing={playing}
              isActive={false}
            />
          );
        })}
      </div>
      <GenerateLink roomId={roomId} />
      <ControlPanel
        muted={playerHighlighted?.muted}
        playing={playerHighlighted?.playing}
        toggleAudio={toggleAudio}
        toggleVideo={toggleVideo}
        leaveRoom={leaveRoom}
      />
    </>
  );
};

export default Room;
