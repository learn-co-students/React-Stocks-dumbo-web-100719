import React from 'react';

const SearchBar = (props) => {
  // console.log(props.sortTerm)
  return (
    <div>

      <strong>Sort by:</strong>
      <label>
        <input type="radio" 
          value="Alphabetically" 
          onChange={(evt) => props.setSortTerm(evt.target.value)}
          checked={props.sortTerm === "Alphabetically"} 
        />
        Alphabetically
      </label>
      <label>
        <input type="radio" 
          value="Price" 
          onChange={(evt) => props.setSortTerm(evt.target.value)}
          checked={props.sortTerm === "Price"} 
        />
        Price
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select onChange={(evt) => props.setFilter(evt.target.value)} value={props.filter}>
          <option value="">All</option>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>


    </div>
  );
}


export default SearchBar;
