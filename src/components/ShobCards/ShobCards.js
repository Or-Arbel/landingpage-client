import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
// import { shobData } from '../ShobCardsData';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  Alert,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import useHttp from "../../Hooks/use-http";
import NoData from "../Assets/NoData/NoData";
const demoImage = require("../../images/m2e.jpg");

const ShobCards = () => {
  const [shobData, setShobData] = useState();

  const { isLoading, error, sendRequest } = useHttp();

  useEffect(() => {
    const renderData = async () => {
      let { data } = await sendRequest({
        url: `${process.env.REACT_APP_SERVER_URL}api/shobDevelopments`,
      });
      setShobData(data);
    };

    renderData();
  }, []);

  return (
    <div className={styles.container}>
      {isLoading ? <CircularProgress /> : null}
      {error ? (
        <Alert severity="error" variant="filled">
          {error}
        </Alert>
      ) : null}

      {shobData &&
        shobData.length > 0 &&
        !isLoading &&
        !error &&
        shobData.map((e, i) => (
          <Card className={styles.card} key={i}>
            <CardActionArea href={e.url} target="_blank">
              <CardMedia
                component="img"
                height="140"
                image={e.image ?? demoImage}
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
