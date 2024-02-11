import React, { useState, useEffect } from "react";

const RadialTimer = ({ totalTime, className }) => {
  const [remainingTime, setRemainingTime] = useState(totalTime);
  const [percentRemaining, setPercentRemaining] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prev) => prev - 1);
      setPercentRemaining((remainingTime / totalTime) * 100);
    }, 1000);

    return () => clearInterval(interval);
  }, [totalTime, remainingTime]);

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-sm font-bold"> {/* Adjust font size here */}
          {Math.floor(remainingTime / 60)}:
          {String(remainingTime % 60).padStart(2, "0")}
        </div>
      </div>
      <svg className="animate-rotate-0" viewBox="0 0 36 36" width="100"> {/* Adjust width here */}
      <circle
          className="stroke-current text-gray-200"
          cx="18"
          cy="18"
          r="10" 
          fill="none"
          strokeWidth="2"
          strokeDasharray={`100`}
        
        ></circle>
        <circle
          className="stroke-current text-DarkBlue"
          cx="18"
          cy="18"
          r="10" 
          fill="none"
          strokeWidth="2"
          strokeDasharray={`${percentRemaining}, 100`}
        
        ></circle>
       
      </svg>
    </div>
  );
};

export default RadialTimer;
