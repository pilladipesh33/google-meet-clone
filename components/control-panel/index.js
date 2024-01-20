import { Mic, VideoOff, MicOff, Video, PhoneOff } from "lucide-react";
import styles from "@/components/control-panel/index.module.css";
import { cn } from "@/lib/utils";
export const ControlPanel = (props) => {
  const { muted, playing, toggleVideo, toggleAudio, leaveRoom } = props;

  return (
    <div className={styles.bottomMenu}>
      {muted ? (
        <MicOff
          className={cn(styles.icon, styles.active)}
          size={60}
          onClick={toggleAudio}
        />
      ) : (
        <Mic className={styles.icon} size={60} onClick={toggleAudio} />
      )}
      {playing ? (
        <Video className={styles.icon} size={60} onClick={toggleVideo} />
      ) : (
        <VideoOff
          className={cn(styles.icon, styles.active)}
          size={60}
          onClick={toggleVideo}
        />
      )}
      <PhoneOff
        size={60}
        className={"p-4 rounded-full text-white cursor-pointer bg-red-500"}
        onClick={leaveRoom}
      />
    </div>
  );
};
