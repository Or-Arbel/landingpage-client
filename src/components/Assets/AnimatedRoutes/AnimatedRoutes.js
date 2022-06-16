import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Shual from "../../../Pages/Shual";
import Shob from "../../../Pages/Shob";
import Report from "../../../Pages/Report";
import ErrorPage from "../../../Pages/ErrorPage";
import UpdateData from "../../../Pages/UpdateData";
import Protected from "../Protected";

import { AnimatePresence } from "framer-motion";

const AnimatedRoutes = (props) => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Shual />} />
        <Route path="/shob" element={<Shob />} />
        <Route path="/report" element={<Report />} />
        <Route path="/update">
          <Route
            index={true}
            element={
              <Protected isLoggedIn={props.isLoggedIn}>
                <UpdateData />
              </Protected>
            }
          />
          <Route
            path=":table"
            element={
              <Protected isLoggedIn={props.isLoggedIn}>
                <UpdateData />
              </Protected>
            }
          />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
