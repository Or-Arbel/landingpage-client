import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div dir="ltr" style={{ margin: "20px" }}>
      <p>Error! Page not found...</p>
      <Link to="/">Back to home page</Link>
    </div>
  );
};

export default ErrorPage;
