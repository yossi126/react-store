import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import {
  removeItem,
  increase,
  decrease,
  load,
  setIsLoading,
} from "../features/cartSilce";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { apiUrl } from "../env";

const Root = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.cart);

  const fetchData = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    //console.log(data.products);
    dispatch(load(data.products));
  };

  const fetchData2 = async () => {
    dispatch(setIsLoading(true));
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1MzQyZDNhMDZkZjE0NzE3MjdkZjgwMiIsIm5hbWUiOiJ5b3NzaSIsImVtYWlsIjoieW9zc2kxMjZAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJjaXR5IjoibG9kIiwicm9sZSI6ImFkbWluIiwiX192IjowfSwiaWF0IjoxNjk3OTE5MjAyLCJleHAiOjE2OTgwMDU2MDJ9.2TvWWc9qfTZgNIbmVGyGfcHF-p8SmaziE9PAOOJK9tQ";
    try {
      const response = await fetch(`${apiUrl}/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        dispatch(setIsLoading(false));
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      dispatch(load(data));
      dispatch(setIsLoading(false));
    } catch (error) {
      dispatch(setIsLoading(false));
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData2();
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Root;

// export const loader = async ({ request, params }) => {
//   // const response = await fetch("https://dummyjson.com/products");
//   // console.log(request);
//   return null;
// };
