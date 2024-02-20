import React from 'react';
import './App.css';
import WebRoutes from './Routes.js';
import Demo from './pages/demo.jsx';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
      <BrowserRouter>
        <WebRoutes/>
      </BrowserRouter>
  );
};

export default App;
