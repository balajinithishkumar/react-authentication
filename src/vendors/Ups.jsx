import  { useEffect, useState } from 'react';
import axios from 'axios';
import "../Styles/Ups.css"
import 'bootstrap/dist/css/bootstrap.min.css';
const Ups = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const response = await axios.get(
          'https://sheet.best/api/sheets/0cd7742f-8919-45bf-983d-342cf41219a4'
        );
        setData(response.data);
        setFilteredData(response.data);
        setLoading(false);
        console.log(response.data)
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchDataFromAPI();
  }, []);

  useEffect(() => {
    const results = data.filter(row =>
      row['Destination'].toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
  }, [searchTerm, data]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      return a['Destination'].localeCompare(b['Destination']);
    });
    setFilteredData(sortedData);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;

  return (
    <div className='container '>
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
              <td>{row['Destination']}</td>
              <td>{row['Express Plus']}</td>
              <td>{row['Express']}</td>
              <td>{row['Express Saver']}</td>
              <td>{row['Expedited']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ups;
