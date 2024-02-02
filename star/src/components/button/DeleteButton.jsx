// SubmitButton.js
import React from 'react';

const DeleteButton = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className="relative h-8 bg-DeleteRed w-fit border border-black text-white font-bold px-3 rounded focus:outline-none focus:shadow-outline"
    >
      {label}
    </button>
  );
};

export default DeleteButton;
