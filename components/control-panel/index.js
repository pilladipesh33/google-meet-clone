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
          size={55}
          onClick={toggleAudio}
        />
      ) : (
        <Mic className={styles.icon} size={55} onClick={toggleAudio} />
      )}
      {playing ? (
        <Video className={styles.icon} size={55} onClick={toggleVideo} />
      ) : (
        <VideoOff
          className={cn(styles.icon, styles.active)}
          size={55}
          onClick={toggleVideo}
        />
      )}
      <PhoneOff size={55} className={cn(styles.icon)} onClick={leaveRoom} />
    </div>
  );
};
