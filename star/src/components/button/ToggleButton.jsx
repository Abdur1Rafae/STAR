import React from 'react';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa';

const ToggleButton = ({isActive, onClick}) => {

  return (
    <button onClick={onClick} className="flex items-center justify-center p-2 ">
      {isActive ? <FaToggleOn size={28} className="text-DarkBlue" /> : <FaToggleOff size={28} className="text-gray-500" />}
    </button>
  );
};

export default ToggleButton;
