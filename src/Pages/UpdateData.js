import React from "react";
import SideNav from "../components/SideNav/SideNav";
import Data from "../components/Data/Data";
import { motion } from "framer-motion";

const UpdateData = () => {
  return (
    <motion.div
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <SideNav />
      <Data />
    </motion.div>
  );
};

export default UpdateData;
