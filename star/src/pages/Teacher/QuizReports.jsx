import React, { useState, useEffect } from 'react'
import MenuBar from '../../components/MenuBar'
import SideBar from '../../components/Teacher/SideBar'
import Subheader from '../../components/Teacher/Subheader'
import LCSearchBar from '../../components/Teacher/LCSearchBar'
import ViewBox from '../../components/Teacher/ViewBox'
import LMTable from '../../components/Teacher/LMTable'
import CategoryFilter from '../../components/Teacher/CategoryFilter'
import { GetAllReports } from '../../APIS/Teacher/ReportAPI'
import { YYYYMMDD } from '../../Utils/DateFunctions'

const QuizReports = () => {
  const [reports, setReports] = useState([])

  useEffect(()=>{
    const GetData = async() => {
      try {
        const res = await GetAllReports()
        const transformedRes = res.map(item => ({
          ...item,
          generated: YYYYMMDD(item.generated),
          view:<ViewBox onClick={()=>onClick(item._id, item.title)}/>
        }))
        setReports(transformedRes)
        console.log(transformedRes)
      } catch(err) {
        console.log(err)
      }
    }

    GetData()
  }, [])
  const onClick = (id, title) => {
    localStorage.setItem('ReportId', id)
    window.location.assign(`/teacher/reports/${title}`);
  }
  
  const columns = [
    { title: "Title", key: "title" },
    { title: "Class", key: "class" },
    { title: "Date", key: "generated" },
    { title: "Responses", key: "responses" },
    { title: "", key: "view"}
  ];
  
  
  return (
    <div className=' w-full h-full font-body'>
      <MenuBar name={"Jawwad Ahmed Farid"} role={"Teacher"}/>
      <div className='w-auto md:h-full flex md:flex-row flex-col-reverse'>
         <SideBar active={"Reports"}/>
         <div className='h-fit w-full	'>
          <Subheader name={"Reports"}/>
          <div className='flex md:px-4 md:pt-4 p-1 gap-4'>
              <LCSearchBar/>
              <CategoryFilter categories={['3452', '2343', '2342']}/>
          </div>
          <LMTable data={reports} columns = {columns} />
        </div>
      </div>
   </div>
);
}

export default QuizReports