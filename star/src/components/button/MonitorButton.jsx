// SubmitButton.js
import React from 'react';

const MonitorButton = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className="bg-MonitorYellow w-fit text-white font-normal text-sm px-3 rounded focus:outline-none focus:shadow-outline"
    >
      {label}
    </button>
  );
};

export default MonitorButton;
