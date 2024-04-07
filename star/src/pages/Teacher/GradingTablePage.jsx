import React, { useState, useEffect } from 'react'
import MenuBar from '../../components/MenuBar'
import SideBar from '../../components/Teacher/SideBar'
import Subheader from '../../components/Teacher/Subheader'
import { BiChevronLeft } from 'react-icons/bi'
import LCSearchBar from '../../components/Teacher/LCSearchBar'
import ViewBox from '../../components/Teacher/ViewBox'
import LMTable from '../../components/Teacher/LMTable'
const onClick = () => {
  console.log("View clicked");
}
const GradingTablePage = () => {
    const data =[
      {"Serial No.": 1, "Question": "What is the capital of France?", "Point": 10, "Responses": 50, "Marked Responses": 40}
, {"Serial No.": 2, "Question": "Who wrote 'Hamlet'?", "Point": 15, "Responses": 60, "Marked Responses": 55}
,{"Serial No.": 3, "Question": "What is the chemical symbol for gold?", "Point": 5, "Responses": 45, "Marked Responses": 42}

    ];
      const skills = ['Submitted', 'Active', 'Yet to attempt'];
      const classes = ['2343', '2424', '7575', '2947'];
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  }
  
  const [selectedCategory, setSelectedCategory] = useState('');
  const columns = [
    { title: "Serial No.", key: "Serial No." },
    { title: "Question", key: "Question" },
    { title: "Point", key: "Point" },
    { title: "Responses", key: "Responses" },
    { title: "Marked Responses", key: "Marked Responses"}
  ];
  
  
  return (
    <div className=' w-full h-full font-body  border border-black '>
      <MenuBar name={"Jawwad Ahmed Farid"} role={"Teacher"}/>
      <div className='w-auto md:h-full flex md:flex-row flex-col-reverse'>
         <SideBar active={"Grading"}/>
         <div className='w-full h-full'>
          <Subheader name={"Grading"}/>
          <div className='p-4'>
            <div className='w-full bg-LightBlue flex p-2 items-center shadow-md'>
              <div className='flex items-center self-start'>
                  <BiChevronLeft className='text-3xl'/>
                  <h4 className='font-semibold'>Monthly Test</h4>
              </div>
            </div>
            <LMTable data={data} columns = {columns}/>
          </div>
        </div>
      </div>
   </div>
);
}

export default GradingTablePage