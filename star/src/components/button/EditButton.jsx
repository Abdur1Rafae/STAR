import React from 'react';

const EditButton = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className="h-6 bg-DarkBlue min-w-16 text-white font-normal text-xs rounded focus:outline-none focus:shadow-outline"
    >
      {label}
    </button>
  );
};

export default EditButton;
