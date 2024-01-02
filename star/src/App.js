// App.js
import React from 'react';
import AccountManagerPage from './pages/AccountManagerPage.jsx';
import QuizScreen from './pages/QuizScreen';

import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
      <div>
        <BrowserRouter>
	        <Routes>
            <Route path = "/manage-account" element = {<AccountManagerPage/>} />
            <Route path="/quiz" element = {<QuizScreen />} />

 	      </Routes>
        </BrowserRouter>
        </div>
  );
};

export default App;
