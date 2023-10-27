import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Home, { loader as homeLoader } from "./pages/Home";
import Cart from "./pages/Cart";
import Products, { loader as productsLoader } from "./pages/Products";
import { action as productFormAction } from "./components/ProductForm";
import EditProduct, { loader as editProductLoader } from "./pages/EditProduct";
import Costumer from "./pages/Costumer";
import Purchased from "./pages/Purchased";
import EditCostumerForm from "./components/EditCostumerForm";
import Auth, { action as authAction } from "./pages/Auth";
import { tokenLoader } from "./util/auth";
import { action as logoutAction } from "./pages/Logout";
import ErrorPage from "./pages/ErrorPage";
import ProductsRootLayout from "./pages/ProductsRootLayout";
import ProductUsers from "./components/ProductUsers";

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
      { path: "costumer", element: <Costumer /> },
      { path: "costumer/:costumerId", element: <EditCostumerForm /> },
      { path: "purchased", element: <Purchased /> },
      { path: "logout", action: logoutAction },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
