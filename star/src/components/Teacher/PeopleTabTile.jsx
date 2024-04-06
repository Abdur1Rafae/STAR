import React, { useState , useContext } from 'react';
import LCSearchBar from './LCSearchBar';
import { CiFilter } from "react-icons/ci";

const PeopleTabTile = ({ singlepersoninfo, active , onClick}) => {
  // Determine the color based on the percentage
  const textColor = singlepersoninfo.percentage > 60 ? 'text-[#70FF71]' : 'text-[#FF6058]';

  return (
    <div className={`h-full ${active ? 'bg-DarkBlue text-white' : 'bg-transparent'} m-2 shadow-lg rounded-md`} onClick={onClick}>
      <div className='grid grid-cols-10 gap-3 ml-4'>
        <div className='h-screen col-span-7 text-sm py-2 font-semibold'>
          {singlepersoninfo.name} - {singlepersoninfo.erp}
          <div className='text-xs pt-1 font-light'>
            Completed on 21:59 December 23, 2023
          </div>
        </div>
        <div className={`col-span-2 text-xl m-2 font-semibold ${textColor}`}>
          {singlepersoninfo.percentage}%
        </div>
      </div>
    </div>
  );
};

export default PeopleTabTile;
