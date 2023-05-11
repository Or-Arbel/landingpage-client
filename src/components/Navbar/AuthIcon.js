import React from "react";
import styles from "./styles.module.scss";
import { NavLink } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";

const AuthIcon = (props) => {
  const logOutFunc = () => {
    props.setIsLoggedIn((prev) => false);
    localStorage.removeItem("userData");
  };
  return (
    <div>
      {props.isLoggedIn ? (
        <>
          <IconButton
            size="large"
            aria-label="log out current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={logOutFunc}
            className={styles.logoutIcon}
          >
            <LogoutIcon />
          </IconButton>

          <IconButton
            size="large"
            aria-label="update"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            className={styles.updateIcon}
          >
            <NavLink exact to="/update">
              <SettingsIcon />
            </NavLink>
          </IconButton>
        </>
      ) : (
        <IconButton
          size="large"
          aria-label="log in user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={() => props.setOpenModal(true)}
          className={styles.loginIcon}
        >
          <AccountCircleIcon />
        </IconButton>
      )}
    </div>
  );
};

export default AuthIcon;
