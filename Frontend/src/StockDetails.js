
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as styles from './styles';


function StockDetails() {
  const [numStocks, setNumStocks] = useState(0);
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/stocks?limit=${numStocks}`);

        setStocks(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const interval = setInterval(fetchStockData, 1000); // Fetch data every second

    return () => clearInterval(interval); 
  }, [numStocks]);

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setNumStocks(value > 0 && value <= 20 ? value : 0);
  };

  return (
    <div style={styles.stockListContainerStyle}>
      <div style={styles.inputContainerStyle}>
        <h1 style={styles.headingStyle}>Live Stock Values</h1>
        <label style={styles.labelStyle}>
          Enter the number of stocks (not more than 20):
          <input type="number" value={numStocks} onChange={handleInputChange} style={styles.inputStyle} />
        </label>
      </div>

      <div style={styles.stockListStyle}>
        <ul style={{ padding: 0 }}>
          {stocks.slice(0, numStocks).map(stock => (
            <li key={stock.symbol} style={styles.listItemStyle}>
              <strong>{stock.symbol}</strong>: ${stock.openPrice.toFixed(2)} (Last Updated: {new Date(stock.lastUpdated).toLocaleTimeString()})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StockDetails;
