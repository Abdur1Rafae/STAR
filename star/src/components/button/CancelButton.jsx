// SubmitButton.js
import React from 'react';

const CancelButton = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className="relative h-8 bg-transparent w-fit border border-black text-black font-bold px-3 rounded focus:outline-none focus:shadow-outline"
    >
      {label}
    </button>
  );
};

export default CancelButton;
