import { motion } from "framer-motion";
import React from "react";
import Cards from "../components/Cards/Cards";
import LinksList from "../components/LinksList/LinksList";
import MainLinks from "../components/MainLinks/MainLinks";

const Shual = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <MainLinks />
      <LinksList />
      <Cards />
    </motion.div>
  );
};

export default Shual;
