import React from "react";
// import { cardsData } from '../cardsData';

//usequeryget hook
import useQueryGet from "../../Hooks/useQueryGet";

//UI and styles
import styles from "./styles.module.scss";
import { Card, CardContent, CardHeader } from "@mui/material";

const Cards = () => {
  const { data: departments, isLoading, error } = useQueryGet("departments");
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
                {d.departmentLinks?.map((e, i) => (
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

export default React.memo(Cards);
