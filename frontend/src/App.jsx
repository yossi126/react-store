import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Products from "./pages/Products";
import ProductForm from "./components/ProductForm";
import Costumer from "./pages/Costumer";
import Purchased from "./pages/Purchased";
import EditCostumerForm from "./components/EditCostumerForm";
import Auth from "./pages/Auth";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // errorElement: <Error />,
    // loader: rootLoader,
    children: [
      { index: true, element: <Auth /> },
      { path: "home", element: <Home /> },
      { path: "cart", element: <Cart /> },
      { path: "products", element: <Products /> },
      { path: "products/:productId", element: <ProductForm /> },
      { path: "costumer", element: <Costumer /> },
      { path: "costumer/:costumerId", element: <EditCostumerForm /> },
      { path: "purchased", element: <Purchased /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
