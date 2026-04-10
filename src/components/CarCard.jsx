import { styles } from "./carsStyles";

const CarCard = ({ carData, onCompare, onLoanCalc }) => {
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
              {/* compare button  */}
              <button
                className="compareBtn"
                style={{
                  backgroundColor: carData.checked ? "red" : "#0048e0",
                }}
                onClick={() => onCompare(carData.id)}
              >
                {carData.checked ? "Remove" : "Compare"}
              </button>
              {/* loan button  */}
              <button
                className="loanBtn"
                onClick={() => onLoanCalc(carData.id)}
              >
                Loan Calculator
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
