import React, { useState, useEffect, useCallback, useRef } from "react";
import dateFormat from "dateformat";
import styles from "./styles.module.scss";

const DateAndTime = () => {
  const [currentTime, setCurrentTime] = useState("");
  console.log("date and time render! " + currentTime);

  //   Set Current Date And Time
  useEffect(() => {
    setInterval(() => {
      let now = new Date();
      let nowTime = dateFormat(now, "HH:MM");
      setCurrentTime(nowTime);
    }, 1000);
  }, []);

  return (
    <div id={styles.dateAndTime}>
      {new Date().toLocaleDateString()}
      <br />
      <div className={styles.time}>{currentTime}</div>
    </div>
  );
};

export default React.memo(DateAndTime);
