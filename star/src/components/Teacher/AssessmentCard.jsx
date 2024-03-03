import React from 'react';
import { MdOndemandVideo } from "react-icons/md";
import { FaHourglassEnd } from "react-icons/fa6";
import { FaClock } from "react-icons/fa6";
import { BsCardChecklist } from "react-icons/bs";
import { IoIosPeople } from "react-icons/io";
import MonitorButton from '../button/MonitorButton';
import GradeButton from '../button/GradeButton';
import EditButton from '../button/EditButton';
import Asssessment from '../Assessment.png'

const AssessmentCard = ({ status }) => {
    let buttonComponent, statusColor, statusTextColor;

    switch (status) {
        case 'In Progress':
            buttonComponent = <MonitorButton label="Monitor" onClick={()=>{window.location.assign("/teacher/live-monitoring")}}/>;
            statusColor = 'border-MonitorYellow';
            statusTextColor = 'text-MonitorYellow';
            break;
        case 'Requires Grading':
            buttonComponent = <GradeButton label="Grade" />;
            statusColor = 'border-DeleteRed';
            statusTextColor = 'text-DeleteRed';
            break;
        case 'Not Started':
            buttonComponent = <EditButton label="Edit" />;
            statusColor = 'border-DarkBlue';
            statusTextColor = 'text-DarkBlue';

            break;
        default:
            buttonComponent = null;
            statusColor = '';
            statusTextColor = '';
            break;
    }

    return (
        <div className={`rounded-lg w-72 bg-LightBlue border-[1px] border-black font-body pb-2`}>
            <img className="w-full h-32 rounded-lg" src={Asssessment} alt="" />
            <div className='flex mt-2 items-center'>
                <h3 className={`text-md font-medium text-DarkBlue ml-2`}>Monthly Test</h3>
                <div className={`w-fit h-fit font-bold rounded-full border ${statusColor} ${statusTextColor} text-[10px] p-1 ml-2`}>{status}</div>
            </div>
            <hr className="px-8 mt-2 border border-#5F6368 m-2"></hr>
            <div className='columns-2 ml-2'>
                <div className='flex items-center'>
                    <MdOndemandVideo color="#5F6368" className='text-sm' />
                    <p className='text-[9px] p-1'>22:00 15 January 2023</p>
                </div>
                <div className='flex items-center'>
                    <FaHourglassEnd color="#5F6368" className='text-xs'/>
                    <p className='text-[9px] p-1'>22:00 15 January 2023</p>
                </div>
            </div>
            <div className='columns-2 ml-2'>
                <div className='flex items-center'>
                    <FaClock size={14} color="#5F6368" className='text-xs'/>
                    <p className='text-[9px] p-1'>20 Minutes</p>
                </div>
                <div className='flex items-center'>
                    <BsCardChecklist color="#5F6368" className='text-sm'/>
                    <p className='text-[9px] p-1'>20 Questions</p>
                </div>
            </div>
            <div className='columns-2 ml-2'>
                <div className='flex items-center'>
                    <IoIosPeople color="#5F6368" className='text-sm'/>
                    <p className='text-[9px] p-1'>100 Participants</p>
                </div>
            </div>
            <div className='flex justify-end pr-2'>
                {buttonComponent}
            </div>
        </div>
    );
};

export default AssessmentCard;
