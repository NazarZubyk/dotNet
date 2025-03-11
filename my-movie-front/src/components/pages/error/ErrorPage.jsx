import React from "react";
import ErrorImage404 from "../../../assets/error404.svg";
import { Box } from "@mui/material";

const ErrorPage = () => {
  return (
    <div className="flex justify-center min-h-screen">
      <img
        src={ErrorImage404}
        alt="error - not found page"
        className="max-h-screen"
      />
    </div>
  );
};

export default ErrorPage;
