import axios from "axios";
import { apiUrl } from "../env";

export const getUsersIds = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`${apiUrl}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data.users.map((user) => {
      return { id: user._id, name: user.name };
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductsIds = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`${apiUrl}/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data);
    const data = response.data.map((product) => {
      return { id: product._id, name: product.name };
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
