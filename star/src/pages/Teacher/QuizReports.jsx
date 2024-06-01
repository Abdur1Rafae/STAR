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
  const [filteredReports, setFilteredReports] = useState([])
  const [classes, setClasses] = useState([])
  const [selectedClass, setSelectedClass] = useState('All')


  useEffect(()=> {
    const data = reports.filter((report) => {
        if(selectedClass !== 'All'  && report.class != selectedClass) {
            return false;
        }
        return true
    })

    setFilteredReports(data)
  }, [reports, selectedClass])

  useEffect(()=>{
    const GetData = async() => {
      try {
        const res = await GetAllReports()
        const classes = ['All',...new Set(res.filter((asg => asg.hasOwnProperty('class'))).map(asg => asg.class))]
        setClasses(classes)
        const transformedRes = res.map(item => ({
          ...item,
          generated: YYYYMMDD(item.generated),
          view:<ViewBox onClick={()=>onClick(item._id, item.title)}/>
        }))
        setReports(transformedRes)
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
    <>
         <SideBar active={"Reports"}/>
         <div className='h-fit w-full	'>
          <Subheader name={"Reports"}/>
          <div className='flex md:px-4 md:pt-4 p-1 gap-4'>
              <LCSearchBar/>
              <CategoryFilter categories={classes} selectedCategory={selectedClass} onSelectCategory={setSelectedClass}/>
          </div>
          <LMTable data={reports} columns = {columns} />
        </div>
      </>
);
}

export default QuizReports