import { Outlet } from "react-router-dom";
import NavBar from "../LandingPage/NavBar";
import "../LandingPage/style.css";
import "../LandingPage/queries.css";

const TheOutlet = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default TheOutlet;
