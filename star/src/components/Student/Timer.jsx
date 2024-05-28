import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { TbClockOff } from 'react-icons/tb';
import QuizStore from '../../Stores/QuizStore';

const Timer = () => {
  const [showTime, setShowTime] = useState(true);
  const { submitResponses } = QuizStore();
  const quizDetails = JSON.parse(localStorage.getItem('quizDetails'));
  const durationInSeconds = quizDetails.duration * 60;
  const closingDateUTC = new Date(quizDetails.closeDate);
  const closingDateLocal = closingDateUTC.toLocaleString('en-US', { timeZone: 'Asia/Karachi' });
  const closingTime = new Date(closingDateLocal).getTime();
  const currentTime = Date.now();

  const initialRemainingTime = closingTime < (currentTime + durationInSeconds)
    ? Math.max(0, (closingTime - currentTime) / 1000)
    : durationInSeconds;

  const [remainingTime, setRemainingTime] = useState(initialRemainingTime);
  const lastTimestampRef = useRef(Date.now());

  const saveData = async () => {
    try {
      await submitResponses();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const tick = () => {
      setRemainingTime(prevTime => {
        const now = Date.now();
        const deltaTime = (now - lastTimestampRef.current) / 1000;
        lastTimestampRef.current = now;
        return Math.max(prevTime - deltaTime, 0);
      });
    };

    const timer = setInterval(tick, 1000);

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        lastTimestampRef.current = Date.now();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (remainingTime === 0) {
      localStorage.removeItem('SuccessSubmit');
      saveData();
      window.location.assign('quiz-submitted');
    }
  }, [remainingTime]);

  const formatTime = time => time.toString().padStart(2, '0');

  const toggleTime = () => setShowTime(prevShowTime => !prevShowTime);

  const hours = formatTime(Math.floor(remainingTime / 3600));
  const minutes = formatTime(Math.floor((remainingTime % 3600) / 60));
  const seconds = formatTime(Math.round(remainingTime % 60));

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
