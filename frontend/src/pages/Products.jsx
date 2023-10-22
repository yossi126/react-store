import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { addToCart } from "../features/cartSilce";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

function Products() {
  const { products, amount, cart, isLoading } = useSelector(
    (store) => store.cart
  );
  const dispatch = useDispatch();

  if (products.length === 0)
    return (
      <h1>
        {isLoading
          ? "Loading..."
          : products.length === 0
          ? "Error with the fetching the products..."
          : null}
      </h1>
    );

  return (
    <>
      <h3>products page</h3>
      {products.map((product) => {
        const isProductInCart = cart.some((item) => item._id === product._id);

        return (
          <article
            key={product._id}
            style={{
              border: "1px solid black",
              padding: "10px",
              borderRadius: "5px",
              margin: "10px",
              width: "200px",
            }}
          >
            <h4>{product.name}</h4>
            <Link to={`${product._id}`}>Edit</Link>
            <h5>{product.price}</h5>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <button
                disabled={isProductInCart}
                onClick={() => {
                  dispatch(addToCart(product));
                }}
              >
                {isProductInCart ? "In cart" : "Add"}
              </button>
            </div>
          </article>
        );
      })}
      <Outlet />
    </>
  );
}

export default Products;
