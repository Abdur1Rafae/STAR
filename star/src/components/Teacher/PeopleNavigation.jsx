import React, { useState, useContext } from 'react';
import LCSearchBar from './LCSearchBar';
import { CiFilter } from "react-icons/ci";
import PeopleTabTile from './PeopleTabTile';

const PeopleNavigation = ({ peopleinfo, activePerson, onPersonClick }) => {
 
  return (
    <div className='h-full'>
      <div className='sticky top-0 bg-LightBlue'>
        <div className='flex items-center pl-2 pt-4 gap-4 bg-LightBlue'>
          <LCSearchBar  placeholder="Search" />
          <CiFilter size={28} />
        </div>
        <div className='border border-gray-300 my-4 mx-2'></div>
      </div>
      <div className='p-2'>
        {peopleinfo.map((person, index) => (
          <PeopleTabTile
            key={index}
            singlepersoninfo={person}
            active={person.erp === activePerson.erp}
            onClick={onPersonClick}
          />
        ))}
      </div>
    </div>
  );
};

export default PeopleNavigation;
