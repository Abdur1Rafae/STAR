import React, { useState, useEffect } from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { TbClockOff } from "react-icons/tb";

const Timer = ({ initialTime }) => {
  const [remainingTime, setRemainingTime] = useState(initialTime);
  const [showTime, setShowTime] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (remainingTime === 0) {
      window.location.assign('/home');
    }
  }, [remainingTime]);

  const formatTime = time => time.toString().padStart(2, '0');

  const toggleTime = () => setShowTime(prevShowTime => !prevShowTime);

  const { hours, minutes, seconds } = {
    hours: formatTime(Math.floor(remainingTime / 3600)),
    minutes: formatTime(Math.floor((remainingTime % 3600) / 60)),
    seconds: formatTime(remainingTime % 60)
  };

  return (
    <div className="h-10 timer-container flex items-center ml-4 mr-4">
      <div className="w-36 timer-box p-2 rounded-md">
        <button className='h-full flex items-center' onClick={toggleTime}>
          <div className="timer-text text-black font-bold flex justify-center">
            {showTime ? <TbClockOff size={24} className='text-DarkBlue mr-1' /> : <AiOutlineClockCircle size={24} className='text-DarkBlue mr-1' />}
            <p className={`text-sm sm:text flex items-center font-semibold transition-opacity duration-500 ease-out ${showTime ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
              {`${hours} : ${minutes} : ${seconds}`}
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Timer;
