const PriceRangeFilter = ({
  rangeValue,
  priceRangeRef,
  onRangeChange,
  onReset,
}) => {
  return (
    <div className="priceRange">
      <div className="priceRangeHeader">
        <div>
          <p>Slide to set your top budget</p>
        </div>
        <span className="priceValue">${rangeValue.toLocaleString()}</span>
      </div>

      <div className="priceRangeBody">
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
        <div className="priceRangeActions">
          <button className="resetRangeBtn" onClick={onReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
