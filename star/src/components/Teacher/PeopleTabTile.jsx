import React, { useState , useContext } from 'react';
import LCSearchBar from './LCSearchBar';
import { CiFilter } from "react-icons/ci";

const PeopleTabTile = ({ singlepersoninfo, active , onClick}) => {
  const textColor = singlepersoninfo.percentage > 60 ? 'text-[#70FF71]' : 'text-[#FF6058]';

  return (
    <div className={`h-full ${active ? 'bg-DarkBlue text-white' : 'bg-transparent'} m-2 rounded-md`} onClick={onClick}>
      <div className='flex items-center w-full justify-between p-2'>
        <div className='text-sm font-medium'>
          {singlepersoninfo.name} - {singlepersoninfo.erp}
          <div className='text-xs font-light'>
            21:59 December 23, 2023
          </div>
        </div>
        <div className={`text-xl font-semibold ${textColor}`}>
          {singlepersoninfo.percentage}%
        </div>
      </div>
    </div>
  );
};

export default PeopleTabTile;
