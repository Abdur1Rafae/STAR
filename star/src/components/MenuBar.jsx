import React, { useState } from 'react';
import { FaUserCog } from 'react-icons/fa';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { PiBellFill } from 'react-icons/pi';
import { MdKeyboardArrowDown } from 'react-icons/md';

const MenuBar = () => {
  let [profileDialog, setProfileDialog] = useState(false);

  let handleProfileClick = () => {
    setProfileDialog(!profileDialog);
  };

  return (
    <div className="w-full bg-[#2C6491] flex items-center">
      <div className="menubar w-full flex justify-between">
        <div className="leftContainer flex border-r-2 border-white w-full justify-between">
          <div className="menuleft logo flex justify-start">
            <img src="./mindloom.png" className="w-10 sm:ml-4 ml-2 mr-2" alt="MindLoom Logo" />
            <div className="h-full flex flex-col">
              <div className="font-sans font-[800] self-start mb-0 text-white">mindLoom</div>
              <div className="sm:text-xs text-[10px] font-[600] text-white">Assess.Enhance.Excel</div>
            </div>
          </div>
          <button className="mr-2 sm:mr-6 self-center text-white text-2xl">
            <PiBellFill />
          </button>
        </div>
        <div className="rightContainer flex">
          <button className="ml-2 sm:ml-6 sm:mr-4 text-white flex w-26 lg:w-60" onClick={handleProfileClick}>
            <div className="UserInfo w-full text-white whitespace-nowrap self-center flex flex-col">
              <h1 className="text-xs self-start font-bold">Maaz Shamim</h1>
              <h3 className="text-xs text-[#C5D86D] self-start font-semibold">Student</h3>
            </div>
            <MdKeyboardArrowDown className="text-3xl self-center" />
          </button>
        </div>
      </div>
      <div
        className={`dialogue absolute border-2 right-0 bg-[#F4F9FD] transition ease-out duration-500 ${
          profileDialog ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {profileDialog ? (
          <div
            className="h-20 dropdown-list w-36 lg:w-60 flex flex-col items-center justify-around"
            onClick={() => window.location.assign('/manage-account')}
          >
            <div className="h-8 w-full flex text-md">
              <FaUserCog className="self-center ml-4 text-lg" />
              <button className="ml-2">Profile</button>
            </div>

            <div
              className="h-8 w-full flex text-md"
              onClick={() => window.location.assign('/manage-account')}
            >
              <RiLogoutCircleRLine className="self-center ml-4 text-lg" />
              <button className="ml-2">Logout</button>
            </div>
          </div>
        ) : (
          <div className="h-0"></div>
        )}
      </div>
    </div>
  );
};

export default MenuBar;
