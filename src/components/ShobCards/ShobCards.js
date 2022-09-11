import React from "react";
// import { shobData } from '../ShobCardsData';

//usequeryget hook
import useQueryGet from "../../Hooks/useQueryGet";

//UI and styles
import styles from "./styles.module.scss";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  Alert,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import NoData from "../Assets/NoData/NoData";
const demoImage = require("../../images/m2e.jpg");

const ShobCards = () => {
  const { data: shobData, error, isLoading } = useQueryGet("shobDevelopments");

  if (isLoading) {
    return (
      <div className={styles.container}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className={styles.container}>
      {/* {isLoading && <CircularProgress />} */}
      {error && (
        <Alert severity="error" variant="filled">
          {error.message}
        </Alert>
      )}

      {shobData?.length > 0 &&
        !isLoading &&
        !error &&
        shobData.map((e, i) => (
          <Card className={styles.card} key={i}>
            <CardActionArea href={e.url} target="_blank">
              <CardMedia
                component="img"
                height="140"
                image={
                  e.image
                    ? process.env.REACT_APP_SERVER_URL + e.image
                    : demoImage
                }
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

      {!isLoading && !error && shobData && shobData.length == 0 && <NoData />}
    </div>
  );
};

export default ShobCards;
