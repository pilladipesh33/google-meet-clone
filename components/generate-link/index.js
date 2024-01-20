import { CopyToClipboard } from "react-copy-to-clipboard";
import { Copy } from "lucide-react";

import styles from "@/components/generate-link/index.module.css";

export const GenerateLink = (props) => {
  const { roomId } = props;
  return (
    <div className={styles.copyContainer}>
      <div className={styles.copyHeading}>Your meeting&apos;s ready</div>
      <p>Share this meeting link with others than you want in this meeting</p>
      <hr className="my-1" />
      <div className={styles.copyDescription}>
        <span>{roomId}</span>
        <CopyToClipboard text={roomId}>
          <Copy className="ml-3 cursor cursor-pointer" />
        </CopyToClipboard>
      </div>
    </div>
  );
};
