import React from "react";
import axios from "axios";
import { apiUrl } from "../env";
import {
  useLoaderData,
  redirect,
  Form,
  useNavigate,
  Link,
} from "react-router-dom";

const CostumerForm = () => {
  const { user, purchases } = useLoaderData();
  const navigate = useNavigate();

  function cancelHandler() {
    navigate(-1);
  }

  return (
    <>
      <Form method="PATCH">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          defaultValue={user.user.name}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          defaultValue={user.user.email}
        />
        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          id="city"
          defaultValue={user.user.city}
        />
        <button>Update</button>
        <button>Delete </button>
        <button type="button" onClick={cancelHandler}>
          Cancel / Back
        </button>
      </Form>

      <div>
        <h3>Purchases history</h3>
        <ul>
          {purchases.purchases.map((purchase) => {
            return (
              <li key={purchase._id}>
                <p>purchase: {purchase._id}</p>
                <Link to={`/purchased/${purchase.order._id}`}>
                  see the order
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default CostumerForm;

export const loader = async ({ params }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  const costumerId = params.costumerId;

  if (userRole !== "admin") {
    alert("Only admin can access this page");

    return redirect("/costumer");
  }

  try {
    const allUsersResponse = await axios.get(`${apiUrl}/users/${costumerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const userPurchasesResponse = await axios.get(
      `${apiUrl}/purchase/users/?userId=${costumerId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    //console.log(userPurchasesResponse.data);

    return {
      user: allUsersResponse.data,
      purchases: userPurchasesResponse.data,
    };
  } catch (error) {}
  return null;
};

export const action = async ({ request, params }) => {
  const method = request.method;
  const token = localStorage.getItem("token");
  const userData = await request.formData();
  const data = Object.fromEntries(userData);

  try {
    const response = await axios({
      method: method,
      url: `${apiUrl}/users/${params.costumerId}`,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      alert("Costumer updated successfully");
      return redirect("/costumer");
    } else if (response.status === 401 || response.status === 404) {
      alert("Costumer didn't updated");
      return redirect("/costumer");
    }
  } catch (error) {
    console.log(error.message);
  }

  return null;
};
