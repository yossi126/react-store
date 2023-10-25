import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import { useDispatch, useSelector } from "react-redux";

const Root = () => {
  const dispatch = useDispatch();

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
