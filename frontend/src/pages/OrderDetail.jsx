import React from "react";
import axios from "axios";
import { apiUrl } from "../env";
import { useLoaderData, useNavigate } from "react-router-dom";

const OrderDetail = () => {
  const { data: order } = useLoaderData();
  const navigate = useNavigate();

  function cancelHandler() {
    navigate(-1);
  }
  ///TODO: finish the style
  return (
    <div>
      <label>order id</label>
      <h5>{order._id}</h5>
      <label>products:</label>
      {order.products.map((product) => {
        return (
          <div key={product._id}>
            <p>
              {product.name} - {product.price}
            </p>
          </div>
        );
      })}
      <label>total price:</label>
      <p>{order.totalPrice}</p>
      <label>createdAt:</label>

      <p>
        {new Date(order.createdAt).toLocaleString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      <button type="button" onClick={cancelHandler}>
        back
      </button>
    </div>
  );
};

export default OrderDetail;

export const loader = async ({ params }) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`${apiUrl}/orders/${params.orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }

  return null;
};
