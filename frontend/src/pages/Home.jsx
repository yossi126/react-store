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
  return checkAuthLoader();
};

export default Home;
