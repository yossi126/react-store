import React from "react";
import { Outlet } from "react-router-dom";

const ProductsRootLayout = () => {
  return (
    <>
      <h3>ProductsRootLayout</h3>
      <Outlet />
    </>
  );
};

export default ProductsRootLayout;
