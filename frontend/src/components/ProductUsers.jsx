import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../env";

const ProductUsers = () => {
  const { productId } = useParams();
  const [productUsers, setProductUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProductUsers = async (productId) => {
    setIsLoading(true);
    const response = await axios.get(`${apiUrl}/products/${productId}/users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const { data } = response;

    setProductUsers(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getProductUsers(productId);
  }, []);

  let content =
    productUsers.length > 0 ? (
      <ul>
        {productUsers.map((user) => (
          <li key={user._id}>{user.name}</li>
        ))}
      </ul>
    ) : (
      <h3>no users</h3>
    );

  return (
    <div>
      <h3>ProductUsers component</h3>

      {isLoading ? <h4>Loading users...</h4> : content}
    </div>
  );
};

export default ProductUsers;

export const loader = async ({ request, params }) => {};
