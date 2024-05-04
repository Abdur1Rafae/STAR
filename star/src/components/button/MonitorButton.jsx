// SubmitButton.js
import React from 'react';

const MonitorButton = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className="h-6 bg-MonitorYellow min-w-16 active:shadow-lg text-white font-normal text-xs rounded focus:outline-none focus:shadow-outline"
    >
      {label}
    </button>
  );
};

export default MonitorButton;
