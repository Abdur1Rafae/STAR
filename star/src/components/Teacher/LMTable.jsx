import React, { useState } from "react";
import CategoryFilter from '../../components/Teacher/CategoryFilter';

const LMTable = ({ data, columns , sections, skills}) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  }
  
  return (
    <div className="w-11/12 mx-4">
      <div className="flex mt-6 font-sans gap-4">
        {sections && <div className="flex">
          <p>Sections :&nbsp;</p>
          <CategoryFilter categoryName="All" categories={sections} selectedCategory={selectedCategory} onSelectCategory={handleSelectCategory}/>
        </div>}
        {skills && <div className="flex">
          <p>Status :&nbsp;</p>
          <CategoryFilter categoryName="All" categories={skills} selectedCategory={selectedCategory} onSelectCategory={handleSelectCategory}/>
        </div>}
      </div>
      <div>
        <table className='w-full text-sm md:text-base border-separate border-spacing-y-2'>
          <thead>
            <tr className='text-center text-gray-600'>
              {columns.map((column, index) => (
                <th key={index} className='px-1 py-3 tracking-wide border-b-[1px] border-[#937D7D]'>
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className='text-center shadow-md bg-LightBlue'>
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className='px-1 py-3 text-xs md:text-sm border-black border-y-[1px]'>
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>  
        </table>
      </div>
    </div>
  );
};

export default React.memo(LMTable);
