// SubmitButton.js
import React from 'react';

const SubmitButton = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className="relative h-8 bg-[#2C6491] w-24 hover:bg-blue-700 text-white font-bold px-3 rounded focus:outline-none focus:shadow-outline"
    >
      {label}
    </button>
  );
};

export default SubmitButton;
