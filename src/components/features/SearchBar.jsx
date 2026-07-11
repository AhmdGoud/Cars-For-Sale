const SearchBar = ({
  searchValue,
  searchBtnColor,
  onSearchChange,
  onSearch,
}) => {
  return (
    <div className="searchBar">
      <div className="searchBarInner">
        <label className="searchInputWrapper">
          <input
            type="search"
            value={searchValue}
            placeholder="Search by car brand "
            onChange={onSearchChange}
          />
        </label>

        <button
          className="searchBtnStyle"
          style={{ backgroundColor: searchBtnColor }}
          onClick={onSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
