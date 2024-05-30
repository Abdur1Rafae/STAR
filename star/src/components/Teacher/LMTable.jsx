import React, { useState, useEffect } from "react";
import { DDMMM_HHMM } from "../../Utils/DateFunctions";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useLocation } from 'react-router-dom';

const LMTable = ({ data, columns, selectedSection = 'All', selectedStatus = 'All', onClick }) => {
  const location = useLocation();
  const pathStartsWith = location.pathname.startsWith('student/live-monitoring');
  const [filteredData, setFilteredData] = useState(data);
  const modules = {
    toolbar: false,
  };
  const getRowClass = (rowIndex) => {
    if (rowIndex === 0) return ' text-xl bg-[#ffc308]/75 shadow-xl';  // First row largest
    if (rowIndex === 1) return ' text-lg bg-[#d6d6d6] shadow-xl';   // Second row smaller
    if (rowIndex === 2) return 'text-md bg-[#d4a96b]/75 shadow-xl ';   // Third row smaller
    return '';  // Normal size for the rest
  };

  useEffect(() => {
    const filteredResult = data.filter(item => {
      const sectionMatch = selectedSection === 'All' || item.sectionName === selectedSection;
      const statusMatch = selectedStatus === 'All' || !selectedStatus || item.status === selectedStatus;
      return sectionMatch && statusMatch;
    });
  
    const sortedResult = filteredResult.sort((a, b) => {
      const scoreA = a.score ?? 0;
      const scoreB = b.score ?? 0;
      return scoreB - scoreA;
    });
  
    setFilteredData(sortedResult);
  }, [data, selectedSection, selectedStatus]);

  const handleClick = (data) => {
    const assessment = JSON.parse(localStorage.getItem('GradeAssessment'));
    localStorage.setItem('Response', JSON.stringify(data));
    window.location.assign(`/teacher/grading/${assessment.title}`);
  };

  return (
    <div className="w-full md:w-11/12 py-2 md:p-0 md:mx-2">
      <div>
        <table className="w-full  border-separate border-spacing-y-2">
          <thead>
            <tr className="text-center text-gray-600">
              {
                pathStartsWith && <th className="px-1 py-3 tracking-wide border-b-[1px] border-[#937D7D]">Rank</th>
              }
              {columns.map((column, index) => (
                <th key={index} className="text-sm px-1 py-3 tracking-wide border-b-[1px] border-[#937D7D]">
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={onClick ? () => handleClick(row) : () => {}}
                className={`text-center shadow-md bg-LightBlue ${onClick ? 'hover:cursor-pointer' : ''} ${pathStartsWith ? getRowClass(rowIndex) : ''}`}
              >
                {
                  pathStartsWith && <td className="px-1 py-2  border-black border-y-[1px]">{rowIndex + 1}</td>
                }
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-1 py-2  border-black border-y-[1px] text-xs">
                    {column.key === "startTime" || column.key === "submitTime"
                      ? row[column.key] !== null
                        ? DDMMM_HHMM(row[column.key])
                        : '-'
                      : column.key === "question"
                      ? <ReactQuill readOnly={true} modules={modules} value={row[column.key] ? (row[column.key].slice(0, 125) + '...') : ''} className="w-full text-md" />
                      : row[column.key]}
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
