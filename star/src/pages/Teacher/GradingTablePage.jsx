import React, { useState, useEffect } from 'react'
import MenuBar from '../../components/MenuBar'
import SideBar from '../../components/Teacher/SideBar'
import Subheader from '../../components/Teacher/Subheader'
import { BiChevronLeft } from 'react-icons/bi'
import LMTable from '../../components/Teacher/LMTable'
import { GetAssessmentSummary } from '../../APIS/Teacher/GradingAPI'

const GradingTablePage = () => {
  const [gradingData, setGradingData] = useState([])
  const assessment = JSON.parse(localStorage.getItem('GradeAssessment'))

  useEffect(()=>{
    const GetData = async() => {
      try {
        const res = await GetAssessmentSummary({id: assessment._id})
        let num = 1;
        const transformedRes = res.map((item) => {
          return {
            num: num++,
            ...item,
          }
        })
        setGradingData(transformedRes)
      } catch(err) {
        console.log(err)
      }
    }

    GetData()
  }, [])
  
  const columns = [
    { title: "Serial No.", key: "num" },
    { title: "Question", key: "question" },
    { title: "Point", key: "points" },
    { title: "Responses", key: "totalResponses" },
    { title: "Marked Responses", key: "totalGraded"}
  ];
  
  
  return (
    <div className=' w-full h-full font-body'>
      <MenuBar name={"Jawwad Ahmed Farid"} role={"Teacher"}/>
      <div className='w-auto md:h-full flex md:flex-row flex-col-reverse'>
         <SideBar active={"Grading"}/>
         <div className='w-full h-full'>
          <Subheader name={"Grading"}/>
          <div className='md:p-4 p-1'>
            <div className='w-full bg-LightBlue flex p-2 items-center shadow-md'>
              <div className='flex items-center self-start'>
                <button onClick={()=>{window.location.assign('/teacher/home')}}><BiChevronLeft className='text-3xl'/></button>
                <h4 className='font-semibold'>{assessment.title}</h4>
              </div>
            </div>
            <LMTable data={gradingData} columns = {columns} onClick={true}/>
          </div>
        </div>
      </div>
   </div>
);
}

export default GradingTablePage