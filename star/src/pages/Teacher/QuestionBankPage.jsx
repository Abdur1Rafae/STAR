import React ,{ useEffect, useState }from 'react';
import MenuBar from '../../components/MenuBar'
import SideBar from '../../components/Teacher/SideBar'
import SubheaderBut from '../../components/Teacher/SubheaderBut'
import SearchBar from '../../components/Teacher/SearchBar';
import QuestionBankCard from '../../components/Teacher/QuestionBankCard';
import { GetAllQuestionBanks } from '../../APIS/Teacher/QuestionBankAPI';



function QuestionBankPage() {

  const [questionBanks, setQuestionBanks] = useState([])

  useEffect(()=> {
    const GetQBs = async() => {
      try {
        const res = await GetAllQuestionBanks()
        console.log(res)
        setQuestionBanks(res)
      } catch(err) {
        console.log(err)
      }
    }

    GetQBs()
  }, [])
    
  return (
    <div className='flex flex-col h-full'>
        <MenuBar name={"Jawwad Ahmed Farid"} role={"Teacher"}/>
        <div className='w-full md:h-full flex md:flex-row flex-col-reverse'>
            <SideBar active={"Library"}/>
            <div className='w-full flex flex-col'>
                <SubheaderBut name={"Library"} button={"New Bank"}/>
                <div className='p-4 md:pl-8 md:pt-4 flex flex-col gap-4 overflow-hidden'>
                  <div className='flex flex-col gap-4'>
                    <div className='md:w-3/4 w-full'>
                      <SearchBar/>
                    </div>
                    <div className='flex flex-wrap gap-8'>
                      {
                        questionBanks.map((qb)=> {
                          return <QuestionBankCard Name={qb.title} date={qb.updatedAt} id={qb._id} count={qb.questionCount}/>
                        })
                      }
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default QuestionBankPage;
