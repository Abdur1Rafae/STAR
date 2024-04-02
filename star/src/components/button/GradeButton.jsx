import React from 'react';

const GradeButton = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className="h-6 bg-DeleteRed min-w-16 active:shadow-md text-white font-normal text-xs rounded focus:outline-none focus:shadow-outline"
    >
      {label}
    </button>
  );
};

export default GradeButton;
