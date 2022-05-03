import React from 'react';
import styles from './styles.module.scss';
import { shobData } from '../ShobCardsData';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
} from '@mui/material';

const ShobCards = () => {
  return (
    <div className={styles.container}>
      {shobData.map((e, i) => (
        <Card className={styles.card} key={i}>
          <CardActionArea href="https://google.com" target="_blank">
            <CardMedia
              component="img"
              height="140"
              image={e.image}
              alt={e.title}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {e.title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {e.subTitle}
              </Typography>
              <Typography paragraph>{e.description}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
};

export default ShobCards;
