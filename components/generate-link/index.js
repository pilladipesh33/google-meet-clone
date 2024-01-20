import { CopyToClipboard } from "react-copy-to-clipboard";
import { Copy } from "lucide-react";

import styles from "@/components/generate-link/index.module.css";

export const GenerateLink = (props) => {
  const { roomId } = props;
  return (
    <div className={styles.copyContainer}>
      <div className={styles.copyHeading}>Copy room id:</div>
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
