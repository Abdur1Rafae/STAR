import React, {useState} from "react";
import CategoryFilter from '../../components/Teacher/CategoryFilter';

const LMTable = () => {
  const data = [
    { studentName: "Muhammad Maaz Arasalan Batla", section: "6578", startTime: "9:00", submitTime: "10:30", status: "Submitted" },
    { studentName: "Jane Smith", section: "2353", startTime: "9:15", submitTime: "11:00", status: "Submitted" },
    { studentName: "John Doe", section: "3452", startTime: "9:00", submitTime: "10:30", status: "Submitted" },
    { studentName: "Jane Smith", section: "9690", startTime: "9:15", submitTime: "11:00", status: "Submitted" },
    { studentName: "John Doe", section: "2453", startTime: "9:00", submitTime: "10:30", status: "Submitted" },
    { studentName: "Jane Smith", section: "6647", startTime: "9:15", submitTime: "11:00", status: "Yet to attempt" },
  ];
  const skills = ['Submitted', 'Active', 'Yet to attempt'];
  const sections = ['2343', '2424', '7575', '2947'];
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  }

  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <div className="w-11/12 mx-4">
      <div className="flex mt-6 font-sans gap-4">
        <div className="flex">
          <p>Sections :&nbsp;</p>
          <CategoryFilter categoryName="All" categories={sections} selectedCategory={selectedCategory} onSelectCategory={handleSelectCategory}/>
        </div>
        <div className="flex">
          <p>Status :&nbsp;</p>
          <CategoryFilter categoryName="All" categories={skills} selectedCategory={selectedCategory} onSelectCategory={handleSelectCategory}/>
        </div>
      </div>
      <div>
      <table className='w-full text-sm md:text-base border-separate border-spacing-y-2'>
        <thead>
            <tr className='text-center text-gray-600'>
                <th className='px-1 py-3 tracking-wide border-b-[1px] border-[#937D7D]'>Name</th>
                <th className='px-1 py-3 md:py-5 tracking-wide border-b-[1px] border-[#937D7D] flex justify-center item-center flex-wrap'>Section</th>
                <th className='px-1 py-3 tracking-wide border-b-[1px] border-[#937D7D]'>Start</th>
                <th className='px-1 py-3 tracking-wide border-b-[1px] border-[#937D7D]'>Submit</th>
                <th className='px-1 py-3 md:py-5 tracking-wide border-b-[1px] border-[#937D7D] flex justify-center item-center flex-wrap'>Status</th>
            </tr>
        </thead>

        <tbody>
            {
                data.map((row, index) => (
                    <tr key={index} className='text-center shadow-md bg-LightBlue'>
                        <td className='px-1 py-3 text-xs md:text-sm border-black border-y-[1px]'>{row.studentName}</td>
                        <td className='px-1 py-3 text-xs md:text-sm border-black border-y-[1px]'>{row.section}</td>
                        <td className='px-1 py-3 text-xs md:text-sm border-black border-y-[1px]'>{row.startTime}</td>
                        <td className='px-1 py-3 text-xs md:text-sm border-black border-y-[1px]'>{row.submitTime}</td>
                        <td className='px-1 py-3 text-xs md:text-sm border-black border-y-[1px]'>{row.status}</td>   
                    </tr>
                ))
            }
        </tbody>  
      </table>
      </div>
    </div>
  );
};

export default React.memo(LMTable);