import React from 'react';

const SubmitButton = ({ onClick, label , icon, active }) => {
  return (
    <button
      onClick={active ? onClick : ()=>{}}
      className={`font-body font-medium flex items-center gap-2 active:shadow-lg h-8 ${active ? 'bg-DarkBlue text-white' : 'bg-gray-200 text-black' } px-3 rounded focus:outline-none focus:shadow-outline`}
    >
      {icon}
      {label}
    </button>
  );
};

export default SubmitButton;
