import { useContext, useMemo, useRef, useState } from "react";
import { theCars } from "./CarsContext";

import { styles } from "./carsStyles";
import { Link } from "react-router-dom";

import "./cars.css";

const Cars = () => {
  const priceRangeInput = useRef(null);
  const list = useContext(theCars);
  const [carsList, setCarsList] = useState(list);

  // search bar
  const [searchValue, setSearchValue] = useState("");
  const [rangeValue, setRangeValue] = useState(500000);
  const [searchBtnColor, setSearchBtnColor] = useState("gray");
  // compare card
  const [compareCardDisplay, setCompareCardDisplay] = useState(false);
  const [comparsionDisplay, setComparsionDisplay] = useState(false);
  const [numOfChoosedCars, setNumOfChoosedCars] = useState(0);
  const [choosedCars, setChoosedCars] = useState([]);
  // loan card
  const [loanCardDisplay, setLoanCardDisplay] = useState(false);
  const [carForLoan, setCarForLoan] = useState("");
  const [loanTerms, setLoanTerms] = useState(5);

  // handel search bar
  function handelSearch() {
    const carsMatchSearch = list.filter((car) => {
      return car.brand.toLowerCase().startsWith(searchValue);
    });
    carsMatchSearch.length
      ? setCarsList(carsMatchSearch)
      : alert("No Car Match Your Search");
  }

  // handel range input
  function handelRangeInput(e) {
    const value = Number(e.target.value);
    setRangeValue(value);
    const min = e.target.min;
    const max = e.target.max;

    const percent = ((value - min) / (max - min)) * 100;

    e.target.style.background = `
    linear-gradient(
      to right,
      #0048e0 0%,
      #0048e0 ${percent}%,
      #e5e7eb ${percent}%,
      #e5e7eb 100%
    )
  `;
  }
  // handel price range
  function handlePriceRange(e) {
    const value = Number(e.target.value);
    const carsInRange = list.filter((car) => {
      return car.price <= value;
    });
    setCarsList(carsInRange);
  }
  // reset price filter
  function resetPriceFilter() {
    setRangeValue(500000);
    setCarsList(list);

    priceRangeInput.current.style.background = `
    linear-gradient(
      to right,
      #0048e0 0%,
      #0048e0 100%
    )
  `;
  }

  // choose cars for compare
  function chooseCarToCompare(ID) {
    let numCars = numOfChoosedCars;

    const newList = carsList.map((car) => {
      if (car.id === ID) {
        numCars = car.checked ? numCars - 1 : numCars + 1;

        const carChoosed = {
          id: car.id,
          brand: car.brand,
          model: car.model,
          year: car.year,
          price: car.price,
          color: car.color,
          fuel: car.fuel,
        };

        if (choosedCars.length > 0) {
          if (choosedCars[0].id === ID) {
            setChoosedCars([]);
          } else {
            setChoosedCars((prev) => {
              return [...prev, carChoosed];
            });
          }
        } else {
          setChoosedCars((prev) => {
            return [...prev, carChoosed];
          });
        }

        return { ...car, checked: !car.checked };
      } else {
        return car;
      }
    });

    setCarsList(newList);
    setNumOfChoosedCars(numCars);
    setCompareCardDisplay(numCars >= 2);
  }

  // find car for loan calc
  const loanCalc = (ID) => {
    const carToCalcLoan = carsList.find((car) => {
      return car.id === ID;
    });
    setCarForLoan(carToCalcLoan);
  };

  // back to choose other cars to compare
  const backToChoose = () => {
    setCarsList(list);
    setChoosedCars([]);
    setNumOfChoosedCars(0);
    setCompareCardDisplay(false);
  };

  // mapping cars and return cards
  const carCard = useMemo(() => {
    return carsList.map((carData) => {
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
                      chooseCarToCompare(carData.id);
                    }}
                  >
                    {carData.checked ? "Remove" : "Compare"}
                  </button>
                  <button
                    className="loanBtn"
                    onClick={() => {
                      setLoanCardDisplay(true);
                      loanCalc(carData.id);
                    }}
                  >
                    Loan Calculator
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }, [carsList]);

  return (
    <div style={{ padding: "50px 0" }}>
      {/* search bar with back home btn  */}
      <div className="searchBar">
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
          value={searchValue}
          placeholder="Search By Name"
          onChange={(e) => {
            setSearchValue(e.target.value);
            if (e.target.value === "") {
              setCarsList(list);
              setSearchBtnColor("gray");
            } else {
              setSearchBtnColor("#0048e0");
            }
          }}
        />

        <button
          className="searchBtnStyle"
          style={{ backgroundColor: searchBtnColor }}
          onClick={() => handelSearch()}
        >
          Search
        </button>
      </div>

      {/* price range input  */}
      <div className="priceRange">
        <label>Price</label>
        <input
          ref={priceRangeInput}
          type="range"
          className="priceRangeInput"
          min="50000"
          max="500000"
          step="5000"
          value={rangeValue}
          onChange={(e) => {
            handelRangeInput(e);
            handlePriceRange(e);
          }}
        ></input>
        <span style={{ color: "#0048e0", fontWeight: "500" }}>
          {rangeValue}$
        </span>
        <button
          style={{ padding: "3px 8px", cursor: "pointer" }}
          onClick={() => {
            resetPriceFilter();
          }}
        >
          Reset
        </button>
      </div>

      {/* compare car card  */}
      <div
        className="compareCard"
        style={{ top: compareCardDisplay ? "0px" : "-100vh" }}
      >
        <div>
          <span>you have choosed 2 cars, can't add more</span>
          <div>
            <button className="reselectBnt" onClick={() => backToChoose()}>
              Reselect
            </button>
            <button
              className="confirmCompareBtn"
              onClick={() => {
                setComparsionDisplay(true);
              }}
            >
              Compare
            </button>
          </div>
          <button
            className="backBtn"
            style={{ fontSize: "22px", padding: "8px", cursor: "pointer" }}
            onClick={() => backToChoose()}
          >
            X
          </button>
        </div>

        <div
          className="comparsion"
          style={{ display: comparsionDisplay ? "flex" : "none" }}
        >
          <div
            style={{
              color: "#333",
              fontWeight: "500",
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
                    <p className="brandName">{car.brand}</p>
                    <p>{car.model}</p>
                    <p>{car.year}</p>
                    <p>{car.price} $</p>
                    <p>{car.color}</p>
                    <p>{car.fuel}</p>
                  </div>
                );
              })
            : null}
        </div>
      </div>

      {/* loan calc card  */}
      <div
        className="loanCard"
        style={{ top: loanCardDisplay ? "0px" : "-100vh" }}
      >
        <div className="loanInfo">
          <p>
            <span>Car Price:</span> {carForLoan.price}$
          </p>
          <p>
            <span>Interest Rate:</span> {loanTerms * 2}%
          </p>
          <p>
            <span>Down Payement:</span> {carForLoan.price * (5 / 100)}$
          </p>
          <div style={{ width: "100%", textAlign: "start" }}>
            <span>Loan Terms (years):</span>{" "}
            <button
              onClick={() => (loanTerms > 1 ? setLoanTerms(loanTerms - 1) : "")}
            >
              -
            </button>
            <span id="loan-terms">{loanTerms}</span>
            <button
              onClick={() => (loanTerms < 5 ? setLoanTerms(loanTerms + 1) : "")}
            >
              +
            </button>
          </div>
          <div className="monthlyPayment">
            <span>Monthly Payment: </span>
            {Math.ceil(
              (carForLoan.price -
                carForLoan.price * (5 / 100) +
                ((loanTerms * 2) / 100) * carForLoan.price) /
                (loanTerms * 12),
            )}
            $
          </div>
          <p>
            <span>Total Payments: </span>
            {Math.ceil(
              (carForLoan.price -
                carForLoan.price * (5 / 100) +
                ((loanTerms * 2) / 100) * carForLoan.price) /
                (loanTerms * 12),
            ) *
              (loanTerms * 12) +
              carForLoan.price * (5 / 100)}
            $
          </p>
        </div>
        <button className="backBtn" onClick={() => setLoanCardDisplay(false)}>
          X
        </button>
      </div>

      <div style={styles.carsCard}>{carCard}</div>
    </div>
  );
};
export default Cars;
