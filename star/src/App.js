// App.js
import React from 'react';
import AccountManagerPage from './pages/AccountManagerPage.jsx';
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
      <div>
        <BrowserRouter>
	        <Routes>
            <Route path = "/manage-account" element = {<AccountManagerPage/>} />
 	      </Routes>
        </BrowserRouter>
        </div>
  );
};

export default App;
