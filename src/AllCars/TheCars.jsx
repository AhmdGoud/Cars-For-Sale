import { useContext, useState } from "react";
import { theCars } from "./CarsContext";
// import NavBar from "../LandingPage/NavBar";
import { styles } from "./carsStyles";

const Cars = () => {
  const list = useContext(theCars);

  const [carsList, setCarsList] = useState(list);
  const [filtered, setFiltered] = useState("");
  const [searchVal, setSearchVal] = useState("");

  const carCard = carsList.map((carData) => {
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <input
        style={{ width: "50%" }}
        value={searchVal}
        onChange={(e) => {
          setSearchVal(e.target.value);
        }}
      />
      <button
        onClick={() => {
          const results = carsList.filter((ele) => {
            return ele.brand.includes(searchVal);
          });
          setFiltered(results);

          setCarsList(filtered);
        }}
      >
        Search
      </button>
      <div style={styles.carsCard}>{carCard}</div>
    </>
  );
};
export default Cars;
