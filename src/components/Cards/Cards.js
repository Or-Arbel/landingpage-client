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

  const tryRequireImage = (index) => {
    try {
      let img = require(`../../images/img${index + 1}.svg`);
      if (img) {
        return require(`../../images/img${index + 1}.svg`);
      } else {
        return generalImage.default;
      }
    } catch (err) {
      return generalImage.default;
    }
  };

  return (
    <div className={styles.cardsContainer}>
      {departments &&
        !isLoading &&
        !error &&
        departments.map((d, i) => (
          <Card className={styles.departmentCard} key={i}>
            <CardHeader
              title={d.name}
              className={styles.cardTitle}
              style={{ paddingBottom: "40px" }}
            />
            <CardContent>
              <div className={styles.linksContainer}>
                <div className={styles.imageContainer}>
                  {/* Image is desplayed from frontend */}
                  <img src={tryRequireImage(i + 1)} width={50} height={50} />
                </div>
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
    </div>
  );
};

export default Cards;
