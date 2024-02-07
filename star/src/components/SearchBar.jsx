import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ value, onChange }) => {
    return (
        <div className=' flex items-center justify-between pl-8 pr-4 py-2 w-full rounded-lg border border-black focus:outline-none focus:border-blue-500'>
            <input
                type="text"
                placeholder="Search Question Bank"
                value={value}
                onChange={onChange}
                className="focus:outline-none w-max"
            />
            <div className="">
                <FaSearch className="text-gray-400" />
             
          
            
           </div> 
        </div>
    );
};

export default SearchBar;
