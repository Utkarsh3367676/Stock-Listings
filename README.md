
# Stock Listings

Frontend:
Technology Used: React

Description:
The frontend of the "Stock Listings" project is built using React, a popular JavaScript library for building user interfaces. The primary component, StockDetails, is responsible for displaying a list of stocks with live price updates.

User Input:

The user is prompted to input the number of stocks they want to display (not exceeding 20).
An input field allows the user to enter the desired number of stocks.

Stock List Display:

The StockDetails component fetches stock data from the backend using short polling.
The fetched stock data is displayed in a visually appealing format, showing the stock symbol, current price, and last update time.

Backend:
Technology Used: Node.js (Express)

Description:
The backend of the "Stock Listings" project is built using Node.js with the Express framework. It serves as an intermediary between the frontend and the Polygon API, handling stock data retrieval and storage.

Polygon API Integration:
API Used: Polygon

Description:
Polygon is a financial data provider that offers an API for accessing real-time and historical market data. In this project, the Polygon API is utilized to retrieve stock information, including symbols and open prices. The integration involves making requests to the Polygon API to gather initial stock data for display on the frontend.





