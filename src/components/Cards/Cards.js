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
    const renderDepartments = (fetchedData) => {
      setDepartments(fetchedData.data);
      console.log(fetchedData.data);
    };

    sendRequest(
      { url: `${process.env.REACT_APP_SERVER_URL}api/departments` },
      renderDepartments
    );
  }, []);
  return (
    <div className={styles.cardsContainer}>
      {isLoading ? <CircularProgress /> : null}
      {error ? <p>{error}</p> : null}
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
                  <img
                    src={require(`../../images/img${i + 1}.svg`)}
                    width={50}
                    height={50}
                  />
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
