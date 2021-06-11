import React from "react";
import AuthProvider from "../context/AuthProvider";
import ApiProvider from "../context/ApiProvider";
import CartProvider from "../context/CartProvider";

const ContextWrapper = ({ children }) => {
  return (
    <AuthProvider>
      <ApiProvider>
        <CartProvider>{children}</CartProvider>
      </ApiProvider>
    </AuthProvider>
  );
};

export default ContextWrapper;
