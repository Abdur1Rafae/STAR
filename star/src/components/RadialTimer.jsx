import React, { useState, useEffect } from "react";

const RadialTimer = ({ totalTime}) => {
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
    <div className={`relative flex items-center`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-sm font-medium"> 
          {Math.floor(remainingTime / 60)}:
          {String(remainingTime % 60).padStart(2, "0")}
        </div>
      </div>
      <svg className="animate-rotate-0" viewBox="0 0 36 36" width="100">
        <circle
            className="stroke-current text-gray-200"
            cx="18"
            cy="18"
            r="15" 
            fill="none"
            strokeWidth="2"
            strokeDasharray={`100`}
          
          />
        <circle
          className="stroke-current text-green-600"
          cx="18"
          cy="18"
          r="15" 
          fill="none"
          strokeWidth="2"
          strokeDasharray={`${percentRemaining}, 100`}
        
        />
      </svg>
    </div>
  );
};

export default RadialTimer;
