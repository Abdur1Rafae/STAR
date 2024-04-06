import React, { useState, useEffect } from 'react'
import MenuBar from '../../components/MenuBar'
import SideBar from '../../components/Teacher/SideBar'
import Subheader from '../../components/Teacher/Subheader'
import LCSearchBar from '../../components/Teacher/LCSearchBar'
import ActionBox from '../../components/Teacher/ActionBox'
import LMTable from '../../components/Teacher/LMTable'
import QuizSubheader from '../../components/Student/quiz/QuizSubheader'
const onClick = () => {
  console.log("View clicked");
}
const ClassesTablePage = () => {
    const data =[
      {'name' : 'Maaz Shamim' , 'erp' : '22131' , 'email' : "asd@asdas.com" , 'action' : <ActionBox/>},
      
    ];
      const skills = ['Submitted', 'Active', 'Yet to attempt'];
      const classes = ['2343', '2424', '7575', '2947'];
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  }
  
  const [selectedCategory, setSelectedCategory] = useState('');
  const columns = [
    { title: "Name", key: "name" },
    { title: "Student ID", key: "erp" },
    { title: "Email", key: "email" },
    { title: "Action", key: "action" },
  ];
  
  
  return (
    <div className=' w-full h-full font-body  border border-black '>
      <MenuBar name={"Jawwad Ahmed Farid"} role={"Teacher"}/>
      <div className='w-auto md:h-full flex md:flex-row flex-col-reverse'>
         <SideBar active={"Classes"}/>
         <div className='h-fit w-full	'>

            <Subheader name={"Classes"}/>
            <div className='m-4'>
            <LCSearchBar/>
            </div>

            <LMTable data={data} columns = {columns}/>
            </div>
      </div>
   </div>
);
}

export default ClassesTablePage