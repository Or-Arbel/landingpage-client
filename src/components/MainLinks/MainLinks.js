import React from "react";

//usequeryget hook
import useQueryGet from "../../Hooks/useQueryGet";

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
  const { data: mainLinks, isLoading, error } = useQueryGet("mainLinks");

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
