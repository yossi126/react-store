import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  json,
  redirect,
} from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../env";

const ProductForm = ({ product }) => {
  return (
    <div>
      <h3>product form</h3>
      <Form method="PATCH">
        <div>
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" defaultValue={product.name} />
        </div>
        <div>
          <label htmlFor="price">Price: </label>
          <input type="number" name="price" defaultValue={product.price} />
        </div>
        <div>
          <label htmlFor="description">Description: </label>
          <textarea
            name="description"
            rows={4}
            defaultValue={product.description}
          />
        </div>
        <div>
          <label htmlFor="brand">Brand: </label>
          <input type="text" name="brand" defaultValue={product.brand} />
        </div>
        <div>
          <button>Save</button>
        </div>
      </Form>
    </div>
  );
};

export default ProductForm;

export const action = async ({ params, request }) => {
  const method = request.method;
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  //console.log(method);
  //console.log(data);
  //console.log(params.productId);

  const res = await updateProduct(params.productId, data);
  return res;
};

const updateProduct = async (productId, data) => {
  const response = await axios.patch(`${apiUrl}/products/${productId}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (response.status === 200) {
    alert("Product updated successfully");
    return redirect("/products");
  } else if (response.status === 401 || response.status === 404) {
    alert("product didn't updated");
    return redirect("/products");
  }
  return response;
};
