import React from 'react';
import styles from './styles.module.scss';
import { useParams } from 'react-router-dom';
import MaterialTableComponent from '../Assets/MaterialTable/MaterialTable';

const Data = () => {
  let { table } = useParams(); // Get table name from url
  // console.log(table);
  return (
    <div className={styles.dataContainer}>
      {/* <h2>Data</h2> */}
      {table ? (
        <div>
          <MaterialTableComponent />
        </div>
      ) : (
        <p>כאן יוצגו כל הטבלאות הניתנות לעריכה</p>
      )}
    </div>
  );
};

export default Data;
