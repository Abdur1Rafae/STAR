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
    const [tab, setTab] = useState('Question Bank')
    
  return (
    <div className='flex flex-col h-full'>
        <MenuBar name={"Jawwad Ahmed Farid"} role={"Teacher"}/>
        <div className='w-full md:h-full flex md:flex-row flex-col-reverse'>
            <SideBar active={"Library"}/>
            <div className='w-full flex flex-col'>
                <SubheaderBut name={"Library"} button={"New Bank"}/>
                <div className='p-4 md:pl-8 md:pt-4 flex flex-col gap-4 overflow-hidden'>
                    <div className='w-full flex items-center justify-between md:justify-start md:gap-4 pb-2 border-b-2 border-grey-800'>
                        <div className=''>
                            <SubmitButton label = "Question Bank" icon = {<FaFolderOpen />} active={tab == 'Question Bank'} onClick={()=>{setTab("Question Bank")}}/>
                        </div>
                        <div>
                            <SubmitButton label = "All Questions" icon={<GrStorage/>} active={tab !== 'Question Bank'} onClick={()=>{setTab("All Questions")}}/>
                        </div>
                    </div>

                    {
                        tab == "Question Bank" ? 
                        <QuestionBanks/> :
                        <AllQuestions/>
                    }
                </div>
            </div>
        </div>
    </div>
  );
}

export default QuestionBankPage;
