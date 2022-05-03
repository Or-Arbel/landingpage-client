import React from 'react';
import styles from './styles.module.scss';
import { linksData } from '../linksData';

const LinksList = () => {
  return (
    <div>
      {/* <h1>Links List</h1> */}
      <div className={styles.linksContainer}>
        {linksData.map((e, i) => (
          <div className={styles.singleLink} key={i}>
            <a href={e.url} target="_blank" rel="noreferrer">
              {e.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinksList;
