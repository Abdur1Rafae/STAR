import React, { useState } from 'react';
import SubmitButton from '../button/SubmitButton';
import { MdEdit } from "react-icons/md";

const AddStudentDialog = ({ isOpen, onClose, selectedFilein , selectedFilename , EditClick ,onSave , showError , error}) => {

  
  const lowercaseKeys = (obj) => {
    const newObj = {};
    Object.keys(obj).forEach(key => {
      const trimmedKey = key.trim().toLowerCase();
      newObj[trimmedKey] = obj[key];
    });
    return newObj;
  };
  
  const normalizeData = (data) => {
    data = data.map(obj => lowercaseKeys(obj));
    // Get all unique keys from the data
    const allKeys = data.reduce((keys, obj) => {
      Object.keys(obj).forEach(key => {
        if (!keys.includes(key)) {
          keys.push(key);
        }
      });
      return keys;
    }, []);
  
    // Normalize each object in the data array
    return data.map(obj => {
      const newObj = {};
      allKeys.forEach(key => {
        newObj[key] = obj[key] !== undefined ? obj[key] : '-';
      });
      return newObj;
    });
  };
  const filterArray = (data) => {
    return data.filter(obj => {
      return !Object.values(obj).some(value => value === "-");
    });
  };
  
  const normalizedData = normalizeData(selectedFilein);
  const filteredData = filterArray(normalizedData);
  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${isOpen ? '' : 'hidden'}`}>
      <div className="w-full m-4 bg-white p-4 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4">Add Students</h2>
        {showError && <div className='text-red-500 text-xs bg-red-200 py-2 px-4 rounded-lg w-fit'>{error}</div>}
        <div className='flex gap-2 items-center'>
          <span className='font-semibold'>Import file: </span>
          <span>{selectedFilename} </span>
          <MdEdit onClick={EditClick}/>
        </div>
        <div className='h-72 rounded-lg mt-4 overflow-y-scroll'>
          {/* Display file content in a table */}
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-200">
            <thead className='text-xs text-gray-700  bg-white dark:bg-LightBlue dark:text-black'>
              <tr className='text-md mb-4'>
                <th scope="col" className="px-6 py-3 font-normal">Name</th>
                <th scope="col" className="px-6 py-3 font-normal">ERP</th>
                <th scope="col" className="px-6 py-3 font-normal">Email</th>
              </tr>
            </thead>
            <tbody>
    {/* Iterate over normalizedData array and render each student as a table row */}
    {normalizedData.map((student, index) => (
      <tr key={index} className={index % 2 === 0 ? 'even:bg-white even:dark:bg-white' : 'odd:bg-white odd:dark:bg-white'}>
        {/* Iterate over the keys of each object and render the value for each key */}
        {Object.keys(student).map((key, idx) => (
          <td key={idx} scope="row" className="px-6 py-4 font-normal whitespace-nowrap text-black">
            {student[key]}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
          </table>
        </div>
        <div className='flex w-full mt-4 justify-end gap-2 '>
          <SubmitButton label={"Cancel"} onClick={onClose} />
          <SubmitButton label={"Add Students"}  active={true} onClick={() => onSave(filteredData)} />
        </div>
      </div>
    </div>
  );
};

export default AddStudentDialog;
