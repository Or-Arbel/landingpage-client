import React, { useState, useEffect, useContext } from "react";
import useHttp from "../../Hooks/use-http";
import Iframe from "../Assets/Iframe/Iframe";
import { SnackbarContext } from "../../App";

//UI and styles
import styles from "./styles.module.scss";
import Button from "@mui/material/Button";
import { AiOutlineSave } from "react-icons/ai";

const ReportUrlUpdate = () => {
  const [reportUrl, setReportUrl] = useState();
  const [oldUrl, setOldUrl] = useState();
  const { setSnackbarDetails } = useContext(SnackbarContext);
  let { sendRequest } = useHttp();

  //Get report url from db
  const getUrlFromDb = async () => {
    let { data } = await sendRequest({
      url: `${process.env.REACT_APP_SERVER_URL}api/reportUrl`,
    });
    if (!oldUrl || !reportUrl) {
      setOldUrl(data[0].url);
      setReportUrl(data[0].url);
    }
  };
  useEffect(() => {
    getUrlFromDb();
  });

  const updateReportUrl = async () => {
    if (reportUrl === oldUrl) {
      setSnackbarDetails({
        open: true,
        message: "הלינק שהוכנס זהה ללינק השמור במערכת",
        isError: true,
      });
    } else {
      const requestOptions = {
        url: `${process.env.REACT_APP_SERVER_URL}api/reportUrl/`,
        method: "PATCH",
        body: { url: reportUrl },
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("userData")).token,
        },
      };
      const data = await sendRequest(requestOptions);
      console.log("data");
      console.log(data);
      if (data && data.status === "success") {
        setSnackbarDetails({
          open: true,
          message: "הלינק עודכן בהצלחה",
          isError: false,
        });
        setOldUrl(data.data.url);
      }
    }
  };

  return (
    <div
      className={styles.reportUpdateContainer}
      // style={{ backgroundColor: "green" }}
    >
      <p>
        בעמוד "דיווח תקלה ויצירת קשר" מופיע אתר חיצוני, הכתובת המעודכנת בבסיס
        הנתונים:
      </p>

      <input
        className={styles.urlInput}
        type="text"
        value={reportUrl}
        onChange={(e) => setReportUrl(e.target.value)}
      />

      <Button
        onClick={updateReportUrl}
        disabled={oldUrl === reportUrl}
        variant="contained"
        // endIcon={<AiOutlineSave />}
      >
        שמירה
        <AiOutlineSave />
      </Button>

      <div className={styles.preview}>
        <p>
          <b>תצוגה מקדימה</b>
        </p>

        <Iframe src={reportUrl} />
      </div>
    </div>
  );
};

export default ReportUrlUpdate;
