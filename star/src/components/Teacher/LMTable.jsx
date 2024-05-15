import React, { useState, useEffect } from "react";
import { DDMMM_HHMM } from "../../Utils/DateFunctions";
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'

const LMTable = ({ data, columns , selectedSection = 'All', selectedStatus = 'All', onClick}) => {
  const [filteredData, setFilteredData] = useState(data)
  const modules = {
    toolbar: false
};

  useEffect(() => {
    const filteredResult = data.filter(item => {
      const sectionMatch = selectedSection === 'All' || item.sectionName === selectedSection;
      const statusMatch = selectedStatus === 'All' || !selectedStatus || item.status === selectedStatus;
      return sectionMatch && statusMatch;
    });
    setFilteredData(filteredResult);
  }, [data, selectedSection, selectedStatus]);

  const handleClick = (data) => {
    console.log(data)
    const assessment = JSON.parse(localStorage.getItem('GradeAssessment'))
    localStorage.setItem('Response', JSON.stringify(data))
    window.location.assign(`/teacher/grading/${assessment.title}`)
  }
  
  
  return (
    <div className="w-full md:w-11/12 py-2 md:p-0 md:mx-2">
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
            {filteredData.map((row, rowIndex) => (
              <tr key={rowIndex} onClick={onClick ? ()=>handleClick(row) : ()=>{}} className={`text-center shadow-md bg-LightBlue ${onClick ? 'hover:cursor-pointer' : ''}`}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className='px-1 py-2 text-xs md:text-sm border-black border-y-[1px]'>
                    { column.key == "startTime" || column.key == "submitTime" ? 
                      row[column.key] !== null ? DDMMM_HHMM(row[column.key]) : '-' :
                      column.key == "question" ? 
                      <ReactQuill readOnly={true} modules={modules} value={row[column.key] ? (row[column.key].slice(0, 125)+'...') : ''} className='w-full text-md'/>
                      :
                      row[column.key]
                    }
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
