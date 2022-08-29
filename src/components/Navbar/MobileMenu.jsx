import React from "react";

//MUI
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";

const pages = [
  { name: 'מעבדת פיתוח שו"ב', url: "/shob" },
  { name: "דיווח תקלה ויצירת קשר", url: "/report" },
];

const MobileMenu = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const logOutFunc = () => {
    props.setIsLoggedIn((prev) => false);
    localStorage.removeItem("userData");
    setAnchorElNav(null);
  };

  return (
    <Box className={styles.mobileMenuContainer}>
      {/* Hamburger icon - shown on mobile */}
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="mobile-menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        id={styles.hamburger}
      >
        <MenuIcon />
      </IconButton>

      <Menu
        id="mobile-menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
      >
        {pages.map((page, i) => (
          <MenuItem
            key={i}
            onClick={handleCloseNavMenu}
            className={styles.liWrapper}
          >
            <Button key={i} onClick={handleCloseNavMenu}>
              <NavLink exact to={page.url} className={styles.mobileMenuLink}>
                {page.name}
              </NavLink>
            </Button>
          </MenuItem>
        ))}

        {/* התחברות / התנתקות */}

        {props.isLoggedIn ? (
          <>
            {/* ניהול הגדרות */}
            <MenuItem
              onClick={handleCloseNavMenu}
              className={`${styles.liWrapper} ${styles.authLi}`}
            >
              <Button onClick={handleCloseNavMenu}>
                <NavLink exact to={"/update"} className={styles.mobileMenuLink}>
                  <span className={styles.mobileMenuLink}>ניהול הגדרות</span>
                </NavLink>
              </Button>
            </MenuItem>

            {/* התנתק */}
            <MenuItem
              onClick={handleCloseNavMenu}
              className={`${styles.liWrapper} ${styles.authLi}`}
            >
              <Button onClick={logOutFunc}>
                <span className={styles.mobileMenuLink}>התנתק</span>
              </Button>
            </MenuItem>
          </>
        ) : (
          <MenuItem
            onClick={handleCloseNavMenu}
            className={`${styles.liWrapper} ${styles.authLi}`}
          >
            <Button onClick={() => props.setOpenModal(true)}>
              <span className={styles.mobileMenuLink}>התחבר</span>
            </Button>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default MobileMenu;
