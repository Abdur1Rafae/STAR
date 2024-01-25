import React from 'react'
import { MdOutlineArrowBackIos } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { LiaPaperclipSolid } from "react-icons/lia";
import { useDispatch, useSelector } from 'react-redux';
import {toggleTab} from '../../redux/qrTab';

const QuizTitleBar = ({Course_Name, assessment_Name}) => {
  let showTab = useSelector((state)=> state.qrTab.value)
  const dispatch = useDispatch()

  let setSummaryActive = () => {
    if (showTab == false) {
      dispatch(toggleTab())
    }
  }

  let setSubmissionActive = () => {
    if (showTab == true) {
      dispatch(toggleTab())
    }
  }

  return (
    <div className='w-full bg-LightBlue drop-shadow-md flex flex-col justify-around md:flex-row md:justify-between'>
        <div className='self-center md:h-auto h-12 flex flex-col w-full md:w-1/2 md:mt-0 mt-2'>
            <div className='flex'>
              <MdOutlineArrowBackIos className='text-2xl self-center'/>
              <div className='flex flex-col'>
                <h1 className="ml-4 font-medium text-md font-body">{assessment_Name}</h1>
                <h1 className="ml-4 font-light text-sm font-body">{Course_Name}</h1>
              </div>
            </div>
        </div>
        <div className='self-center mt-4 md:m-0 md:mr-4 flex justify-around md:justify-end text-sm w-full md:w-1/2 h-12'>
            <button className={`flex h-full items-center mr-4 ${showTab ? 'border-b-2 border-DarkBlue' : 'group relative inline-block'}`} onClick={setSummaryActive}>
              <TbReportAnalytics className='self-center text-xl'/>
              <span class="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-DarkBlue transition-all duration-200 group-hover:w-full"></span>
              <h3 className='font-medium'>Summmary</h3>
            </button>
            <button className={`flex items-center ${showTab ? 'group relative inline-block' : 'border-b-2 border-DarkBlue'}`} onClick={setSubmissionActive}>
              <LiaPaperclipSolid className='self-center text-xl'/>
              <span class="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-DarkBlue transition-all duration-200 group-hover:w-full"></span>
              <h3 className='font-medium'>Submission</h3>
            </button>
        </div>
    </div>
  )
}

export default QuizTitleBar