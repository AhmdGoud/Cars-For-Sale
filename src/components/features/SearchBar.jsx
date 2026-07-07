import { Link } from "react-router-dom";

const SearchBar = ({
  searchValue,
  searchBtnColor,
  onSearchChange,
  onSearch,
}) => {
  return (
    <div className="searchBar">
      <Link to="/" className="backHome">
        Back Home
      </Link>

      <div className="searchBarInner">
        <label className="searchInputWrapper">
          <input
            type="search"
            value={searchValue}
            placeholder="Search by car make or model"
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
