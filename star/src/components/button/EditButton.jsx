import React from 'react';

const EditButton = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className="bg-DarkBlue w-fit text-white font-normal text-sm px-3 rounded focus:outline-none focus:shadow-outline"
    >
      {label}
    </button>
  );
};

export default EditButton;
