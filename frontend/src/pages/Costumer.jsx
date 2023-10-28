import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../env";

const Costumer = () => {
  const data = useLoaderData();

  return (
    <>
      <h3>Costumer page</h3>
      <ul>
        {data.users.map((user) => {
          return (
            <li key={user._id}>
              <Link to={`${user._id}`}>{user.name}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Costumer;

export const loader = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${apiUrl}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }

  return null;
};
