// SubmitButton.js
import React from 'react';

const SubmitButton = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className="relative transition-all duration-200 border-2 border-DarkBlue h-8 bg-white w-24 hover:bg-DarkBlue hover:text-white text-DarkBlue font-bold px-3 rounded focus:outline-none focus:shadow-outline"
    >
      {label}
    </button>
  );
};

export default SubmitButton;
