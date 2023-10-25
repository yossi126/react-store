import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { addToCart, setIsLoading, load } from "../features/cartSilce";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { apiUrl } from "../env";

function Products() {
  const { products, amount, cart, isLoading } = useSelector(
    (store) => store.cart
  );
  const dispatch = useDispatch();

  const fetchData2 = async () => {
    dispatch(setIsLoading(true));
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${apiUrl}/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        dispatch(setIsLoading(false));
        throw new Error(`${data.message}: ${response.status}`);
      }

      dispatch(load(data));
      dispatch(setIsLoading(false));
    } catch (error) {
      dispatch(setIsLoading(false));
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData2();
  }, []);

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

export const loader = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return redirect("/auth");
  }

  return null;
};

export default Products;
