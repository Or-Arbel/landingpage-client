import * as React from "react";
import Button from "@mui/material/Button";
// import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Snackbar } from "@mui/material";
import { SnackbarContext } from "../../../App";
import styles from "./styles.module.scss";

export default function SimpleSnackbar() {
  const { openSnackbar, setOpenSnackbar, snackbarDetails, setSnackbarDetails } =
    React.useContext(SnackbarContext);
  let open = openSnackbar;

  // const handleClick = () => {
  //   setOpenSnackbar(true);
  // };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
    setSnackbarDetails({ message: undefined, isError: false });
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
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        action={action}
        className={styles.snackbar}
      >
        <Alert
          onClose={handleClose}
          variant="filled"
          sx={{ width: "100%" }}
          className={snackbarDetails.isError ? styles.error : styles.success}
        >
          {snackbarDetails.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
