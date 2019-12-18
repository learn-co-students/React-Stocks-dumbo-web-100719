import React from "react";

const SearchBar = props => {
  return (
    <div>
      <strong>Sort by:</strong>
      <label>
        <input
          type="radio"
          value="Alphabetically"
          checked={null}
          onChange={() => {
            props.handleAlphaSort();
          }}
        />
        Alphabetically
      </label>
      <label>
        <input
          type="radio"
          value="Price"
          checked={null}
          onChange={() => {
            props.handleNumSort();
          }}
        />
        Price
      </label>
      <br />

      <label>
        <strong>Filter:</strong>
        <select
          onChange={e => {
            props.handleFilter(e.target.value);
          }}
        >
          <option value="All">All</option>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>
    </div>
  );
};

export default SearchBar;
