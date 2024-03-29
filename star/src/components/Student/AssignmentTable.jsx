import React, {useState} from 'react'
import { TbArrowsMoveVertical } from "react-icons/tb";
import { useMediaQuery } from 'react-responsive'
import MobUpQuiz from './MobUpQuiz';

const AssignmentTable = ({assessments}) => {
    console.log(assessments)
    function formatDate(date) {
        return new Date(date).toISOString().split('T')[0];
    }

    function formatTime(date) {
        return new Date(date).toISOString().split('T')[1].substring(0, 5);
    }

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 770px)' })

    const [rows, setRows] = useState(assessments.map((obj)=>{
        return {...obj, 
        openDate: formatDate(obj.OpenDate),
        startTime: formatTime(obj.OpenDate),
        closeDate: formatDate(obj.CloseDate),
        closeTime: formatTime(obj.CloseDate)}}))
    
    

    const sortByCourse = () => {
        const sortedRows = [...rows].sort((a, b) => a.course.localeCompare(b.course));
        setRows(sortedRows);
    };

    const sortByOpenDate = () => {
        const sortedRows = [...rows].sort((a, b) => {
            const dateA = new Date(a.openDate);
            const dateB = new Date(b.openDate);
            return dateA - dateB;
        });
        setRows(sortedRows);
    };

    const sortByCloseDate = () => {
        const sortedRows = [...rows].sort((a, b) => {
            const dateA = new Date(a.closeDate);
            const dateB = new Date(b.closeDate);
            return dateA - dateB;
        });
        setRows(sortedRows);
    };

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
                                <button onClick={sortByCourse}><TbArrowsMoveVertical/></button>
                            </th>
                            <th className='p-3 text-sm font-semibold tracking-wide items-center border-b-[1px] border-[#937D7D]'>
                                Open Date
                                <button onClick={sortByOpenDate}><TbArrowsMoveVertical/></button>
                            </th>
                            <th className='p-3 text-sm font-semibold tracking-wide items-center border-b-[1px] border-[#937D7D]'>
                                Close Date
                                <button onClick={sortByCloseDate}><TbArrowsMoveVertical/></button>
                            </th>
                            <th className='p-3 text-sm font-semibold tracking-wide border-b-[1px] border-[#937D7D]'>Start Time</th>
                            <th className='p-3 text-sm font-semibold tracking-wide border-b-[1px] border-[#937D7D]'>End Time</th>
                            <th className='p-3 text-sm font-semibold tracking-wide border-b-[1px] border-[#937D7D]'>Duration</th>
                        </tr>
                    </thead>

                    <tbody className="">
                        {
                            rows.map((row, index) => (
                                <tr key={index} className='text-center bg-LightBlue drop-shadow-md'>
                                    <td className='p-3 text-sm border-black border-y-[1px]'>{row.Title}</td>
                                    <td className='p-3 text-sm border-black border-y-[1px]'>{row.ClassName}</td>
                                    <td className='p-3 text-sm border-black border-y-[1px]'>{row.openDate}</td>
                                    <td className='p-3 text-sm border-black border-y-[1px]'>{row.closeDate}</td>
                                    <td className='p-3 text-sm border-black border-y-[1px] text-center'>{row.startTime}</td>
                                    <td className='p-3 text-sm border-black border-y-[1px] text-center'>{row.closeTime}</td>
                                    <td className='p-3 text-sm border-black border-y-[1px] text-center'>{row.Duration} minutes</td>     
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
                    <MobUpQuiz name={row.Title} course={row.ClassName} duration={row.Duration} openDate={row.openDate} startTime={row.startTime} closeDate={row.closeDate} closeTime={row.closeTime}/>
                ))
            }
        </div>
        }
    </div>
    )
}

export default AssignmentTable