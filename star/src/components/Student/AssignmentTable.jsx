import React from 'react'
import { TbArrowsMoveVertical } from "react-icons/tb";
import { useMediaQuery } from 'react-responsive'
import MobUpQuiz from './MobUpQuiz';

const AssignmentTable = () => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 770px)' })

    function createData(name, course, openDate,closeDate, startTime, duration, closeTime) {
        return { name, course, openDate, closeDate, startTime, duration, closeTime};
    }
        
    const rows = [
        createData('Weekly Quiz 1', "Introduction to Computing", "23 October 2023","23 October 2023", "23:55", "20 minutes", "23:55"),
        createData('Weekly Quiz 1', "Introduction to Computing", "23 October 2023", "23 October 2023","23:55", "20 minutes", "23:55"),
        createData('Weekly Quiz 1', "Introduction to Computing", "23 October 2023","23 October 2023", "23:55", "20 minutes", "23:55"),
        createData('Weekly Quiz 1', "Introduction to Computing", "23 October 2023","23 October 2023", "23:55", "20 minutes", "23:55"),
        createData('Weekly Quiz 1', "Introduction to Computing", "23 October 2023","23 October 2023", "23:55", "20 minutes", "23:55")
    ];
    return (
    <div>
        {!isTabletOrMobile ?
        <div className="quizTable flex justify-start ml-4 rounded-lg">
            <div className="container w-11/12 overflow-x-auto">
                <table className='w-full border-separate border-spacing-y-2'>
                    <thead className=''>
                        <tr className='text-center font-bold'>
                            <th className='p-3 text-sm font-semibold tracking-wide border-b-[1px] border-[#937D7D]'>Quiz Title</th>
                            <th className='p-3 text-sm font-semibold tracking-wide items-center border-b-[1px] border-[#937D7D]'>
                                Course
                                <button><TbArrowsMoveVertical/></button>
                            </th>
                            <th className='p-3 text-sm font-semibold tracking-wide items-center border-b-[1px] border-[#937D7D]'>
                                Open Date
                                <button><TbArrowsMoveVertical/></button>
                            </th>
                            <th className='p-3 text-sm font-semibold tracking-wide items-center border-b-[1px] border-[#937D7D]'>
                                Close Date
                                <button><TbArrowsMoveVertical/></button>
                            </th>
                            <th className='p-3 text-sm font-semibold tracking-wide border-b-[1px] border-[#937D7D]'>Start Time</th>
                            <th className='p-3 text-sm font-semibold tracking-wide border-b-[1px] border-[#937D7D]'>End Time</th>
                            <th className='p-3 text-sm font-semibold tracking-wide border-b-[1px] border-[#937D7D]'>Duration</th>
                        </tr>
                    </thead>

                    <tbody className="">
                        {
                            rows.map((row) => (
                                <tr className='text-center bg-LightBlue drop-shadow-md'>
                                    <td className='p-3 text-sm border-black border-y-[1px]'>{row.name}</td>
                                    <td className='p-3 text-sm border-black border-y-[1px]'>{row.course}</td>
                                    <td className='p-3 text-sm border-black border-y-[1px]'>{row.openDate}</td>
                                    <td className='p-3 text-sm border-black border-y-[1px]'>{row.closeDate}</td>
                                    <td className='p-3 text-sm border-black border-y-[1px] text-center'>{row.startTime}</td>
                                    <td className='p-3 text-sm border-black border-y-[1px] text-center'>{row.closeTime}</td>
                                    <td className='p-3 text-sm border-black border-y-[1px] text-center'>{row.duration}</td>     
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
        : 
        <div className='w-full h-[200px] flex flex-wrap'>
            {
                rows.map((row) => (
                    <MobUpQuiz name={row.name} course={row.course} duration={row.duration} openDate={row.openDate} startTime={row.startTime} closeDate={row.closeDate} closeTime={row.closeTime}/>
                ))
            }
        </div>
        }
    </div>
    )
}

export default AssignmentTable