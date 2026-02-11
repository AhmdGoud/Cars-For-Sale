import "./style.css";
import "./queries.css";

const NavBar = () => {
  return (
    <nav>
      <div className="logo">cars.</div>
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
