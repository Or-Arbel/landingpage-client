import * as React from "react";
import Button from "@mui/material/Button";
// import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Snackbar } from "@mui/material";
import { SnackbarContext } from "../../../App";
import styles from "./styles.module.scss";

export default function SimpleSnackbar() {
  const { openSnackbar, setOpenSnackbar, snackbarMessage, setSnackbarMessage } =
    React.useContext(SnackbarContext);
  let open = openSnackbar;

  const handleClick = () => {
    setOpenSnackbar(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
    setSnackbarMessage(null);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        {/* CLOSE */}
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      {/* <Button onClick={handleClick}>Open simple snackbar</Button> */}
      <Snackbar
        open={open}
        // open={true}
        autoHideDuration={1000}
        onClose={handleClose}
        action={action}
        // message="or"
        className={styles.snackbar}
      >
        <Alert
          onClose={handleClose}
          // severity="success"
          variant="filled"
          sx={{ width: "100%" }}
          className={styles.alert}
        >
          {snackbarMessage ?? "בוצע"}
        </Alert>
      </Snackbar>
    </div>
  );
}
