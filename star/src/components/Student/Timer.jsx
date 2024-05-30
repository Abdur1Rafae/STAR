import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { TbClockOff } from 'react-icons/tb';
import QuizStore from '../../Stores/QuizStore';
import AdapQuizStore from '../../Stores/AdaptiveQuizStore';

const Timer = ({adaptive}) => {
  const [showTime, setShowTime] = useState(true);
  const { submitResponses, setSubmittingQuiz } = adaptive ? AdapQuizStore() : QuizStore();
  const quizDetails = JSON.parse(localStorage.getItem('quizDetails'));
  const durationInSeconds = quizDetails.duration * 60 * 1000;
  const closingDateUTC = new Date(quizDetails.closeDate);
  const closingDateLocal = closingDateUTC.toLocaleString('en-US', { timeZone: 'Asia/Karachi' });
  const closingTime = new Date(closingDateLocal).getTime();
  const currentTime = Date.now();

  const storedRemainingTime = localStorage.getItem('remainingTime');
  const initialRemainingTime = storedRemainingTime !== null 
    ? parseFloat(storedRemainingTime) 
    : (closingTime < (currentTime + durationInSeconds)
        ? Math.max(0, (closingTime - currentTime) / 1000)
        : durationInSeconds / 1000);


  const [remainingTime, setRemainingTime] = useState(initialRemainingTime);
  localStorage.removeItem('remainingTime')
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

    const handleBeforeUnload = () => {
      localStorage.setItem('remainingTime', remainingTime);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [remainingTime]);

  useEffect(() => {
    const handleRemainingTime = async () => {
      if (remainingTime === 0) {
        setSubmittingQuiz()
        await saveData();
        window.location.assign('quiz-submitted');
      }
    };
  
    handleRemainingTime();
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
