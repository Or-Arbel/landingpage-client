import React from 'react';
import styles from './styles.module.scss';
import { cardsData } from '../cardsData';
import { Card, CardContent, CardHeader } from '@mui/material';

const Cards = () => {
  return (
    <div className={styles.cardsContainer}>
      {cardsData.map((card, i) => (
        <Card sx={{ minWidth: 250, minHeight: 300, margin: '10px' }} key={i}>
          <CardHeader
            title={card.name}
            className={styles.cardTitle}
            sx={{ backgroundColor: '#b2bec3' }}
          />
          <CardContent>
            <div className={styles.linksContainer}>
              {card.urls.map((e, i) => (
                <a
                  key={i}
                  href={e.url}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.singleLink}
                >
                  {e.name}
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Cards;
