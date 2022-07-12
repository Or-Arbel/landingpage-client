import React, { useState, useEffect } from "react";
import useHttp from "../../Hooks/use-http";
import styles from "./styles.module.scss";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";
import CircularProgress from "@mui/material/CircularProgress";
import { Alert } from "@mui/material";

import { CardHeader } from "@mui/material";

const MainLinks = () => {
  const [mainLinks, setMainLinks] = useState();

  const { isLoading, error, sendRequest } = useHttp();

  const demoImage = require("../../images/m2e.jpg");

  useEffect(() => {
    const renderData = async () => {
      let { data } = await sendRequest({
        url: `${process.env.REACT_APP_SERVER_URL}api/mainLinks`,
      });
      setMainLinks(data);
      console.log(data);
    };

    renderData();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <h1>פורטל שוע"ל מפקדות</h1>
        {isLoading ? <CircularProgress /> : null}
        {error ? (
          <Alert severity="error" variant="filled">
            {error}
          </Alert>
        ) : null}
        {!isLoading &&
          !error &&
          mainLinks?.map((element, index) => (
            <Card sx={{ maxWidth: 345 }} className={styles.mainLinkCard}>
              <CardActionArea
                href={element.url}
                target="_blank"
                rel="noreferrer"
              >
                <CardMedia
                  component="img"
                  height="100"
                  image={
                    element.image
                      ? process.env.REACT_APP_SERVER_URL + element.image
                      : demoImage
                  }
                  alt={element.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {element.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
      </div>
    </>
  );
};

export default MainLinks;
