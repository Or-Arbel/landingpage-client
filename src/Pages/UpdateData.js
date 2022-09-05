import React from "react";
import SideNav from "../components/SideNav/SideNav";
import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";

const UpdateData = () => {
  return (
    <motion.div
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
      style={{
        height: "calc(100vh - 64px)",
        top: "64px",
        display: "flex",
        flexDirection: "row",
        width: "100vw",
      }}
    >
      <SideNav />
      <Outlet />
    </motion.div>
  );
};

export default UpdateData;
