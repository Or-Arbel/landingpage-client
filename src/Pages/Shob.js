import React from "react";
import ShobHeader from "../components/ShobHeader/ShobHeader";
import ShobCards from "../components/ShobCards/ShobCards";
import { motion } from "framer-motion";

const Shob = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ShobHeader />
      <ShobCards />
    </motion.div>
  );
};

export default Shob;
