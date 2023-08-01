import { useState, useEffect } from "react";
import styles from "./Message.module.css";

function Message({ type, text }) {
  const [viseible, setVisible] = useState(false);

  useEffect(() => {
    if (!text) {
      return setVisible(false);
    }
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [text]);

  return (
    <>
      {viseible && (
        <div className={`${styles.message} ${styles[type]}`}>{text}</div>
      )}
    </>
  );
}

export default Message;
