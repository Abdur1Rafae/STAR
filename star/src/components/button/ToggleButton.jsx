import React, { useState } from 'react';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa';

const ToggleButton = () => {
  const [isOn, setIsOn] = useState(false);

  const toggle = () => {
    setIsOn(prevState => !prevState);
  };

  return (
    <button onClick={toggle} className="flex items-center justify-center p-2 ">
      {isOn ? <FaToggleOn size={28} className="text-DarkBlue" /> : <FaToggleOff size={28} className="text-gray-500" />}
    </button>
  );
};

export default ToggleButton;
