import React, { useState, useEffect } from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { TbClockOff } from "react-icons/tb";

const Timer = ({ initialTime }) => {
  const [remainingTime, setRemainingTime] = useState(initialTime);
  const [showTime, setShowTime] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        const newTime = prevTime - 1;
        return newTime >= 0 ? newTime : 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  let handleToggleTime = () => {
    setShowTime(!showTime)
  }


  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;

  const formattedTime = {
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0'),
  };

  return (
    <div className="h-10 timer-container flex items-center ml-4 mr-4">
      <div className="w-36 timer-box p-2 rounded-md"> 
        <button className='h-full flex items-center' onClick={handleToggleTime}>
          <p className="timer-text text-black font-bold flex justify-center">
            {showTime ? <span className='mr-1 text-DarkBlue'><TbClockOff size={24} /></span> : <span className='mr-1 text-DarkBlue'><AiOutlineClockCircle size={24} /></span> }
            {
              <div className={`text-sm sm:text flex items-center font-semibold transition-opacity duration-500 ease-out ${showTime ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                {formattedTime.hours} : {formattedTime.minutes} : {formattedTime.seconds}
              </div>
            }
            
          </p>
        </button>
      
      </div>
    </div>
  );
};

export default Timer;
