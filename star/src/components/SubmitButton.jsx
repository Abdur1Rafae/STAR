// SubmitButton.js
import React from 'react';

const SubmitButton = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline"
      style={{
        width: '180px',
        height: '45px',
        borderRadius: '8px',
        background: '#2C6491',
        position: 'relative',
      }}
    >
      {children}
    </button>
  );
};

export default SubmitButton;
