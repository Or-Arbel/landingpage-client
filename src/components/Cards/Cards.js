import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
// import { cardsData } from '../cardsData';
import { Card, CardContent, CardHeader } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import useHttp from "../../Hooks/use-http";

const Cards = () => {
  const [departments, setDepartments] = useState();

  const { isLoading, error, sendRequest } = useHttp();

  useEffect(() => {
    const renderData = async () => {
      let { data } = await sendRequest({
        url: `${process.env.REACT_APP_SERVER_URL}api/departments`,
      });
      setDepartments(data);
    };

    renderData();
  }, []);

  const generalImage = require("../../images/general_image.svg");

  return (
    <div className={styles.cardsContainer}>
      {departments?.length > 0 &&
        !isLoading &&
        !error &&
        departments.map((d, i) => (
          <Card className={styles.departmentCard} key={i}>
            <CardHeader title={d.name} className={styles.cardTitle} />
            <div className={styles.imageContainer}>
              <img
                src={
                  d.image
                    ? process.env.REACT_APP_SERVER_URL + d.image
                    : generalImage.default
                }
                width={60}
                height={60}
                style={{ borderRadius: "50%" }}
              />
            </div>
            <CardContent>
              <div className={styles.linksContainer}>
                {d.departmentLinks.map((e, i) => (
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

      {!isLoading && !error && departments && departments.length == 0 && (
        <p>לא נמצאו מחלקות להצגה</p>
      )}
    </div>
  );
};

export default Cards;
