import React from "react";

//usequeryget hook
import useQueryGet from "../../../Hooks/useQueryGet";

//UI and styles
import styles from "../styles.module.scss";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  Alert,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { MdSecurity } from "react-icons/md";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";

const demoImage = require("../../../images/m2e.jpg");
const securityImage = require("../../../images/security.png");

const SelaCards = () => {
  const { data: selaData, isLoading, error } = useQueryGet("sela");

  if (selaData) {
    console.log(selaData);
  }

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div className={styles.selaCardsContainer}>
      <div className={`${styles.classificationInstructions} ${styles.card}`}>
        {/* <img
          src={securityImage}
          className={styles.security}
          style={{ height: 100 }}
        /> */}

        <GppMaybeIcon />
        <h3>המכשיר בסיווג בלמ"ס</h3>
        <ul>
          <li>אסור להכניס את המכשיר לחמ"לים או דיונים מסווגים.</li>
          <li>הצילום במכשיר זה נועד לשימוש באתרי הרס/פעולות במרחב האזרחי .</li>
          <li> אין לצלם מסכי מחשבים צבאיים (שוע"ל,סודי וכו').</li>
          <li>במידה והמכשיר אבד או נגנב יש לדווח לקצין תקשוב באופן מיידי.</li>
        </ul>
      </div>

      {selaData?.map((e, i) => (
        <Card className={styles.card} key={i}>
          <CardActionArea href={e.url} target="_blank">
            <CardMedia
              component="img"
              height="140"
              image={
                e.image ? process.env.REACT_APP_SERVER_URL + e.image : demoImage
              }
              alt={e.title}
            />
            <CardContent>
              <Typography
                variant="h4"
                component="div"
                className={styles.cardTitle}
              >
                {e.title}
              </Typography>

              <Typography paragraph>{e.description}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
};

export default SelaCards;
