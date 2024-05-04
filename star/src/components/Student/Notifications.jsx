import React, { useState } from 'react';
import { FaToggleOff, FaToggleOn } from 'react-icons/fa';

const Notifications = () => {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);

  const toggleNotification = () => {
    setIsNotificationEnabled(!isNotificationEnabled);
  };

  return (
    <div>
      <div className='h-12 w-full border bg-blue-50 rounded-md shadow-md flex flex-row items-center justify-between px-4 mb-4'>
        <span className='text-lg font-semibold text-black'>
          Allow Email Notifications
        </span>
        <div
          className={`cursor-pointer w-8 h-8 rounded-full bg-white flex items-center justify-center`}
          onClick={toggleNotification}
        >
          {isNotificationEnabled ? (
            <FaToggleOn size={32} color='#2C6491' />
          ) : (
            <FaToggleOff size={32} color='black' />
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
