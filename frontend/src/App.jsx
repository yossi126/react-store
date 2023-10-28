import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Home, { loader as homeLoader } from "./pages/Home";
import Cart from "./pages/Cart";
import Products, { loader as productsLoader } from "./pages/Products";
import { action as productFormAction } from "./components/ProductForm";
import EditProduct, { loader as editProductLoader } from "./pages/EditProduct";
import Costumer, { loader as costumerLoader } from "./pages/Costumer";
import Purchased, { loader as purchaseLoader } from "./pages/Purchased";
import CostumerForm, {
  loader as costumerFormLoader,
  action as costumerFormAction,
} from "./components/CostumerForm";
import Auth, { action as authAction } from "./pages/Auth";
import { tokenLoader, checkAuthLoader } from "./util/auth";
import { action as logoutAction } from "./pages/Logout";
import ErrorPage from "./pages/ErrorPage";
import ProductsRootLayout from "./pages/ProductsRootLayout";
import ProductUsers from "./components/ProductUsers";
import OrderDetail, { loader as orderDetailLoader } from "./pages/OrderDetail";

//TODO: add LOADER to all pages
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <Home />, loader: homeLoader },
      { path: "auth", element: <Auth />, action: authAction },
      { path: "cart", element: <Cart /> },
      {
        path: "products",
        element: <ProductsRootLayout />,
        children: [
          { index: true, element: <Products />, loader: productsLoader },
          {
            path: ":productId",
            children: [
              {
                index: true,
                element: <EditProduct />,
                loader: editProductLoader,
                action: productFormAction,
              },
              { path: "users", element: <ProductUsers /> },
            ],
          },
        ],
      },
      // { path: "products", element: <Products />, loader: productsLoader },
      // {
      //   path: "products/:productId",
      //   element: <EditProduct />,
      //   loader: editProductLoader,
      //   action: productFormAction,
      // },
      // { path: "costumer", element: <Costumer /> },
      // { path: "costumer/:costumerId", element: <EditCostumerForm /> },
      {
        path: "costumer",
        loader: checkAuthLoader,
        children: [
          { index: true, element: <Costumer />, loader: costumerLoader },
          {
            path: ":costumerId",
            element: <CostumerForm />,
            loader: costumerFormLoader,
            action: costumerFormAction,
          },
        ],
      },
      {
        path: "purchased",
        loader: checkAuthLoader,
        children: [
          { index: true, element: <Purchased />, loader: purchaseLoader },
          {
            path: ":orderId",
            element: <OrderDetail />,
            loader: orderDetailLoader,
          },
        ],
      },
      // { path: "purchased", element: <Purchased /> },
      { path: "logout", action: logoutAction },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
