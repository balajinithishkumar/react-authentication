import { useEffect } from 'react';
import axios from 'axios';
import { saveDataToIndexedDB } from '../utils/dhlindexedDB';
import urls from '../utils/urls';

const RefreshIndexedDBComponent = () => {

  useEffect(() => {
    const fetchDataAndUpdateDB = async () => {
      try {
        const response = await axios.get(urls.dhlURL);
        await saveDataToIndexedDB(response.data);
        console.log('Data refreshed in IndexedDB');
      } catch (error) {
        console.error('Error refreshing data:', error);
      }
    };
    
    // Fetch data initially and then every 20 seconds
    fetchDataAndUpdateDB();
    const intervalId = setInterval(fetchDataAndUpdateDB, 20000); // 20 seconds

    return () => clearInterval(intervalId) // Cleanup on unmount
  }, []);

  return null; 
};

export default RefreshIndexedDBComponent;