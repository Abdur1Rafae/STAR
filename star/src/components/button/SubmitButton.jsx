import React from 'react';

const SubmitButton = ({ onClick, label , icon }) => {
  return (
    <button
      onClick={onClick}
      className=" flex items-center pl-2 relative h-8 bg-DarkBlue w-fit text-white font-bold px-3 rounded focus:outline-none focus:shadow-outline"
    >
      {icon}
      {label}
    </button>
  );
};

export default SubmitButton;
