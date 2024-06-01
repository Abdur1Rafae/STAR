import React from 'react';
import logo from './LandingPages/logo-2.png'

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className='w-full'>
      <div className="menuleft logo flex justify-start bg-DarkBlue">
      <img loading="lazy" src={logo} className=' w-40'></img>
      </div>
      </div>
      <main className="flex flex-col items-center justify-center flex-grow">
        <div className="text-center">
          <h2 className="text-6xl font-bold text-gray-800">404</h2>
          <p className="text-xl text-gray-600 mt-4">Oops! The page you're looking for doesn't exist.</p>
          </div>
          </main>
      <footer className="w-full bg-gray-200 p-4 text-center text-gray-600">
        &copy; 2024 Arete. All rights reserved.
      </footer>
    </div>
  );
};

export default NotFoundPage;
