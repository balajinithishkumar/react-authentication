import { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/vendor.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../Components/Sidebar";
import urls from "../utils/urls";

const Dhl = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const response = await axios.get(urls.dhlURL);
        setData(response.data);
        setFilteredData(response.data);
        setColumns(Object.keys(response.data[0])); // Extract column names dynamically
        setLoading(false);
        console.log(response.data);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchDataFromAPI();
  }, []);

  useEffect(() => {
    const results = data.filter((row) =>
      row[columns[0]]?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
  }, [searchTerm, data, columns]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = () => {
    if (columns.length === 0) return;
    const sortedData = [...filteredData].sort((a, b) => {
      return a[columns[0]].localeCompare(b[columns[0]]);
    });
    setFilteredData(sortedData);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;

  return (
    <div className="vendor_container">
      <div>
        <Sidebar />
      </div>
    
      <div className="vendor_table">
        <input
          type="text"
          placeholder={`Search by ${columns[0]}`}
          value={searchTerm}
          onChange={handleSearch}
        />
        <button onClick={handleSort}>Sort by {columns[0]}</button>
        <table>
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index}>
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>{row[col]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dhl;
