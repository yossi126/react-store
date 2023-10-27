import React from "react";
import { Form, NavLink, useRouteLoaderData } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../features/cartSilce";

const Nav = () => {
  const { amount, cart } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const token = useRouteLoaderData("root");
  const userRole = localStorage.getItem("role");

  //TODO: maybe not use the logout as a component
  const handleLogout = () => {
    dispatch(clearCart()); // Dispatch the clearCart action to clear the Redux state
  };

  return (
    <header>
      <nav
        style={{
          display: "flex",
          flexDirection: "column", // Add this line
          alignItems: "center", // Add this line
          justifyContent: "center",
          //borderBottom: "2px solid black",
          paddingBottom: "100px",
          width: "100%",
        }}
      >
        <h1>Shop</h1>
        {token && (
          <ul style={{ display: "flex", listStyle: "none", width: "100%" }}>
            <div style={{ display: "flex", flexGrow: 1 }}>
              <li style={{ margin: "0 10px" }}>
                <NavLink to="/" style={{ fontSize: "20px", color: "white" }}>
                  Home
                </NavLink>
              </li>

              <li style={{ margin: "0 10px" }}>
                <NavLink
                  to="/products"
                  style={{ fontSize: "20px", color: "white" }}
                >
                  Products
                </NavLink>
              </li>
              <li style={{ margin: "0 10px" }}>
                <NavLink
                  to="/costumer"
                  style={{ fontSize: "20px", color: "white" }}
                >
                  costumer
                </NavLink>
              </li>
              <li style={{ margin: "0 10px" }}>
                <NavLink
                  to="/purchased"
                  style={{ fontSize: "20px", color: "white" }}
                >
                  purchased
                </NavLink>
              </li>
            </div>
            {userRole === "admin" ? (
              <li style={{ margin: "0 10px" }}>
                <NavLink to="/" style={{ fontSize: "20px", color: "white" }}>
                  Admin Page
                </NavLink>
              </li>
            ) : null}
            <li style={{ margin: "0 10px" }} className="ml-auto">
              <NavLink to="/cart" style={{ fontSize: "20px", color: "white" }}>
                Cart - {cart.length}
              </NavLink>
            </li>

            <li style={{ margin: "0 10px" }} className="ml-auto">
              <Form action="/logout" method="post" onSubmit={handleLogout}>
                <button
                  style={{
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    boxShadow: "0 2px 2px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  Logout
                </button>
              </Form>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Nav;
