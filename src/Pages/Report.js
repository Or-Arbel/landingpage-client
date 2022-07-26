import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Iframe from "../components/Assets/Iframe/Iframe";
import useHttp from "../Hooks/use-http";

const Report = () => {
  const [url, setUrl] = useState();
  let { isLoading, error, sendRequest } = useHttp();

  useEffect(() => {
    const getData = async () => {
      const { data } = await sendRequest({
        url: `${process.env.REACT_APP_SERVER_URL}api/reportUrl/`,
      });
      if (data && data[0].url) {
        setUrl((prev) => data[0].url);
      }
    };
    getData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      style={{ paddingTop: "20px", minHeight: "100vh" }}
      transition={{ duration: 1 }}
    >
      <h2>דיווח תקלה ויצירת קשר</h2>

      {url && <Iframe src={url} width="80%" height="800" />}
    </motion.div>
  );
};

export default Report;
