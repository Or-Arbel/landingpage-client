import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";

const pages = [
  { name: 'מעבדת פיתוח שו"ב', url: "/shob" },
  { name: "דיווח תקלה ויצירת קשר", url: "/report" },
  { name: "עדכון", url: "/update" },
];

const Navbar = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  console.log("navbar render");
  return (
    <AppBar position="sticky" id={styles.appBar}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* desktop */}
          {/* LOGO */}
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <NavLink className={styles.mobileMenuLink} exact to="/">
            <Typography
              variant="h6"
              noWrap
              component="a"
              // href="/"
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

          {/* responsive */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            {/* mobile logo */}
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
                display: { xs: "block", md: "none" },
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
            }}
          >
            פורטל שוע"ל
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
            <Button
              style={{
                color: "rgb(230, 245, 241, 0.6)",
                fontSize: "16px",
                padding: "10px",
                fontFamily: "Rubik",
              }}
              onClick={() => props.setOpenModal(true)}
            >
              התחברות
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>{new Date().toLocaleDateString()}</Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default React.memo(Navbar);
