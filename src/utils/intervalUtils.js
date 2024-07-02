import axios from "axios";
import { saveDataToIndexedDB } from "./upsindexedDB";
// import { saveDataToIndexedDB } from "./dhlindexedDB";
// import { saveDataToIndexedDB } from "./aramexindexedDB";
import urls from "./urls";

export const startDataRefreshInterval = (setData, setLoading, setError, vendorName) => {
  const fetchDataAndSaveToIndexedDB = async () => {
    try {
      if(vendorName == "UPS"){
      const response = await axios.get(urls.upsURL);
      setData(response.data);
      setLoading(false);
      // Save fetched data to IndexedDB
      await saveDataToIndexedDB(response.data);
    }
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  // Initial fetch and save to IndexedDB
  fetchDataAndSaveToIndexedDB();

  // Start interval to refresh every 1 seconds
  const intervalId = setInterval(fetchDataAndSaveToIndexedDB, 10000);
  // Return cleanup function
  return () => clearInterval(intervalId);
};