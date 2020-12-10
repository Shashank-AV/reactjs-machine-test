import React, { useState } from "react";
import "./App.css";
import data from "./search-list.json";

function App() {

  const [initialData, updateData] = useState(data);
  const [initialSearch, updateSearch] = useState("");

  const handleChange = (value) => {
    updateSearch(value);
    filterSearchResult(value);
  };

  const excludeColumns = [];

  // filter records by search text
  const filterSearchResult = (value) => {
    const lowercasedValue = value.toLowerCase().trim();
    if (lowercasedValue === "") updateData(data);
    else {
      const filteredData = data.filter((item) => {
        return Object.keys(item).some((key) =>
          excludeColumns.includes(key)
            ? false
            : item[key].toString().toLowerCase().includes(lowercasedValue)
        );
      });
      console.log(filteredData);
      updateData(filteredData);
    }
  };

  return (
    <div className="App">
      <div className="search">
        <input
          type="text"
          className="searchTerm"
          placeholder="what are you looking for?"
          value={initialSearch}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      <div className="box-container">
        {initialData.map((d, i) => {
          return (
            <table
              key={i}
              className="box"
            >
              <tr>
                <td>{d._id}</td>
              </tr>
              <tr>
                <td>{d.name}</td>{" "}
              </tr>
              <tr>
                <td>{d.gender}</td>
              </tr>
            </table>
          );
        })}
        {initialData.length === 0 && <b className="resultStatus">No Records To Display!!!!!</b>}
      </div>
    </div>
  );
}

export default App;
