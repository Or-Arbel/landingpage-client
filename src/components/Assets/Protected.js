import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const isLoggedIn = () => {
    const userdata = localStorage.getItem("userData");
    return !!userdata; // if there is user in ls return true, else return false
  };

  let checkAuth = isLoggedIn();
  if (!checkAuth) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default Protected;
