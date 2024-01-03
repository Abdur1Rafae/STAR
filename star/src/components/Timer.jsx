// Timer.js
import React, { useState, useEffect } from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';

const Timer = ({ initialTime }) => {
  const [remainingTime, setRemainingTime] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        const newTime = prevTime - 1;
        return newTime >= 0 ? newTime : 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Convert remaining time to hours, minutes, and seconds
  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;

  // Format the time values to ensure they are displayed with leading zeros
  const formattedTime = {
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0'),
  };

  return (
    <div className="pl-4 h-32 timer-container flex items-center pt-6">
      <div className="w-36 timer-box bg-blue-100 p-2 rounded-md mr-2" style={{ backgroundColor: '#E7ECEF' }}> 
        
        <p className="timer-text text-black font-bold flex justify-between"> {
        formattedTime.hours} : {formattedTime.minutes} : {formattedTime.seconds} <span className='pl-2'><AiOutlineClockCircle size={24} /></span>
        </p>
      
      </div>
    </div>
  );
};

export default Timer;
