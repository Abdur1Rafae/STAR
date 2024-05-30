import React from 'react';

const ToggleButton = ({ isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`relative inline-flex items-center h-6 rounded-full min-w-11 transition-colors duration-300 ease-in-out focus:outline-none ${
                isActive ? 'bg-DarkBlue' : 'bg-gray-300'
            }`}
        >
            <span
                className={`transform transition-transform duration-300 ease-in-out inline-block w-4 h-4 rounded-full bg-white ${
                    isActive ? 'translate-x-6' : 'translate-x-1'
                }`}
            />
        </button>
    );
};

export default ToggleButton;
