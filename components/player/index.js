import { cn } from "@/lib/utils";
import ReactPlayer from "react-player";
import { CircleUserRound, Mic, MicOff } from "lucide-react";
import styles from "@/components/player/index.module.css";

const Player = (props) => {
  const { muted, url, playing, isActive } = props;
  return (
    <div
      className={cn(styles.playerContainer, {
        [styles.notActive]: !isActive,
        [styles.active]: isActive,
      })}
    >
      {playing ? (
        <ReactPlayer
          url={url}
          muted={muted}
          playing={playing}
          height={"100%"}
          width={"100%"}
        />
      ) : (
        <div className="flex justify-center items-center">
          <CircleUserRound className="" size={isActive ? 400 : 150} />
        </div>
      )}
      {!isActive ? (
        muted ? (
          <MicOff className={styles.icon} size={20} />
        ) : (
          <Mic className={styles.icon} size={20} />
        )
      ) : undefined}
    </div>
  );
};

export default Player;
