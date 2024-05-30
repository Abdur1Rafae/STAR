import React, { useState } from 'react';

const LoadingButton = ({ onClick, label, icon, active }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await onClick();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading || !active}
      className={`font-body font-medium flex items-center gap-2 active:shadow-lg h-8 ${active ? 'bg-DarkBlue text-white' : 'bg-gray-200 text-black'} px-3 rounded focus:outline-none focus:shadow-outline ${isLoading ? 'cursor-not-allowed' : ''}`}
    >
      {isLoading ? (
        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
        </svg>
      ) : (
        icon
      )}
      {label}
    </button>
  );
};

export default LoadingButton;
