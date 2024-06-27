import { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/vendor.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../Components/Sidebar";
import { fetchDataFromAPI } from "../Endpoints/fetchSheetsData";
import urls from "../utils/urls";
const Ara = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDataFromAPI(setData, setFilteredData, setLoading, setError,urls.aramexURL);
  }, []);

  useEffect(() => {
    const results = data.filter((row) =>
      row["Destination"].toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
  }, [searchTerm, data]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      return a["Destination"].localeCompare(b["Destination"]);
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
      <div>
        <input
          type="text"
          placeholder="Search by country"
          value={searchTerm}
          onChange={handleSearch}
        />
        <table>
          <thead>
            <tr>
              <th>Destination</th>
              <th>Express Plus</th>
              <th>Express</th>
              <th>Express Saver</th>
              <th>Expedited</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index}>
                <td>{row["Destination"]}</td>
                <td>{row["Express Plus"]}</td>
                <td>{row["Express"]}</td>
                <td>{row["Express Saver"]}</td>
                <td>{row["Expedited"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ara;