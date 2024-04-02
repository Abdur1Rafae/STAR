import React from 'react';

const SubmitButton = ({ onClick, label , icon, active }) => {
  return (
    <button
      onClick={onClick}
      className={`font-body font-medium flex items-center pl-2 gap-2 active:shadow-lg relative h-8 ${active ? 'bg-DarkBlue text-white' : 'bg-gray-200 text-black' } w-fit px-3 rounded focus:outline-none focus:shadow-outline`}
    >
      {icon}
      {label}
    </button>
  );
};

export default SubmitButton;
