import { useContext, useState } from "react";
import { theCars } from "./CarsContext";
// import NavBar from "../LandingPage/NavBar";
import { styles } from "./carsStyles";
import { Link } from "react-router-dom";

import "./cars.css";

const Cars = () => {
  const list = useContext(theCars);

  const [carsList, setCarsList] = useState(list);
  const [searchVal, setSearchVal] = useState("");
  const [searchBtnColor, setSearchBtnColor] = useState("gray");

  const carCard = carsList.map((carData) => {
    const btnStyle = {
      backgroundColor: "#0048e0",
      color: "#fff",
      border: "none",
      padding: "3px 8px",
      borderRadius: "2px",
      marginRight: "12px",
      cursor: "pointer",
    };
    return (
      <div className="car-card" key={carData.id}>
        <div style={styles.container}>
          <div style={styles.card}>
            <div style={styles.imageContainer}>
              <img
                src={carData.image_url}
                alt={`${carData.brand} ${carData.model}`}
                style={styles.image}
              />
              <div style={styles.badge}>{carData.fuel}</div>
            </div>

            <div style={styles.content}>
              <div style={styles.header}>
                <h1 style={styles.title}>
                  {carData.brand} {carData.model}
                </h1>
                <p style={styles.year}>{carData.year} Model</p>
              </div>

              <div style={styles.price}>
                <span style={styles.currency}>AED</span>{" "}
                {carData.price.toLocaleString()}
              </div>

              <div style={styles.specsGrid}>
                <div style={styles.specItem}>
                  <span style={styles.icon}>🎨</span>
                  <div style={styles.specDetails}>
                    <span style={styles.label}>Color</span>
                    <span style={styles.value}>{carData.color}</span>
                  </div>
                </div>

                <div style={styles.specItem}>
                  <span style={styles.icon}>⚙️</span>
                  <div style={styles.specDetails}>
                    <span style={styles.label}>Transmission</span>
                    <span style={styles.value}>{carData.transmission}</span>
                  </div>
                </div>

                <div style={styles.specItem}>
                  <span style={styles.icon}>⛽</span>
                  <div style={styles.specDetails}>
                    <span style={styles.label}>Fuel Type</span>
                    <span style={styles.value}>{carData.fuel}</span>
                  </div>
                </div>

                <div style={styles.specItem}>
                  <span style={styles.icon}>📍</span>
                  <div style={styles.specDetails}>
                    <span style={styles.label}>Mileage</span>
                    <span style={styles.value}>
                      {carData.mileage.toLocaleString()} km
                    </span>
                  </div>
                </div>

                <div style={{ textAlign: "start", display: "flex" }}>
                  <button style={btnStyle}>Loan Calculator</button>
                  <button style={btnStyle}>Compare</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  const searchBtnStyle = {
    padding: "5px 8px",
    backgroundColor: searchBtnColor,
    color: "#fff",
    border: "none",
    position: "absolute",
    top: "2px",
    right: "0px",
    cursor: "pointer",
  };

  return (
    <div style={{ padding: "50px 0" }}>
      <div
        className="searchBar"
        style={{
          position: "relative",
          margin: "auto",
          display: "flex",
        }}
      >
        <Link to={"/"}>
          <button
            className="backHome"
            style={{ width: "120px", marginRight: "10px", padding: "5px" }}
          >
            Back Home
          </button>
        </Link>
        <input
          style={{ width: "100%", padding: "3px 8px", outline: "none" }}
          value={searchVal}
          placeholder="Search By brand"
          onChange={(e) => {
            setSearchVal(e.target.value);
            if (e.target.value === "") {
              setCarsList(list);
            }
            if (e.target.value !== "") {
              setSearchBtnColor("#0048e0");
            } else {
              setSearchBtnColor("gray");
            }
          }}
        />
        <button
          style={searchBtnStyle}
          onClick={() => {
            const results = carsList.filter((car) => {
              return car.brand.includes(searchVal);
            });

            setCarsList(results);
          }}
        >
          Search
        </button>
      </div>

      <div style={styles.carsCard}>{carCard}</div>
    </div>
  );
};
export default Cars;
