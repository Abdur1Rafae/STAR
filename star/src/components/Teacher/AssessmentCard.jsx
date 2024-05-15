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
import { DDMMMMYYYY_HHMM } from '../../Utils/DateFunctions';
import { MdDelete } from 'react-icons/md';
import { DeleteAssessment } from '../../APIS/Teacher/AssessmentAPI';

const AssessmentCard = ({ assessment, onDelete }) => {
    let buttonComponent, statusColor, statusTextColor;

    const handleMonitorClick = () => {
        localStorage.setItem('MonitorAssessment', JSON.stringify(assessment))
        window.location.assign("/teacher/live-monitoring")
    }

    const handleGradeClick = () => {
        localStorage.setItem('GradeAssessment', JSON.stringify(assessment))
        window.location.assign("/teacher/grading-table")
    }

    const handleEditClick = () => {
        localStorage.setItem('EditAssessment', JSON.stringify(assessment))
        window.location.assign("/teacher/edit-assessment")
    }

    const handleDeleteAsessment = async() => {
        try {
            const res = await DeleteAssessment({id: assessment._id})
            console.log(res)
            onDelete()
        } catch(err) {
            console.log(err)
        }
    }


    switch (assessment.category) {
        case 'In Progress':
            buttonComponent = <MonitorButton label="Monitor" onClick={handleMonitorClick}/>;
            statusColor = 'border-MonitorYellow';
            statusTextColor = 'text-MonitorYellow';
            break;
        case 'Requires Review':
            buttonComponent = <GradeButton label="Grade" onClick={handleGradeClick}/>;
            statusColor = 'border-DeleteRed';
            statusTextColor = 'text-DeleteRed';
            break;
        case 'Not Started':
            buttonComponent = <EditButton label="Edit" onClick={handleEditClick}/>;
            statusColor = 'border-DarkBlue';
            statusTextColor = 'text-DarkBlue';

            break;
        default:
            buttonComponent = null;
            statusColor = '';
            statusTextColor = '';
            break;
    }

    const OpenDate = DDMMMMYYYY_HHMM({date: assessment.configurations.openDate});

    const CloseDate = DDMMMMYYYY_HHMM({date: assessment.configurations.closeDate});

    return (
        <div className={`rounded-lg w-72 bg-LightBlue border-[1px] border-black font-body pb-2`}>
            <img className="w-full h-32 rounded-lg" crossorigin="anonymous" src={ assessment.coverImage ? 'http://localhost:3000/teacherhub/'+assessment.coverImage: Asssessment} alt="" />
            <div className='flex mt-2 items-center'>
                <h3 className={`text-md font-medium text-DarkBlue ml-2`}>{assessment.title}</h3>
                <div className={`w-fit h-fit font-bold rounded-full border ${statusColor} ${statusTextColor} text-[10px] p-1 ml-2`}>{assessment.category}</div>
            </div>
            <hr className="px-8 mt-2 border border-#5F6368 m-2"></hr>
            <div className='columns-2 ml-2'>
                <div className='flex items-center'>
                    <MdOndemandVideo color="#5F6368" className='text-sm' />
                    <p className='text-[9px] p-1'>{OpenDate}</p>
                </div>
                <div className='flex items-center'>
                    <FaHourglassEnd color="#5F6368" className='text-xs'/>
                    <p className='text-[9px] p-1'>{CloseDate}</p>
                </div>
            </div>
            <div className='columns-2 ml-2'>
                <div className='flex items-center'>
                    <FaClock size={14} color="#5F6368" className='text-xs'/>
                    <p className='text-[9px] p-1'>{assessment.configurations.duration} Minutes</p>
                </div>
                <div className='flex items-center'>
                    <BsCardChecklist color="#5F6368" className='text-sm'/>
                    <p className='text-[9px] p-1'>{assessment.totalQuestions} Questions</p>
                </div>
            </div>
            <div className='columns-2 ml-2'>
                <div className='flex items-center'>
                    <IoIosPeople color="#5F6368" className='text-sm'/>
                    <p className='text-[9px] p-1'>{assessment.totalStudents} Participants</p>
                </div>
            </div>
            <div className='flex justify-end items-center pr-2'>
                {
                    assessment.category == 'Not Started' ?
                    <button onClick={handleDeleteAsessment} className='mr-4 text-red-600 text-xl'><MdDelete/></button>
                    :
                    ''
                }
                {buttonComponent}
            </div>
        </div>
    );
};

export default AssessmentCard;
