// SubmitButton.js
import React from 'react';

const SubmitButton = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className="relative h-8 bg-brand-blue w-24 hover:bg-brand-blue-0 text-white font-bold px-3 rounded focus:outline-none focus:shadow-outline"
    >
      {label}
    </button>
  );
};

export default SubmitButton;
