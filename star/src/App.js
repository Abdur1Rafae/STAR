import React from 'react';
import './App.css';
import AppRoutes from './AppRoutes.js';
import Demo from './pages/demo.jsx';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>
  );
};

export default App;
