import car from "../car.png";
import "./style.css";
import "./queries.css";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="container" style={{ width: "90%", margin: "0 auto" }}>
        <NavBar />
        <header className="header">
          <div className="text">
            <h1 style={{ fontWeight: "600" }}>car dealing experience</h1>
            <h2>
              redefined<span>!</span>
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
              dicta quo recusandae iure Nulla, perspiciatis. Nulla,
              perspiciatis.
            </p>
            <Link to={"/cars"}>
              <div className="btn">
                <a href="#cars">explore cars</a>
              </div>
            </Link>
          </div>
          <img className="image" src={car} alt="" />
        </header>
      </div>
    </div>
  );
};
export default LandingPage;
