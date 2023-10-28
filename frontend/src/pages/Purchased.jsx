import React from "react";
import axios from "axios";
import { apiUrl } from "../env";
import { Link, useLoaderData } from "react-router-dom";

const Purchased = () => {
  const { data } = useLoaderData();

  return (
    <>
      <ul>
        {data.purchases.map((purchase) => {
          return (
            <li key={purchase._id}>
              <p>{purchase.order}</p>
              <Link to={`/costumer/${purchase.user}`}>
                see the user details
              </Link>
              <br />
              <Link to={`/purchased/${purchase.order}`}>
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

    return response;
  } catch (error) {
    console.log(error);
  }

  return null;
};
