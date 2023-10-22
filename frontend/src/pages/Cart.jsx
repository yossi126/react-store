import React from "react";
import { useSelector } from "react-redux";
import { clearCart } from "../features/cartSilce";

import { useDispatch } from "react-redux";
const Cart = () => {
  const { products, amount, cart } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  //console.log(cart);
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
      <button
        onClick={() => {
          dispatch(clearCart());
        }}
      >
        Checkout
      </button>
    </>
  );
};

export default Cart;
