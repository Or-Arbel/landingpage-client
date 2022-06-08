import { useContext } from "react";
import { useState, useCallback } from "react";
import { SnackbarContext } from "../App";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setSnackbarDetails } = useContext(SnackbarContext);

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
  };

  const sendRequest = useCallback(async (requestConfig) => {
    const params = ["GET", undefined].includes(requestConfig.method)
      ? "?order=order"
      : "";
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url + params, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : headers,
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        redirect: "follow",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(
        err.message ?? "ארעה שגיאה בגישה לשרת, נא בדקו את חיבור הרשת ונסו שנית"
      );
      setSnackbarDetails({
        open: true,
        message:
          err.message ??
          "ארעה שגיאה בגישה לשרת, נא בדקו את חיבור הרשת ונסו שנית",
        isError: true,
      });
      return err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
