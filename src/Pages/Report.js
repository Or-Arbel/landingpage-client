import React from "react";
import { motion } from "framer-motion";

const Report = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ margin: "20px auto" }}
    >
      Report
    </motion.div>
  );
};

export default Report;
