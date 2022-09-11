// import { useContext } from "react";
import { useQuery } from "react-query";
import axios from "axios";
// import { SnackbarContext } from "../App";
// import { useState } from "react";

const useQueryGet = (table) => {
  // const { setSnackbarDetails } = useContext(SnackbarContext);

  const { data, isLoading, error } = useQuery(
    table,
    () =>
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}api/${table}?order=order`)
        .then((res) => res.data.data),
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      staleTime: 120000, // 120 sec - 2 minutes
      // cacheTime: 30000, // default is 5000 ( 5 min )
    }
  );

  //   if (error) {
  //     setSnackbarDetails({
  //       open: true,
  //       message:
  //         error.message !== "Request failed with status code 404"
  //           ? error.message
  //           : "ארעה שגיאה בגישה לשרת, נא בדקו את חיבור הרשת ונסו שנית",
  //       isError: true,
  //     });
  //   }

  return { data, isLoading, error };
};

export default useQueryGet;
