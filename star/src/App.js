import React, { StrictMode } from 'react';
import './App.css';
import AppRoutes from './AppRoutes.js';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    
      <BrowserRouter>
      <StrictMode>
        <AppRoutes/>
        </StrictMode>
      </BrowserRouter>
  );
};

export default App;
