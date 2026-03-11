const PriceRangeFilter = ({
  rangeValue,
  priceRangeRef,
  onRangeChange,
  onReset,
}) => {
  return (
    <div className="priceRange">
      <label>Price</label>
      <input
        ref={priceRangeRef}
        type="range"
        className="priceRangeInput"
        min="50000"
        max="500000"
        step="5000"
        value={rangeValue}
        onChange={onRangeChange}
      />
      <span style={{ color: "#0048e0", fontWeight: "500" }}>{rangeValue}$</span>
      <button
        style={{ padding: "3px 8px", cursor: "pointer" }}
        onClick={onReset}
      >
        Reset
      </button>
    </div>
  );
};

export default PriceRangeFilter;
