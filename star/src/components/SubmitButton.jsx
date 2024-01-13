// SubmitButton.js
import React from 'react';

const SubmitButton = ({ onClick, children , label }) => {
  return (
    <button
      onClick={onClick}
      className="w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline"
      style={{
        height: '40px',
        borderRadius: '8px',
        background: '#274C77',
        position: 'relative',
        // Add other styles as needed
      }}
    >
      {label}
    </button>
  );
};

export default SubmitButton;
