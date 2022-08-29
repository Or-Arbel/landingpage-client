import React from "react";
import Typography from "@mui/material/Typography";

const NavbarTitle = (props) => {
  return (
    <Typography
      variant="h5"
      noWrap
      component="a"
      href="/"
      sx={{
        display: "flex",
        flexGrow: 1,
        fontWeight: 700,
        textDecoration: "none",
        fontFamily: "Rubik",
        alignItems: "center",
        padding: "5px",
      }}
    >
      פורטל שוע"ל
    </Typography>
  );
};

export default NavbarTitle;
