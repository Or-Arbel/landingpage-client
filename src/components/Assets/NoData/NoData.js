import React from "react";
const noDataImage = require("../../../images/no_data.svg");

const NoData = () => {
  return (
    <div>
      <img src={noDataImage.default} width={150} height={150} />
      <h3>לא נמצאו נתונים להצגה</h3>
    </div>
  );
};

export default NoData;
