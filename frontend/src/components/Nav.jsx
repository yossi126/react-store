import React from "react";
import { Form, NavLink, useRouteLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";

const Nav = () => {
  const { amount, cart } = useSelector((store) => store.cart);
  const token = useRouteLoaderData("root");
  const isAdmin = localStorage.getItem("role");

  return (
    <header>
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          borderBottom: "2px solid black",
          paddingBottom: "10px",
          width: "100%",
        }}
      >
        {token && (
          <ul style={{ display: "flex", listStyle: "none", width: "100%" }}>
            <div style={{ display: "flex", flexGrow: 1 }}>
              <li style={{ margin: "0 10px" }}>
                <NavLink to="/" style={{ fontSize: "20px" }}>
                  Home
                </NavLink>
              </li>
              {isAdmin === "admin" ? (
                <li style={{ margin: "0 10px" }}>
                  <NavLink to="/" style={{ fontSize: "20px" }}>
                    Admin Page
                  </NavLink>
                </li>
              ) : null}
              <li style={{ margin: "0 10px" }}>
                <NavLink to="/products" style={{ fontSize: "20px" }}>
                  Products
                </NavLink>
              </li>
              <li style={{ margin: "0 10px" }}>
                <NavLink to="/costumer" style={{ fontSize: "20px" }}>
                  costumer
                </NavLink>
              </li>
              <li style={{ margin: "0 10px" }}>
                <NavLink to="/purchased" style={{ fontSize: "20px" }}>
                  purchased
                </NavLink>
              </li>
            </div>
            <li style={{ margin: "0 10px" }} className="ml-auto">
              <NavLink to="/cart" style={{ fontSize: "20px" }}>
                Cart - {cart.length}
              </NavLink>
            </li>
            <li style={{ margin: "0 10px" }} className="ml-auto">
              <Form action="/logout" method="post">
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
