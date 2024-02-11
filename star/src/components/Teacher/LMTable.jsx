import React from "react";

const LMTable = ({ data }) => {
  return (
    <table className=" table-auto border-separate border-spacing-y-4 w-full">
      <thead>
        <tr>
          <th className="border-b-2 border-gray-300 font-semibold text-sm text-gray-500 px-4 py-2">Student Name</th>
          <th className="border-b-2 border-gray-300 font-semibold text-sm text-gray-500 px-4 py-2">Section</th>
          <th className="border-b-2 border-gray-300 font-semibold text-sm text-gray-500 px-4 py-2">Start Time</th>
          <th className="border-b-2 border-gray-300 font-semibold text-sm text-gray-500 px-4 py-2">Submit Time</th>
          <th className="border-b-2 border-gray-300 font-semibold text-sm text-gray-500 px-4 py-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td className=" px-4 py-4 bg-[#F4F9FD] border-r-0  shadow-inner drop-shadow-lg	 text-sm">{row.studentName}</td>
            <td className=" px-4 py-4 bg-[#F4F9FD] border-r-0 shadow-inner drop-shadow-lg text-sm">{row.section}</td>
            <td className=" px-4 py-4 bg-[#F4F9FD]  border-r-0 shadow-inner  drop-shadow-lg text-sm">{row.startTime}</td>
            <td className=" px-4 py-4 bg-[#F4F9FD]  border-r-0 shadow-inner drop-shadow-lg  text-sm">{row.submitTime}</td>
            <td className=" px-4 py-4 bg-[#F4F9FD]  border-r-0 shadow-inner  drop-shadow-lg text-sm">{row.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LMTable;
