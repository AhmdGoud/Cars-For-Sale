import { Link } from "react-router-dom";
import "../../styles/landingPage.css";
import "../../styles/landingPageQueries.css";

const NavBar = ({ className = "" }) => {
  return (
    <nav className={className}>
      <Link to="/">
        <div className="logo">cars.</div>
      </Link>
      <div className="social">
        <ul>
          <li>
            <a href="#twitter">
              <ion-icon name="logo-twitter"></ion-icon>
            </a>
          </li>
          <li>
            <a href="#facebook">
              <ion-icon name="logo-facebook"></ion-icon>
            </a>
          </li>
          <li>
            <a href="#instagram">
              <ion-icon name="logo-instagram"></ion-icon>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
