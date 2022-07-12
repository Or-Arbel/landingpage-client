import { useContext } from "react";
import { useCallback } from "react";
import { SnackbarContext } from "../App";

const useFormDataFetch = () => {
  const { setSnackbarDetails } = useContext(SnackbarContext);

  const sendFormDataRequest = useCallback(async (requestConfig) => {
    console.log(requestConfig);
    const { body, method, headers, url } = requestConfig;

    var formdata = new FormData();
    // add values from object bodyData to formdata
    for (let key in body) {
      formdata.append(key, body[key]);
    }

    const requestOptions = {
      method: method ?? "GET",
      body: formdata,
      redirect: "follow",
    };

    let fetchResult = fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        return result;
      })
      .catch((error) => {
        setSnackbarDetails({
          open: true,
          message:
            error.message ??
            "ארעה שגיאה בגישה לשרת, נא בדקו את חיבור הרשת ונסו שנית",
          isError: true,
        });
        return error;
      });

    return fetchResult;
  }, []);

  return { sendFormDataRequest };
};

export default useFormDataFetch;
