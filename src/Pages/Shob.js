import React from "react";
import ShobHeader from "../components/ShobHeader/ShobHeader";
import ShobCards from "../components/ShobCards/ShobCards";
import { motion } from "framer-motion";

const Shob = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 1 }}
      style={{ minHeight: "100vh" }}
    >
      <ShobHeader />
      <ShobCards />
    </motion.div>
  );
};

export default Shob;
