// CancelButton.js
import React from 'react';

const CancelButton = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="bg-transparent hover:bg-gray-300 text-black font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline"
      style={{
        width: '180px',
        height: '45px',
        borderRadius: '8px',
        border: '1px solid #000',
        position: 'relative',
        // Add other styles as needed
      }}
    >
      {children}
    </button>
  );
};

export default CancelButton;
