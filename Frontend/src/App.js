
import React from 'react';
import StockDetails from './StockDetails';

const appStyle = {
  backgroundColor: '#EAE7DD', 
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const App = () => {
  return (
    <div style={appStyle}>
      <StockDetails />
    </div>
  );
};

export default App;
