import React from "react";
import { motion } from "framer-motion";

const Report = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      style={{ paddingTop: "20px", minHeight: "100vh" }}
      transition={{ duration: 1 }}
    >
      Report
    </motion.div>
  );
};

export default Report;
