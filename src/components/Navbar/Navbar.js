import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";
import SettingsIcon from "@mui/icons-material/Settings";
import DateAndTime from "./DateAndTime";
import { style } from "@mui/system";

const pikudLogo = require("../../images/pikudHaorefLogo.png");
const madorLogo = require("../../images/madorLogo.jpg");

const pages = [
  { name: 'מעבדת פיתוח שו"ב', url: "/shob" },
  { name: "דיווח תקלה ויצירת קשר", url: "/report" },
];

const Navbar = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="sticky" id={styles.appBar} key={props.isLoggedIn}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* desktop */}

          {/* desktop LOGO */}
          <img src={pikudLogo} className={styles.desktopLogo} />
          <img src={madorLogo} className={styles.desktopLogo} />

          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}

          <NavLink className={styles.mobileMenuLink} exact to="/">
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mx: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                letterSpacing: ".3rem",
                textDecoration: "none",
                fontFamily: "Rubik",
              }}
            >
              פורטל שוע"ל
            </Typography>
          </NavLink>

          {/* responsive mode*/}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            {/* Hamburger icon - shown on mobile */}
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: {
                  xs: "block",
                  md: "none",
                  display: "flex",
                  flexDirection: "column",
                },
              }}
              sm={{
                display: {
                  xs: "block",
                  md: "none",
                  display: "flex",
                  flexDirection: "column",
                },
              }}
            >
              {pages.map((page, i) => (
                <MenuItem key={i} onClick={handleCloseNavMenu}>
                  <Button key={i} onClick={handleCloseNavMenu} color="inherit">
                    <NavLink
                      className={styles.mobileMenuLink}
                      exact
                      to={page.url}
                    >
                      {page.name}
                    </NavLink>
                  </Button>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* mobile logo */}
          <img src={pikudLogo} className={styles.mobileLogo} />

          {/* כותרת פורטל שועל במצב מובייל , מופיעה באמצע */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mx: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".3rem",
              textDecoration: "none",
              fontFamily: "Rubik",
              alignItems: "center",
            }}
          >
            פורטל שוע"ל
            <img src={madorLogo} className={styles.mobileLogo} />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, i) => (
              <Button
                key={i}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <NavLink
                  className={({ isActive }) =>
                    !isActive ? styles.navLink : styles.activeNavLink
                  }
                  exact
                  to={page.url}
                >
                  {page.name}
                </NavLink>
              </Button>
            ))}
          </Box>
          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              alignItems: "center",
              padding: "10px",
              justifyContent: "space-between",
              maxWidth: "20%",
            }}
          >
            {props.isLoggedIn ? (
              <div>
                <IconButton
                  size="large"
                  aria-label="log out current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={props.logOutFunc}
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
              </div>
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

            <DateAndTime />
            {/* <div id={styles.dateAndTime}>
              {new Date().toLocaleDateString()}
              <br />
              <div className={styles.time}>{currentTime}</div>
            </div> */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default React.memo(Navbar);
