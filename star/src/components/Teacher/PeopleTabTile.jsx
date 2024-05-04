import React, { useState , useContext } from 'react';
import { DDMMM_HHMM } from '../../Utils/DateFunctions';

const PeopleTabTile = ({ singlepersoninfo, active , onClick}) => {
  const textColor = singlepersoninfo?.percentage > 60 ? 'text-[#70FF71]' : 'text-[#FF6058]';

  return (
    <button className={`w-full text-left h-full ${active ? 'bg-DarkBlue text-white' : 'bg-transparent'} rounded-md`} onClick={()=>onClick(singlepersoninfo)}>
      <div className='flex items-center gap-2 w-full justify-between p-2'>
        <div className='text-sm font-medium'>
          {singlepersoninfo?.name} - {singlepersoninfo?.erp}
          <div className='text-xs font-light'>
            {DDMMM_HHMM(singlepersoninfo?.response?.submittedAt)}
          </div>
        </div>
        <div className={`text-xl font-semibold ${textColor}`}>
          {singlepersoninfo?.percentage}%
        </div>
      </div>
    </button>
  );
};

export default PeopleTabTile;
