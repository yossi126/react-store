import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../features/cartSilce";
import axios from "axios";
import { apiUrl } from "../env";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, total } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    // get the ids of the products in the cart
    const ids = cart.map((item) => item._id);

    // create the new order object
    const newOrder = { products: ids, totalPrice: total };
    //console.log(newOrder);
    try {
      const newOrderResponse = await axios.post(`${apiUrl}/orders`, newOrder, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const orderId = newOrderResponse.data.orderId;

      // create purchase

      const newPurchaseResponse = await axios.post(
        `${apiUrl}/purchase`,
        { order: orderId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert(newPurchaseResponse.data.message);
      dispatch(clearCart());
      navigate(-1);

      // console.log(newPurchaseResponse.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {cart.map((item) => {
          return (
            <div
              key={item._id}
              style={{
                width: "300px",
                margin: "10px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                boxShadow: "0 2px 2px rgba(0, 0, 0, 0.3)",
              }}
            >
              <img
                src={item.images[0]}
                alt={item.name}
                style={{ width: "100%", height: "auto" }}
              />
              <h3>{item.name}</h3>
              <h4>{item.price}</h4>
            </div>
          );
        })}
      </div>
      <button onClick={handleCheckout}>Checkout</button>
      <button
        onClick={() => {
          dispatch(clearCart());
        }}
      >
        Clear Cart
      </button>
    </>
  );
};

export default Cart;
