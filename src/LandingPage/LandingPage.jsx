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
              Experience car shopping reimagined. Browse premium vehicles,
              compare features, secure flexible loan options, and make confident
              decisions with a platform built for modern drivers.
            </p>
            <Link to={"/cars"}>
              <div className="btn">
                <div href="#cars">explore cars</div>
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
