import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  createRef,
} from "react";
import { TableDataContext } from "../Data/Data";
import { SnackbarContext } from "../../App";
import { AiOutlineEdit, AiOutlineSave } from "react-icons/ai";
import styles from "./styles.module.scss";
import Iframe from "../Assets/Iframe/Iframe";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import useHttp from "../../Hooks/use-http";

const ReportUrlUpdate = () => {
  const [reportUrl, setReportUrl] = useState();

  const { tableData } = useContext(TableDataContext);
  const { setSnackbarDetails } = useContext(SnackbarContext);
  let { isLoading, error, sendRequest } = useHttp();

  const [oldUrl, setOldUrl] = useState(tableData[0].url);

  useEffect(() => {
    if (tableData) {
      setReportUrl(tableData[0].url);
      setOldUrl(tableData[0].url);
    }
  }, []);

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
    <div className={styles.reportUpdateContainer}>
      <p>
        בעמוד "דיווח תקלה ויצירת קשר" מופיע אתר חיצוני, הכתובת המעודכנת בבסיס
        הנתונים:
      </p>
      {tableData && (
        <input
          className={styles.urlInput}
          type="text"
          value={reportUrl}
          onChange={(e) => setReportUrl(e.target.value)}
        />
      )}

      {/* {tableData && (
        <TextField
          required
          style={{ direction: "rtl" }}
          // className={styles.urlInput}
          id="outlined-required"
          label="Required"
          defaultValue={reportUrl}
          onChange={(e) => setReportUrl(e.target.value)}
        />
      )} */}

      {/* <button onClick={updateReportUrl} disabled={oldUrl === reportUrl}>
        <AiOutlineSave />
        שמירה
      </button> */}
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

        <Iframe src={reportUrl} height="500" width="1000" />
      </div>
      {/* )} */}
    </div>
  );
};

export default ReportUrlUpdate;
