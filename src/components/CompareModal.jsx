const CompareCard = ({
  isVisible,
  comparsionDisplay,
  choosedCars,
  onReselect,
  onCompare,
  onClose,
}) => {
  return (
    <div className="compareCard" style={{ top: isVisible ? "0px" : "-100vh" }}>
      <div>
        <span>you have choosed 2 cars, can't add more</span>
        <div>
          <button className="reselectBnt" onClick={onReselect}>
            Reselect
          </button>
          <button className="confirmCompareBtn" onClick={onCompare}>
            Compare
          </button>
        </div>
        <button
          className="backBtn"
          style={{ fontSize: "22px", padding: "8px", cursor: "pointer" }}
          onClick={onClose}
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
          ? choosedCars.map((car) => (
              <div key={car.id} style={{ width: "100%" }}>
                <p className="brandName">{car.brand}</p>
                <p>{car.model}</p>
                <p>{car.year}</p>
                <p>{car.price} $</p>
                <p>{car.color}</p>
                <p>{car.fuel}</p>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default CompareCard;
