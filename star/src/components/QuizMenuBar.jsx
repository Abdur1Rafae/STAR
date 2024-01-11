import React from 'react';
import { FaUserCog } from 'react-icons/fa';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import Timer from './Timer';

const QuizMenuBar = () => {
  return (
    <div className="menu-container w-screen lg:max-w-full h-14 bg-[#CAE0F9] flex items-center">
      <div className="menubar w-full flex justify-between">
        <div className="menuleft logo flex justify-start">
          <img src="./mindloom.png" className="w-10 ml-4 mr-2" alt="MindLoom Logo" />
          <div className="h-full flex flex-col">
            <div className="font-Jockey_One font-bold self-start mb-0">mindLoom</div>
            <div className="text-xs font-semibold">Assess.Enhance.Excel</div>
          </div>
        </div>
        <Timer initialTime={60 * 5} />
      </div>
    </div>
  );
};

export default QuizMenuBar;
