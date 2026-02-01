import "./style.css";
import "./queries.css";

const NavBar = () => {
  return (
    <nav>
      <div className="logo">cars.</div>
      <div className="links">
        <ul>
          <li>
            <a href="#home">home</a>
          </li>
          <li>
            <a href="#loan">loan</a>
          </li>
          <li>
            <a href="#compare">compare</a>
          </li>
        </ul>
      </div>
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
        <div className="dropmenu-btn">
          <ion-icon name="menu-outline"></ion-icon>
          <ul className="dropmenu">
            <li>
              <a href="#home">home</a>
            </li>
            <li>
              <a href="#loan">loan</a>
            </li>
            <li>
              <a href="#compare">compare</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
