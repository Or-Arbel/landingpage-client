import React from "react";

/*
 This component is not working yet, 
 the main task of the component is 
 to make the columns translation to hebrew 
 dinamic and suitable to every table. 
 */

const createColumnsArr = (element) => {
  let keysArr = Object.keys(element);

  console.log(keysArr);
  const columnsArr = [];
  if (keysArr.includes("order")) {
    columnsArr = columnsArr.push("סדר");
    keysArr = keysArr.filter((e) => e !== "order");
  }
  console.log(keysArr);

  if (columnsArr.length > 0) {
    console.log(columnsArr);
  }

  // return columnsArr;
  return null;
};

export default createColumnsArr;
