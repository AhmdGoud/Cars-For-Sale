import { useContext, useState } from "react";
import { theCars } from "./CarsContext";

import { styles } from "./carsStyles";
import { Link } from "react-router-dom";

import "./cars.css";

const Cars = () => {
  const list = useContext(theCars);

  const [carsList, setCarsList] = useState(list);
  const [searchVal, setSearchVal] = useState("");
  const [searchBtnColor, setSearchBtnColor] = useState("gray");

  const [compareCardDisplay, setCompareCardDisplay] = useState(false);
  const [comparsionDisplay, setComparsionDisplay] = useState(false);
  const [numOfChoosedCars, setNumOfChoosedCars] = useState(0);
  const [choosedCars, setChoosedCars] = useState([]);

  function chooseCar(ID) {
    let numCars = numOfChoosedCars;

    const newList = carsList.map((car) => {
      if (car.id === ID) {
        numCars = car.checked ? numCars - 1 : numCars + 1;

        setChoosedCars((prev) => {
          return [
            ...prev,
            {
              id: car.id,
              brand: car.brand,
              model: car.model,
              year: car.year,
              price: car.price,
              color: car.color,
              fuel: car.fuel,
            },
          ];
        });

        return { ...car, checked: !car.checked };
      } else {
        return car;
      }
    });

    setCarsList(newList);
    setNumOfChoosedCars(numCars);
    setCompareCardDisplay(numCars >= 2);
  }

  const carCard = carsList.map((carData) => {
    return (
      <div className="car-card" id={carData.id} key={carData.id}>
        <div style={styles.container}>
          <div
            style={{
              ...styles.card,
              border: carData.checked ? "2px solid blue" : "none",
            }}
          >
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
              </div>
              <div
                style={{
                  textAlign: "start",
                  display: "flex",
                  paddingBottom: "10px",
                }}
              >
                <button
                  className="compareBtn"
                  style={{
                    backgroundColor: carData.checked ? "red" : "#0048e0",
                  }}
                  onClick={() => {
                    chooseCar(carData.id);
                  }}
                >
                  {carData.checked ? "Remove" : "Compare"}
                </button>
                <button className="loanBtn">Loan Calculator</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  const backToChoose = () => {
    setCarsList(list);
    setChoosedCars([]);
    setNumOfChoosedCars(0);
    setComparsionDisplay(false);
    setCompareCardDisplay(false);
  };

  return (
    <div style={{ padding: "50px 0" }}>
      <div
        className="searchBar"
        style={{ position: "relative", margin: "auto", display: "flex" }}
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
          className="searchBtnStyle"
          style={{ backgroundColor: searchBtnColor }}
          onClick={() => {
            const results = carsList.filter((car) => {
              return car.brand.toLowerCase().includes(searchVal);
            });
            results.length
              ? setCarsList(results)
              : alert("No Car Match Your Search");
          }}
        >
          Search
        </button>
      </div>

      <div
        className="compareCard"
        style={{ display: compareCardDisplay ? "flex" : "none" }}
      >
        <div>
          <span>you have choosed 2 cars, can't add more</span>
          <button
            style={{
              padding: "8px 12px",
              fontSize: "22px",
              cursor: "pointer",
              margin: "0 8px",
            }}
            onClick={() => backToChoose()}
          >
            Reselect
          </button>
          <button
            style={{
              padding: "8px 12px",
              fontSize: "22px",
              cursor: "pointer",
              margin: "0 8px",
            }}
            onClick={() => {
              setComparsionDisplay(true);
            }}
          >
            Compare
          </button>
          {/* <button
            style={{ fontSize: "22px", padding: "8px", cursor: "pointer" }}
            onClick={() => backToChoose()}
          >
            X
          </button> */}
        </div>

        <div
          className="comparsion"
          style={{
            width: "100%",
            display: comparsionDisplay ? "flex" : "none",
            justifyContent: "space-around",
          }}
        >
          <div
            style={{
              color: "#333",
              borderRight: "1px solid #222",
              paddingRight: "10px",
            }}
          >
            <p>brand</p>
            <p>model</p>
            <p>year</p>
            <p>price</p>
            <p>color</p>
            <p>fuel</p>
          </div>
          {choosedCars.length
            ? choosedCars.map((car) => {
                return (
                  <div key={car.id} style={{ width: "100%" }}>
                    <p style={{ color: "#ad0606", fontSize: "37px" }}>
                      {car.brand}
                    </p>
                    <p>{car.model}</p>
                    <p>{car.year}</p>
                    <p>{car.price}</p>
                    <p>{car.color}</p>
                    <p>{car.fuel}</p>
                  </div>
                );
              })
            : ""}
        </div>
      </div>

      <div style={styles.carsCard}>{carCard}</div>
    </div>
  );
};
export default Cars;
