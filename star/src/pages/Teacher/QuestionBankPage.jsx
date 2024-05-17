import React ,{ useEffect, useState }from 'react';
import MenuBar from '../../components/MenuBar'
import SideBar from '../../components/Teacher/SideBar'
import Subheader from '../../components/Teacher/Subheader'
import SearchBar from '../../components/Teacher/SearchBar';
import QuestionBankCard from '../../components/Teacher/QuestionBankCard';
import { GetAllQuestionBanks } from '../../APIS/Teacher/QuestionBankAPI';
import Loader from '../../components/Loader';



function QuestionBankPage() {
  const [loading, setLoading] = useState(true)
  const [questionBanks, setQuestionBanks] = useState([])
  const [selectedClass, setSelectedClass] = useState('All');
  const [classes, setClasses] = useState([]);
  const [filteredData, setFilteredData] = useState([])

  useEffect(()=> {
    const asg = questionBanks.filter((qb)=> {
      if(selectedClass != 'All' && qb.class != selectedClass) {
        return false
      }
      return true
    })
    setFilteredData(asg)
  }, [questionBanks, selectedClass])


  useEffect(()=> {
    const GetQBs = async() => {
      try {
        const res = await GetAllQuestionBanks()
        console.log(res)
        setTimeout(() => {
          setQuestionBanks(res)
          const classes = [...new Set(res.filter((asg)=> asg.hasOwnProperty('class')).map(asg=> asg.class))]
          setClasses(classes)
          setLoading(false);
        }, 1000);
      } catch(err) {
        console.log(err)
      }
    }

    GetQBs()
  }, [])
    
  return (
    <>
            <SideBar active={"Library"}/>
            <div className='w-full flex flex-col'>
                <Subheader name={"Library"}/>
                <div className={`p-4 flex gap-4 overflow-hidden ${loading ? 'h-full flex-row justify-center items-center' : 'flex-col'}`}>
                  {
                    loading? 
                    <Loader/>
                    :
                    <div className='flex flex-col gap-4'>
                      <div className='flex gap-2 items-center'>
                        <div className='md:w-2/4 w-full'>
                          <SearchBar/>
                        </div>
                        <div className="max-w-12 text-sm flex justify-between items-center h-12">
                          <div className="bg-LightBlue border border-black rounded-md hover:border-gray-400 h-10">
                              <select
                                  value={selectedClass}
                                  onChange={(e) => setSelectedClass(e.target.value)}
                                  className='outline-none bg-LightBlue rounded-md h-9'
                              >
                                <option value={'All'}>
                                   All 
                                </option>
                                {classes.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}  
                              </select>

                          </div>
                        </div>
                      </div>
                      <div className='flex flex-wrap gap-8'>
                        {
                          filteredData.map((qb, index)=> {
                            return <QuestionBankCard key={index} className={qb.class} onClick={()=>{window.location.assign(`/teacher/library/${qb.title}`); localStorage.setItem('QuestionBankID', qb._id)}} Name={qb.title} date={qb.scheduled} id={qb._id} count={qb.questionCount}/>
                          })
                        }
                      </div>
                    </div>
                  }
                </div>
            </div>
        </>
  );
}

export default QuestionBankPage;
