import { redirect } from "react-router-dom";

import { checkAuthLoader } from "../util/auth";
const Home = () => {
  return (
    <>
      <h3>home page</h3>
    </>
  );
};

export const loader = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return redirect("/auth");
  }

  return null;
};

export default Home;
