const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Allow requests from the specified origin
const allowedOrigins = [
  'https://stock-listings-frontend.vercel.app',
  // Add other origins if needed
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET"],
  credentials: true,
};

app.use(cors(corsOptions));

// Rest of your existing CORS middleware and route handling...

// Expose an API to fetch stock prices
app.get('/api/stocks', (req, res) => {
  try {
    const stocks = JSON.parse(fs.readFileSync(stocksFile, 'utf-8'));
    res.json(stocks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Run the initial setup to fetch stock list and start updating prices
fetchStockList();
updateStockPrices();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
