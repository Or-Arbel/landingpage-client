import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Shual from "../../../Pages/Shual";
import Shob from "../../../Pages/Shob";
import Report from "../../../Pages/Report";
import ErrorPage from "../../../Pages/ErrorPage";
import UpdateData from "../../../Pages/UpdateData";

import Protected from "../Protected";

import { AnimatePresence } from "framer-motion";
import UpdateTableData from "../../UpdateTableData";
import ReportUrlUpdate from "../../ReportUrlUpdate/ReportUrlUpdate";
import UpdateMainPage from "../../UpdateTableData/UpdateMainPage";
import Sela from "../../../Pages/Sela/Sela";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        {/* דף הבית */}
        <Route path="/" element={<Shual />} />
        {/* עמוד פיתוחי מעבדת שוב */}
        <Route path="/shob" element={<Shob />} />
        {/* עמוד דיווח תקלה ויצירת קשר */}
        <Route path="/report" element={<Report />} />
        {/* עמוד פורטל סלע */}
        <Route path="/sela" element={<Sela />} />

        <Route
          path="/update"
          element={
            <Protected>
              <UpdateData />
            </Protected>
          }
        >
          <Route index element={<UpdateMainPage />} />
          <Route exact path="reportUrl" element={<ReportUrlUpdate />} />
          <Route path=":table" element={<UpdateTableData />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
