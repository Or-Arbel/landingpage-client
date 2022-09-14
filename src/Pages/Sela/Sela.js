import React from "react";
import SelaCards from "./components/SelaCards";
import styles from "./styles.module.scss";

const Sela = () => {
  return (
    <div className={styles.selaContainer} style={{ minHeight: "100vh" }}>
      <h1>סל"ע - סלולר עורף</h1>
      <SelaCards />
    </div>
  );
};

export default Sela;
