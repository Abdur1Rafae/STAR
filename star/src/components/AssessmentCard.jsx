import React from 'react';
import { MdOndemandVideo } from "react-icons/md";
import { FaHourglassEnd } from "react-icons/fa6";
import { FaClock } from "react-icons/fa6";
import { BsCardChecklist } from "react-icons/bs";
import { IoIosPeople } from "react-icons/io";
import MonitorButton from './button/MonitorButton';
import GradeButton from './button/GradeButton';
import EditButton from './button/EditButton';

const AssessmentCard = ({ status }) => {
    let buttonComponent, statusColor, statusTextColor;

    switch (status) {
        case 'In Progress':
            buttonComponent = <MonitorButton label="Monitor" />;
            statusColor = 'MonitorYellow';
            statusTextColor = 'MonitorYellow';
            break;
        case 'Requires Grading':
            buttonComponent = <GradeButton label="Grade" />;
            statusColor = 'DeleteRed';
            statusTextColor = 'DeleteRed';
            break;
        case 'Not Started':
            buttonComponent = <EditButton label="Edit" />;
            statusColor = 'DarkBlue';
            statusTextColor = 'DarkBlue';

            break;
        default:
            buttonComponent = null;
            statusColor = '';
            statusTextColor = '';
            break;
    }

    return (
        <div className={`h-72 rounded bg-#F4F9FD border-r border-b border-l border-black border-black`}>
            <img className="w-full h-32 rounded-t-l border-t border-b border-black" src="https://s3-alpha-sig.figma.com/img/f614/31bd/60215bb28c13d103939beadefde69b9e?Expires=1708300800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=n19JJK1Fc6nbZ-jnwTxO4dOgR~VI1P~AJ0IaBYdHFJ7IJwkAkc525ZrLI9-o9Ptsoa3gvb0ZVVqkGcX1eITgbjVziAL2-rR7SwOti1XOimlPcrdO2jPGQi8mCFGMhq8lJcoqKF7oPbeiuET5YBa6ognqEsxwLPrHWa3PviByxygqTlL7fN9rxwUAoCEtUtMD5NBtniar8SsjBClaJdVMTORWXo6KbrLSzXv5Kewq9~KadIStDcrgSTF-rL5nUlkCLbqkTutzGsV6LeEXe~EpvFNZHaY8gbTECpcAUQ8iocn06o33BhH5KmAZJEvfJBztLc~dwow2WtkVvbteMFMNxA__" alt="" />
            <div className='flex mt-2 items-center'>
                <h3 className={`text-md font-medium text-DarkBlue ml-2`}>Monthly Test</h3>
                <div className={`w-fit h-fit rounded-full border border-${statusColor} text-${statusTextColor} text-[10px] p-1 ml-8`}>{status}</div>
            </div>
            <hr className="px-8 mt-2 border border-#5F6368 m-2"></hr>
            <div className='columns-2 ml-2'>
                <div className='flex items-center'>
                    <MdOndemandVideo color="#5F6368" />
                    <p className='text-[10px] p-1'>22:00 15 January 2023</p>
                </div>
                <div className='flex items-center'>
                    <FaHourglassEnd color="#5F6368" />
                    <p className='text-[10px] p-1'>22:00 15 January 2023</p>
                </div>
            </div>
            <div className='columns-2 ml-2'>
                <div className='flex items-center'>
                    <FaClock size={14} color="#5F6368" />
                    <p className='text-[10px] p-1'>20 Minutes</p>
                </div>
                <div className='flex items-center'>
                    <BsCardChecklist color="#5F6368" />
                    <p className='text-[10px] p-1'>20 Questions</p>
                </div>
            </div>
            <div className='columns-2 ml-2'>
                <div className='flex items-center'>
                    <IoIosPeople color="#5F6368" />
                    <p className='text-[10px] p-1'>100 Participants</p>
                </div>
            </div>
            <div className='flex justify-end pr-2'>
                {buttonComponent}
            </div>
        </div>
    );
};

export default AssessmentCard;
