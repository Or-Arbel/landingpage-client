import React from "react";
import styles from "./styles.module.scss";
import { useParams } from "react-router-dom";
import MaterialTableComponent from "../Assets/MaterialTable/MaterialTableComponent";

const Data = () => {
  let { table } = useParams(); // Get table name from url
  return (
    <div className={styles.dataContainer}>
      {/* <h2>Data</h2> */}
      {table ? (
        <div>
          <h3>{table}</h3>
          <MaterialTableComponent />
        </div>
      ) : (
        <p>כאן יוצגו כל הטבלאות הניתנות לעריכה</p>
      )}
    </div>
  );
};

export default Data;
