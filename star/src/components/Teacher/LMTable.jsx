import React, {useState} from "react";
import CategoryFilter from '../../components/Teacher/CategoryFilter';

const LMTable = ({ data }) => {
  const skills = ['Submitted', 'Active', 'Yet to attempt'];
  const sections = ['A', 'B', 'C', 'D'];
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);}
    const [selectedCategory, setSelectedCategory] = useState('');
  return (
    <table className='w-full border-separate border-spacing-y-2'>
    <thead className=''>
        <tr className='text-center text-md font-semibold text-gray-600'>
            <th className='px-1 py-3 tracking-wide border-b-[1px] border-[#937D7D]'>Name</th>
            <th className='px-1 py-3 tracking-wide border-b-[1px] border-[#937D7D] flex justify-center items-center'>Section  
              <CategoryFilter categoryName="All" categories={sections} selectedCategory={selectedCategory} onSelectCategory={handleSelectCategory}/>
            </th>
            <th className='px-1 py-3 tracking-wide border-b-[1px] border-[#937D7D]'>Start Time</th>
            <th className='px-1 py-3 tracking-wide border-b-[1px] border-[#937D7D]'>Submit Time</th>
            <th className='px-1 py-3 tracking-wide border-b-[1px] border-[#937D7D] flex justify-center item-center'>Status
              <CategoryFilter categoryName="All" categories={skills} selectedCategory={selectedCategory} onSelectCategory={handleSelectCategory}/>
            </th>
        </tr>
    </thead>

    <tbody className="">
        {
            data.map((row) => (
                <tr className='text-center drop-shadow-md bg-LightBlue'>
                    <td className='px-1 py-3 text-sm border-black border-y-[1px]'>{row.studentName}</td>
                    <td className='px-1 py-3 text-sm border-black border-y-[1px]'>{row.section}</td>
                    <td className='px-1 py-3 text-sm border-black border-y-[1px]'>{row.startTime}</td>
                    <td className='px-1 py-3 text-sm border-black border-y-[1px]'>{row.submitTime}</td>
                    <td className='px-1 py-3 text-sm border-black border-y-[1px]'>{row.status}</td>   
                </tr>
            ))
        }
    </tbody>
</table>
  );
};

export default LMTable;