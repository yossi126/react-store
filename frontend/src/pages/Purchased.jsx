import React, { useState } from "react";
import axios from "axios";
import { apiUrl } from "../env";
import { Link, useLoaderData } from "react-router-dom";
import { getProductsIds, getUsersIds } from "../util/utils";

const Purchased = () => {
  const data = useLoaderData();
  //console.log(data);

  const [user, setUser] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [price, setPrice] = useState("");
  const [purchases, setPurchases] = useState(data.response.data);
  //console.log(purchases);
  const [productId, setProductId] = useState("");
  //state for the select options
  const [usersIds, setUsersIds] = useState(data.usersIds);
  // console.log(usersIds);
  const [productsIds, setProductsIds] = useState(data.productsIds);

  const handleClear = () => {
    setUser("");
    setCreatedAt("");
    setProductId("");
    setPrice("");
    setPurchases(data.response.data);
  };

  const handleSearch = async () => {
    const token = localStorage.getItem("token");

    const searchParams = new URLSearchParams();
    if (user) {
      searchParams.append("user", user);
    }

    if (createdAt) {
      //console.log(createdAt);
      searchParams.append("createdAt", createdAt);
    }
    // console.log(searchParams.toString());
    const url = `${apiUrl}/purchase/?${searchParams.toString()}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // filter with the ui
    let filteredPurchases = response.data.purchases;

    if (price) {
      filteredPurchases = filteredPurchases.filter((purchase) => {
        return purchase.order.totalPrice === Number(price);
      });
    }

    if (productId) {
      filteredPurchases = filteredPurchases.filter((purchase) => {
        return purchase.order.products.includes(productId);
      });
    }
    //console.log(date);
    setPurchases({ purchases: filteredPurchases });
    //console.log(filteredPurchases);
  };

  return (
    <>
      <label>Users</label>
      <select value={user} onChange={(e) => setUser(e.target.value)}>
        <option value="">All</option>
        {usersIds.map((data) => {
          return (
            <option key={data.id} value={data.id}>
              {data.name}
            </option>
          );
        })}
      </select>

      <label>Date</label>
      <input
        value={createdAt}
        type="date"
        id="date-picker"
        onChange={(e) => setCreatedAt(e.target.value)}
      ></input>

      <label>Product</label>
      <select value={productId} onChange={(e) => setProductId(e.target.value)}>
        <option value="">All</option>
        {productsIds.map((data) => {
          return (
            <option key={data.id} value={data.id}>
              {data.name}
            </option>
          );
        })}
      </select>

      <label>Price</label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      ></input>

      <button onClick={handleSearch}>Search</button>
      <button onClick={handleClear}>Clear</button>

      <ul>
        {/* {console.log(purchases.purchases)} */}
        {purchases.purchases.map((purchase) => {
          return (
            <li key={purchase._id}>
              <p>{purchase.order._id}</p>
              <Link to={`/costumer/${purchase.user}`}>
                see the user details
              </Link>
              <br />
              <Link to={`/purchased/${purchase.order._id}`}>
                see the order detail
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Purchased;

export const loader = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`${apiUrl}/purchase/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const usersIds = await getUsersIds();
    const productsIds = await getProductsIds();

    // console.log(usersIds);
    return { response, usersIds, productsIds };
  } catch (error) {
    console.log(error);
  }

  return null;
};
