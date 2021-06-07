import React from "react";
import AuthProvider from "../context/AuthProvider";

const ContextWrapper = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default ContextWrapper;
