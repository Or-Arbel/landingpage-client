import React, { useEffect, useState, useContext } from "react";
import styles from "./styles.module.scss";

import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const ImageUpload = (props) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [imgPath, setImgPath] = useState();
  const [showInfoSnackbar, setShowInfoSnackbar] = useState(false);

  useEffect(() => {
    const getCurrentImage = async () => {
      setImgPath(props.currentImage);
    };
    getCurrentImage();
  }, []);

  const handleOpen = (event) => {
    setOpenMenu(true);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handleChangeImage = async (e) => {
    props.onChange(e.target.files[0]);
    setShowInfoSnackbar(true);
    handleClose();
  };

  const handleRemoveImage = async (rowId) => {
    props.onChange(null);
    setShowInfoSnackbar(true);
    handleClose();
  };

  return (
    <div>
      <div className={styles.container}>
        <>
          <img
            src={
              imgPath
                ? process.env.REACT_APP_SERVER_URL + imgPath
                : process.env.REACT_APP_SERVER_URL + "uploads/noimage.png"
            }
          />

          <div class={styles.content} onClick={(event) => handleOpen(event)}>
            <div class={styles.text}>
              {props.rowId ? "שינוי תמונה" : "העלאת תמונה"}
            </div>
          </div>
          <Popover
            open={openMenu}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <List sx={{ px: 0, py: 1, textAlign: "right", direction: "rtl" }}>
              <input
                type="file"
                name="file"
                id="imgupload"
                style={{ display: "none" }}
                onChange={(e) => handleChangeImage(e)}
              />
              <label for="imgupload">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText
                      primary="העלאת תמונה"
                      sx={{ textAlign: "center", px: 2 }}
                    />
                  </ListItemButton>
                </ListItem>
              </label>

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText
                    primary="הסרת תמונה"
                    sx={{ textAlign: "center", px: 2 }}
                    onClick={() => handleRemoveImage(props.rowId)}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Popover>
        </>
      </div>
      <Snackbar
        open={showInfoSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowInfoSnackbar(false)}
      >
        <MuiAlert severity="info" sx={{ width: "100%", direction: "rtl" }}>
          בחירתך עודכנה ותישמר עם שמירת הרשומה
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default ImageUpload;
