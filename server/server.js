const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(
  {
    origin: [https://stock-listings-frontend.vercel.app/],
    methods:["POST","GET"],
    credentials:true
  }
));


const polygonApiKey = 'QlOE7feVp6mhdVa4sovHtWyAhpB3BIAb';
const stocksFile = path.join(__dirname, 'stocks.json');

// Helper function to generate a random number between min and max (inclusive)
const getRandomInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min) * 1000;

// Function to fetch the list of 20 stocks and their open prices from Polygon API
const fetchStockList = async () => {
  try {
    if (!fs.existsSync(stocksFile)) {
      // Create an empty file if it doesn't exist
      console.log('File does not exist. Creating an empty file:', stocksFile);
      fs.writeFileSync(stocksFile, '[]');
    }

    const response = await axios.get(`https://api.polygon.io/v3/reference/tickers?sort=ticker&perpage=20&page=1&apiKey=${polygonApiKey}`);
    const stocks = response.data.results.map(stock => ({
      symbol: stock.ticker,
      openPrice: stock.open,
      refreshInterval: getRandomInterval(1, 5),
      lastUpdated: Date.now(),
    }));
    fs.writeFileSync(stocksFile, JSON.stringify(stocks, null, 2));
  } catch (error) {
    console.error(error);
  }
};

// Function to update stock prices at random intervals
const updateStockPrices = () => {
  setInterval(() => {
    try {
      const stocks = JSON.parse(fs.readFileSync(stocksFile, 'utf-8'));
      stocks.forEach(stock => {
        stock.lastUpdated = Date.now();
        stock.openPrice += (Math.random() * 10 - 5); // Random price update
      });
      fs.writeFileSync(stocksFile, JSON.stringify(stocks, null, 2));
    } catch (error) {
      console.error(error);
    }
  }, 1000); // Run every second
};

// Expose an API to fetch stock prices
app.get('/api/stocks', (req, res) => {
  try {
    const stocks = JSON.parse(fs.readFileSync(stocksFile, 'utf-8'));
    res.json(stocks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})



// Run the initial setup to fetch stock list and start updating prices
fetchStockList();
updateStockPrices();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})
