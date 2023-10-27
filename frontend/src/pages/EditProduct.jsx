import React from "react";
import ProductForm from "../components/ProductForm";
import { redirect, useNavigate, useLoaderData } from "react-router-dom";
import ProductUsers from "../components/ProductUsers";
import axios from "axios";
import { apiUrl } from "../env";

const EditProduct = () => {
  const data = useLoaderData();
  const navigate = useNavigate();

  //TODO: move the button the the product form
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <>
      <ProductForm product={data} />

      <button onClick={handleCancel}>Cancel</button>

      <div style={{ marginTop: "20px" }}>
        <ProductUsers />
      </div>
    </>
  );
};

export default EditProduct;

export const loader = async ({ request, params }) => {
  const userRole = localStorage.getItem("role");
  if (userRole !== "admin") {
    alert("Only admin can access this page");

    return redirect("/products");
  }

  const productId = params.productId;
  const product = await getProductById(productId);

  return product;
};

const getProductById = async (productId) => {
  const response = await axios.get(`${apiUrl}/products/` + productId, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const { data } = response;
  return data;
};
