import React, { useState, useEffect } from 'react'
import MenuBar from '../../components/MenuBar'
import SideBar from '../../components/Teacher/SideBar'
import Subheader from '../../components/Teacher/Subheader'
import LCSearchBar from '../../components/Teacher/LCSearchBar'
import ViewBox from '../../components/Teacher/ViewBox'
import LMTable from '../../components/Teacher/LMTable'
import CategoryFilter from '../../components/Teacher/CategoryFilter'

const QuizReports = () => {
  const onClick = () => {
    window.location.assign('/teacher/reports/wef');
  }
  const data =[
      {AssessmentTitle: "Math Test", Class: "Class 2B", DateGenerated: "2024-04-03", Responses: 30 , view:<ViewBox onClick={onClick}/>},
      {AssessmentTitle: "Science Quiz", Class: "Class 3C", DateGenerated: "2024-04-05", Responses: 50, view:<ViewBox onClick={onClick}/>},
      {AssessmentTitle: "History Exam", Class: "Class 4D", DateGenerated: "2024-04-02",Responses: 20, view:<ViewBox onClick={onClick}/>},
      {AssessmentTitle: "English Assignment", Class: "Class 5E",DateGenerated: "2024-04-01", Responses: 10, view:<ViewBox onClick={onClick}/>},
      {AssessmentTitle: "Geography Test", Class: "Class 1A",DateGenerated: "2024-04-04",Responses: 40, view:<ViewBox onClick={onClick}/>},
  ];
  const skills = ['Submitted', 'Active', 'Yet to attempt'];
  const classes = ['2343', '2424', '7575', '2947'];
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  }
  
  const [selectedCategory, setSelectedCategory] = useState('');
  const columns = [
    { title: "Title", key: "AssessmentTitle" },
    { title: "Class", key: "Class" },
    { title: "Date", key: "DateGenerated" },
    { title: "Responses", key: "Responses" },
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
          <LMTable data={data} columns = {columns} />
        </div>
      </div>
   </div>
);
}

export default QuizReports