import React from "react";
import { useParams } from "react-router-dom";
const ProductForm = () => {
  const { productId } = useParams();
  return <div>param: {productId}</div>;
};

export default ProductForm;
