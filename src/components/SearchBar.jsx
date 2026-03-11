import { Link } from "react-router-dom";

const SearchBar = ({
  searchValue,
  searchBtnColor,
  onSearchChange,
  onSearch,
}) => {
  return (
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
        onChange={onSearchChange}
      />

      <button
        className="searchBtnStyle"
        style={{ backgroundColor: searchBtnColor }}
        onClick={onSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
