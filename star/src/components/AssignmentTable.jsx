import React from 'react'
import { TbArrowsMoveVertical } from "react-icons/tb";

const AssignmentTable = () => {
    function createData(name, course, openDate,closeDate, startTime, duration, status) {
        return { name, course, openDate, closeDate, startTime, duration, status };
      }
      
      const rows = [
        createData('Weekly Quiz 1', "Introduction to Computing", "23 October 2023","23 October 2023", "23:55", "20 minutes", "Active"),
        createData('Weekly Quiz 1', "Introduction to Computing", "23 October 2023", "23 October 2023","23:55", "20 minutes", "InActive"),
        createData('Weekly Quiz 1', "Introduction to Computing", "23 October 2023","23 October 2023", "23:55", "20 minutes", "Active"),
        createData('Weekly Quiz 1', "Introduction to Computing", "23 October 2023","23 October 2023", "23:55", "20 minutes", "InActive"),
        createData('Weekly Quiz 1', "Introduction to Computing", "23 October 2023","23 October 2023", "23:55", "20 minutes", "Active"),
      ];
    return (
    <div>
        <div className="quizTable flex justify-center overflow-auto rounded-lg">
            <div className="container w-11/12">
                <table className='w-full'>
                    <thead className='border-b-2 border-black'>
                        <tr>
                            <th className='p-3 text-sm font-semibold tracking-wide text-left'>Quiz Title</th>
                            <th className='p-3 text-sm font-semibold tracking-wide text-left flex items-center'>
                                Course
                                <button><TbArrowsMoveVertical/></button>
                            </th>
                            <th className='p-3 text-sm font-semibold tracking-wide text-left items-center'>
                                Open Date
                                <button><TbArrowsMoveVertical/></button>
                            </th>
                            <th className='p-3 text-sm font-semibold tracking-wide text-left items-center'>
                                Close Date
                                <button><TbArrowsMoveVertical/></button>
                            </th>
                            <th className='p-3 text-sm font-semibold tracking-wide text-left'>Start Time</th>
                            <th className='p-3 text-sm font-semibold tracking-wide text-left'>Duration</th>
                            <th className='p-3 text-sm font-semibold tracking-wide text-left'></th>
                        </tr>
                    </thead>

                    <tbody className="">
                        {
                            rows.map((row) => (
                                <tr className='border-b-2'>
                                    <td className='p-3 text-sm'>{row.name}</td>
                                    <td className='p-3 text-sm'>{row.course}</td>
                                    <td className='p-3 text-sm'>{row.openDate}</td>
                                    <td className='p-3 text-sm'>{row.closeDate}</td>
                                    <td className='p-3 text-sm'>{row.startTime}</td>
                                    <td className='p-3 text-sm'>{row.duration}</td>
                                    {
                                        row.status == "Active" ? (
                                            <td className='p-3 text-sm'><button><img src='./startQuiz.jpg' className='w-5'></img></button></td>
                                        ) : (<td className='p-3 text-sm'>-</td>)
                                    }
                                    
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    )
}

export default AssignmentTable