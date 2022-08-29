import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Container from "@mui/material/Container";

import styles from "./styles.module.scss";
import DateAndTime from "./DateAndTime";
import AuthIcon from "./AuthIcon";
import NavbarTitle from "./NavbarTitle";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";

const pikudLogo = require("../../images/pikudHaorefLogo.png");
const madorLogo = require("../../images/madorLogo.jpg");

const Navbar = (props) => {
  return (
    <Container id={styles.navbarContainer}>
      {/* key={props.isLoggedIn} */}
      <Toolbar
        disableGutters
        sx={{
          justifyContent: "space-between",
        }}
      >
        {/* צד ימין */}
        {/* תפריט המבורגר במובייל*/}
        <MobileMenu
          isLoggedIn={props.isLoggedIn}
          setIsLoggedIn={props.setIsLoggedIn}
          setOpenModal={props.setOpenModal}
        />

        {/* תפריט דסקטופ כולל לוגוים, כותרת ותפריט */}
        <DesktopMenu />
        {/* סוף צד ימין*/}

        {/* כותרת פורטל שועל במצב מובייל , מופיעה באמצע בין 2 לוגוים */}
        <div id={styles.mobileTitleWrapper}>
          <img
            src={pikudLogo}
            className={` ${styles.logo} ${styles.tabletOnly}`}
          />
          <NavbarTitle />
          <img
            src={madorLogo}
            className={` ${styles.logo} ${styles.tabletOnly}`}
          />
        </div>

        {/* צד שמאל */}
        <Box className={styles.dateAuthWrapper}>
          <AuthIcon
            isLoggedIn={props.isLoggedIn}
            setIsLoggedIn={props.setIsLoggedIn}
            setOpenModal={props.setOpenModal}
          />
          <DateAndTime />
        </Box>

        <div className={styles.mobileLogos}>
          <img src={pikudLogo} className={` ${styles.logo}`} />
          {/* <img src={madorLogo} className={` ${styles.logo}`} /> */}
        </div>

        {/* סוף צד שמאל */}
      </Toolbar>
    </Container>
  );
};
export default React.memo(Navbar);
