import React from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

const MainLinks = () => {
  return (
    <div className={styles.container}>
      <h1>פורטל שוע"ל מפקדות</h1>
      {/* <br /> */}
      <a href="https://www.ynet.co.il/" target="_blank" rel="noreferrer">
        שוע"ל מפקדות
      </a>
      <a href="https://www.ynet.co.il/" target="_blank" rel="noreferrer">
        שוע"ל תנופה
      </a>
      <a href="https://www.ynet.co.il/" target="_blank" rel="noreferrer">
        תמונת מצב
      </a>
    </div>
  );
};

export default MainLinks;
