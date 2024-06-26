import { useEffect, useState } from 'react';
import axios from 'axios';
import { openDB } from 'idb';
import '../Styles/Datafetched.css';

const DB_NAME = 'DataDB';
const STORE_NAME = 'DataStore';

function DataFetching() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDataFromAPI = async () => {
    try {
      const response = await axios.get(
        'https://sheet.best/api/sheets/bd4a591e-9060-4683-8a2b-99a27305b6b1'
      );
      setData(response.data);
      await saveDataToIndexedDB(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const saveDataToIndexedDB = async (data) => {
    const db = await openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'Address_Line_1' });
        }
      },
    });

    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    data.forEach((item) => store.put(item));
    await tx.done;
    
  };

  const fetchDataFromIndexedDB = async () => {
    const db = await openDB(DB_NAME, 1);
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const allData = await store.getAll();
    setData(allData);
    setLoading(false);
  };

  useEffect(() => {
    const initializeData = async () => {
      const db = await openDB(DB_NAME, 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, { keyPath: 'Address_Line_1' });
          }
        },
      });
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const count = await store.count();
      if (count === 0) {
        fetchDataFromAPI();
      } else {
        fetchDataFromIndexedDB();
      }
    };
    initializeData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Owner Name</th>
            <th>Address Line 1</th>
            <th>Address Line 2</th>
            <th>PinCode</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
            <th>Username</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.Address_Line_1}>
              <td>{d.Owner_Name}</td>
              <td>{d.Address_Line_1}</td>
              <td>{d.Address_Line_2}</td>
              <td>{d.Pin_Code}</td>
              <td>{d.City}</td>
              <td>{d.State}</td>
              <td>{d.Country}</td>
              <td>{d.Username}</td>
              <td>{d.Start_Date}</td>
              <td>{d.End_Date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataFetching;