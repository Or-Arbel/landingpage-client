import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

//UI and styles
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

const MainLinks = () => {
  const demoImage = require("../../images/m2e.jpg");

  const {
    isLoading,
    error,
    data: mainLinks,
  } = useQuery("mainLinks", () =>
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}api/mainLinks?order=order`)
      .then((res) => res.data.data)
  );

  return (
    <>
      <div className={styles.container}>
        <h1>פורטל שוע"ל מפקדות</h1>
        {isLoading && <CircularProgress />}
        {error && (
          <Alert severity="error" variant="filled">
            {error.message}
          </Alert>
        )}
        {!isLoading &&
          !error &&
          mainLinks?.map((element, index) => (
            <Card
              sx={{ maxWidth: 345 }}
              className={styles.mainLinkCard}
              key={index}
            >
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

export default React.memo(MainLinks);
