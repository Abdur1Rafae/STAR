import React, { useState, useEffect } from "react";
import { DDMMM_HHMM } from "../../Utils/DateFunctions";

const LMTable = ({ data, columns , selectedSection = 'All', selectedStatus = 'All'}) => {
  const [filteredData, setFilteredData] = useState(data)

  useEffect(() => {
    const filteredResult = data.filter(item => {
      const sectionMatch = selectedSection === 'All' || item.sectionName === selectedSection;
      const statusMatch = selectedStatus === 'All' || !selectedStatus || item.status === selectedStatus;
      return sectionMatch && statusMatch;
    });
    setFilteredData(filteredResult);
  }, [data, selectedSection, selectedStatus]);
  
  
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
              <tr key={rowIndex} className='text-center shadow-md bg-LightBlue'>
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className='px-1 py-2 text-xs md:text-sm border-black border-y-[1px]'>
                    { column.key == "startTime" || column.key == "submitTime" ? 
                      DDMMM_HHMM(row[column.key]) :
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
