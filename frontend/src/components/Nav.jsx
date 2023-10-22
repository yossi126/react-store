import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Nav = () => {
  const { amount, cart } = useSelector((store) => store.cart);

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
        <ul style={{ display: "flex", listStyle: "none", width: "100%" }}>
          <div style={{ display: "flex", flexGrow: 1 }}>
            <li style={{ margin: "0 10px" }}>
              <NavLink to="/home" style={{ fontSize: "20px" }}>
                Home
              </NavLink>
            </li>
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
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
