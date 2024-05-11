import React, {useState} from 'react'
import { TbArrowsMoveVertical } from "react-icons/tb";
import { useMediaQuery } from 'react-responsive'
import MobUpQuiz from './MobUpQuiz';

const AssignmentTable = ({assessments}) => {
    function formatDate(date) {
        const localDate = new Date(date);
        const formattedDate = localDate.toLocaleString('en-US', { timeZone: 'Asia/Karachi', hour12: false }).split(',')[0];
        return formattedDate;
    }
    
    function formatTime(date) {
        const localTime = new Date(date);
        const formattedTime = localTime.toLocaleString('en-US', { timeZone: 'Asia/Karachi', hour12: false}).split(',')[1].trim().substring(0, 5);
        return formattedTime;
    }

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 770px)' })

    const [rows, setRows] = useState(assessments.map((obj)=>{
        return {...obj, 
        openDate: formatDate(obj.openDate),
        startTime: formatTime(obj.openDate),
        closeDate: formatDate(obj.closeDate),
        closeTime: formatTime(obj.closeDate)}}))
    
    

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
                                    <td className='p-3 text-sm border-black border-y-[1px]'>{row.title}</td>
                                    <td className='p-3 text-sm border-black border-y-[1px]'>{row.className}</td>
                                    <td className='p-3 text-sm border-black border-y-[1px]'>{row.openDate}</td>
                                    <td className='p-3 text-sm border-black border-y-[1px]'>{row.closeDate}</td>
                                    <td className='p-3 text-sm border-black border-y-[1px] text-center'>{row.startTime}</td>
                                    <td className='p-3 text-sm border-black border-y-[1px] text-center'>{row.closeTime}</td>
                                    <td className='p-3 text-sm border-black border-y-[1px] text-center'>{row.duration} minutes</td>     
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
                    <MobUpQuiz name={row.title} course={row.className} duration={row.duration} openDate={row.openDate} startTime={row.startTime} closeDate={row.closeDate} closeTime={row.closeTime}/>
                ))
            }
        </div>
        }
    </div>
    )
}

export default AssignmentTable