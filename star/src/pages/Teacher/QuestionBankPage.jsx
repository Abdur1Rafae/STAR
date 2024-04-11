import React ,{ useState }from 'react';
import SubmitButton from '../../components/button/SubmitButton';
import { FaFolderOpen } from "react-icons/fa";
import MenuBar from '../../components/MenuBar'
import SideBar from '../../components/Teacher/SideBar'
import SubheaderBut from '../../components/Teacher/SubheaderBut'
import { GrStorage } from "react-icons/gr";
import AllQuestions from '../../components/Teacher/AllQuestions';
import QuestionBanks from '../../components/Teacher/QuestionBanks';



function QuestionBankPage() {
    
  return (
    <div className='flex flex-col h-full'>
        <MenuBar name={"Jawwad Ahmed Farid"} role={"Teacher"}/>
        <div className='w-full md:h-full flex md:flex-row flex-col-reverse'>
            <SideBar active={"Library"}/>
            <div className='w-full flex flex-col'>
                <SubheaderBut name={"Library"} button={"New Bank"}/>
                <div className='p-4 md:pl-8 md:pt-4 flex flex-col gap-4 overflow-hidden'>
                    <QuestionBanks/> 
                </div>
            </div>
        </div>
    </div>
  );
}

export default QuestionBankPage;
