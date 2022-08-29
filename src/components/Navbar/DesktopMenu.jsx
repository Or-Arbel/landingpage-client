import React from "react";
import styles from "./styles.module.scss";
import { NavLink } from "react-router-dom";

import NavbarTitle from "./NavbarTitle";

const pikudLogo = require("../../images/pikudHaorefLogo.png");
const madorLogo = require("../../images/madorLogo.jpg");

const pages = [
  { name: 'מעבדת פיתוח שו"ב', url: "/shob" },
  { name: "דיווח תקלה ויצירת קשר", url: "/report" },
];

const DesktopMenu = () => {
  return (
    <div id={styles.desktopMenu}>
      {/* לוגוים דסטקופ */}
      <img
        src={pikudLogo}
        className={` ${styles.logo} ${styles.desktopOnly}`}
      />
      <img
        src={madorLogo}
        className={` ${styles.logo} ${styles.desktopOnly}`}
      />
      <NavbarTitle />
      {pages.map((page, i) => (
        <NavLink
          key={i}
          className={({ isActive }) =>
            !isActive ? styles.navLink : styles.activeNavLink
          }
          exact
          to={page.url}
        >
          {page.name}
        </NavLink>
      ))}
    </div>
  );
};

export default DesktopMenu;
