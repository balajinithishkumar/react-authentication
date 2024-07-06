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
        localStorage.setItem('lastUpdateTime', new Date().toISOString());
      } catch (error) {
        console.error('Error refreshing data:', error);
      }
    };

    const checkAndUpdateDB = () => {
      const lastUpdateTime = localStorage.getItem('lastUpdateTime');
      const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
      
      if (!lastUpdateTime || (new Date().getTime() - new Date(lastUpdateTime).getTime()) > oneWeekInMilliseconds) {
        fetchDataAndUpdateDB();
      }
    };

    checkAndUpdateDB();
    
    const intervalId = setInterval(checkAndUpdateDB, 24 * 60 * 60 * 1000); // Check daily

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return null; 
};

export default RefreshIndexedDBComponent;