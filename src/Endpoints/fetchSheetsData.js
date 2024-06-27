import axios from 'axios';

export const fetchDataFromAPI = async (setData, setFilteredData, setLoading, setError, URL) => {
  try {
    const response = await axios.get(
     URL
    );
    setData(response.data);
    setFilteredData(response.data);
    setLoading(false);
    console.log(response.data);
  } catch (err) {
    setError(err);
    setLoading(false);
  }
};
