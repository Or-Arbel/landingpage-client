import React from "react";
import { AppBar, Toolbar, IconButton, Stack, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";

const Navbar = (props) => {
  return (
    <AppBar position="sticky" id={styles.appBar}>
      <Toolbar>
        <Stack direction="row" spacing={4}>
          <Button color="inherit">
            <NavLink
              className={({ isActive }) =>
                !isActive ? styles.navLink : styles.activeNavLink
              }
              exact
              to="/"
            >
              פורטל שוע"ל מפקדות
            </NavLink>
          </Button>
          <Button color="inherit">
            <NavLink
              className={({ isActive }) =>
                !isActive ? styles.navLink : styles.activeNavLink
              }
              to="/shob"
            >
              מעבדת פיתוח שו"ב
            </NavLink>
          </Button>
          <Button color="inherit">
            <NavLink
              className={({ isActive }) =>
                !isActive ? styles.navLink : styles.activeNavLink
              }
              exact
              activeClassName={styles.activeNavLink}
              to="/report"
            >
              דיווח תקלה ויצירת קשר
            </NavLink>
          </Button>
          <Button color="inherit">
            <NavLink
              className={({ isActive }) =>
                !isActive ? styles.navLink : styles.activeNavLink
              }
              exact
              activeClassName={styles.activeNavLink}
              to="/update"
            >
              עדכון
            </NavLink>
          </Button>
          <Button
            style={{ color: "rgb(230, 245, 241, 0.6)", fontSize: "16px" }}
            onClick={() => props.setOpenModal(true)}
            className={styles.navLink}
          >
            התחברות
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
