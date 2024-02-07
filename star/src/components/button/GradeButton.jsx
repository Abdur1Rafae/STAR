import React from 'react';

const GradeButton = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className="bg-DeleteRed w-fit text-white font-normal text-sm px-3 rounded focus:outline-none focus:shadow-outline"
    >
      {label}
    </button>
  );
};

export default GradeButton;
