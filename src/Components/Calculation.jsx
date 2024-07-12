import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/Calculation.css';

const PriceCalculator = () => {
  const [data, setData] = useState([]);
  const [country, setCountry] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState(null);
  const [finalPrice, setFinalPrice] = useState(null);
  const [apiUrl, setApiUrl] = useState("https://sheet.best/api/sheets/bd4a591e-9060-4683-8a2b-99a27305b6b1");

  const apiUrls = [
    { label: "URL 1", value: "https://sheet.best/api/sheets/bd4a591e-9060-4683-8a2b-99a27305b6b1" },
    { label: "URL 2", value: "https://sheet.best/api/sheets/another-url" },
    // Add more URLs as needed
  ];

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [apiUrl]);

  const handleApiUrlChange = (e) => {
    setApiUrl(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const calculatePrice = () => {
    const selectedData = data.find(item => item.countryname === country);
    if (selectedData) {
      const basePrice = parseFloat(selectedData[weight]);
      const gst = basePrice * 0.18;
      const finalPrice = basePrice + gst;
      setPrice(basePrice);
      setFinalPrice(finalPrice);
    }
  };

  return (
    <div className="container"> 
      <h1>Price Calculator</h1>
      <div className="form">
        <label className="label">
          API URL:
          <select value={apiUrl} onChange={handleApiUrlChange}>
            {apiUrls.map(url => (
              <option key={url.value} value={url.value}>
                {url.label}
              </option>
            ))}
          </select>
        </label>
        <label className="label">
          Country:
          <select value={country} onChange={handleCountryChange}>
            <option value="">Select Country</option>
            {data.map(item => (
              <option key={item.countryname} value={item.countryname}>
                {item.countryname}
              </option>
            ))}
          </select>
        </label>
        <label className="label">
          Weight:
          <select value={weight} onChange={handleWeightChange}>
            <option value="">Select Weight</option>
            {data.length > 0 && Object.keys(data[0]).filter(key => key !== 'country').map(weightOption => (
              <option key={weightOption} value={weightOption}>
                {weightOption}
              </option>
            ))}
          </select>
        </label>
        <button onClick={calculatePrice} className="calculate-button">Calculate</button>
      </div>
      {finalPrice && (
        <div className="price-info">
          <p>Base Price: <strong>{price} Rs</strong></p>
          <p>GST (18%): <strong>{(price * 0.18).toFixed(2)} Rs</strong></p>
          <h2>Final Price: <strong>{finalPrice.toFixed(2)} Rs</strong></h2>
        </div>
      )}
    </div>
  );
};

export default PriceCalculator;
