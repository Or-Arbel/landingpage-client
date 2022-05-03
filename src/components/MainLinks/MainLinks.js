import React from 'react';
import styles from './styles.module.scss';

const MainLinks = () => {
  return (
    <div className={styles.container}>
      <button>שוע"ל מפקדות</button>
      <button>שוע"ל תנופה</button>
      <button>תמונת מצב</button>
    </div>
  );
};

export default MainLinks;
