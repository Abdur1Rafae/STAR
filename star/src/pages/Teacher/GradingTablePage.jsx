import React, { useState, useEffect } from 'react'
import MenuBar from '../../components/MenuBar'
import SideBar from '../../components/Teacher/SideBar'
import SubheaderBut from '../../components/Teacher/SubheaderBut'
import { BiChevronLeft } from 'react-icons/bi'
import LMTable from '../../components/Teacher/LMTable'
import { FlaggedStudents, GetAssessmentSummary, PublishAssessment } from '../../APIS/Teacher/GradingAPI'
import Loader from '../../components/Loader'
import { GrOverview } from "react-icons/gr";
import { FaUsersViewfinder } from "react-icons/fa6";
import ViewBox from '../../components/Teacher/ViewBox'

const GradingTablePage = () => {
  const [loading, setLoading] = useState(true)
  const [gradingData, setGradingData] = useState([])
  const [flaggingData, setFlaggingData] = useState([])
  
  const [tab, setTab] = useState('Questions')
  const assessment = JSON.parse(localStorage.getItem('GradeAssessment'))
  const [shouldPublish, setShouldPublish] = useState(false)

  useEffect(()=>{
    const GetData = async() => {
      try {
        const res = await GetAssessmentSummary({id: assessment._id})
        console.log(res)
        let check = false
        res.map((ques) => {
          if(ques.totalResponses && (ques.totalResponses != ques.totalGraded)){
            check = true
          }
        })
        if(check == false) {
          setShouldPublish(true)
        }
        let num = 1;
        const transformedRes = res.map((item) => {
          return {
            num: num++,
            ...item,
          }
        })
        setGradingData(transformedRes)
        setLoading(false)
      } catch(err) {
        console.log(err)
      }
    }

    GetData()
  }, [])

  useEffect(()=> {
    const getFlags = async () => {
      try {
        const res = await FlaggedStudents({id: assessment._id})
        console.log(res)
        if(res.length > 0) {
          let num = 1
          const updatedRes = res.map(obj => ({
            num: num++,
            ...obj,
            view: <ViewBox onClick={()=>handleFlagClick({id: obj._id})}/>
          }));
          
          setFlaggingData(updatedRes);
        }
      } catch(err) {
        console.log(err)
      }
    }

    getFlags()
  }, [])
  
  const columns = [
    { title: "No.", key: "num" },
    { title: "Question", key: "question" },
    { title: "Point", key: "points" },
    { title: "Responses", key: "totalResponses" },
    { title: "Marked", key: "totalGraded"}
  ];

  const flagColumns = [
    {title: "No.", key: "num"},
    {title: "Name", key: "name"},
    {title: "ERP", key: "erp"},
    {title: "Violations Count", key: "violations"},
    { title: "", key: "view"}
  ]

  const handleFlagClick = ({id}) => {
    localStorage.setItem('FlagId', id)
    window.location.assign('/teacher/view-flags')
  }

  const handlePublish = async() => {
    if(shouldPublish) {
      try {
        const res = await PublishAssessment({id: assessment._id})
        console.log(res)
        window.location.assign('/teacher/home')
      } catch(err) {
        console.log(err)
      }
    }
    else {
      console.log("cant publish")
    }
  }
  
  
  return (
    <div className=' w-full h-full font-body'>
      <MenuBar name={"Jawwad Ahmed Farid"} role={"Teacher"}/>
      <div className='w-auto md:h-full flex md:flex-row flex-col-reverse'>
         <SideBar active={"Grading"}/>
         <div className='w-full h-full'>
          <SubheaderBut name={"Grading"} button={"Publish"} onClick={handlePublish}/>
          <div className={`p-2 md:p-4 flex gap-4 overflow-hidden ${loading ? 'h-full flex-row justify-center items-center' : 'flex-col'}`}>
            {
              loading ?
              <Loader/>
              :
              <>
                <div className='w-full bg-LightBlue flex flex-col gap-2 md:flex-row p-2 items-center justify-between shadow-md'>
                  <div className='w-full flex justify-between items-center self-start'>
                    <div className='flex items-center self-start'>
                      <button onClick={()=>{window.location.assign('/teacher/home')}}><BiChevronLeft className='text-3xl'/></button>
                      <h4 className='font-semibold'>{assessment.title}</h4>
                    </div>
                  </div>
                  <div className='flex gap-4 items-center justify-center md:self-end'>
                      <button onClick={()=>setTab("Questions")} className={`flex ${tab == "Questions" ? 'bg-DarkBlue text-white' : ''} active:shadow-md items-center gap-2 text-sm px-2 py-1 rounded-md`}>
                          <GrOverview/>
                          <p>Questions</p>
                      </button>
                      <button onClick={()=>setTab("Flaggings")} className={`flex ${tab == "Flaggings" ? 'bg-DarkBlue text-white' : ''} active:shadow-md items-center gap-2 text-sm px-2 py-1 rounded-md`}>
                          <FaUsersViewfinder/>
                          <p>Flaggings</p>
                      </button>
                  </div>
              </div>
              {
                tab == "Questions" ? 
                <LMTable data={gradingData} columns = {columns} onClick={true}/>
                :
                <LMTable data={flaggingData} columns = {flagColumns} onClick={false}/>

              }
              </>
            }
          </div>
        </div>
      </div>
   </div>
);
}

export default GradingTablePage