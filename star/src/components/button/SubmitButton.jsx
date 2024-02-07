import React from 'react';

const SubmitButton = ({ onClick, label , icon, active }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center pl-2 gap-2 relative h-8 ${active ? 'bg-DarkBlue text-white' : 'text-black font-medium' } w-fit font-bold px-3 rounded focus:outline-none focus:shadow-outline`}
    >
      {icon}
      {label}
    </button>
  );
};

export default SubmitButton;
