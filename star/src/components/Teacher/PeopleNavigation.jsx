import React from 'react';
import PeopleTabTile from './PeopleTabTile';

const PeopleNavigation = ({ peopleinfo, activePerson, onPersonClick }) => {
 
  return (
    <div className='h-full'>
      <div className='sticky top-0 bg-LightBlue'>
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
