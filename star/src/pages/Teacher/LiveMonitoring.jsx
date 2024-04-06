import React from 'react';
import MenuBar from '../../components/MenuBar'
import SideBar from '../../components/Teacher/SideBar'
import Subheader from '../../components/Teacher/Subheader'
import LMTable from '../../components/Teacher/LMTable'
import OverallSummary from '../../components/Teacher/OverallSummary';


function LiveMonitoring() {
  const data = [
    { studentName: "Muhammad Maaz Arasalan Batla", section: "6578", startTime: "9:00", submitTime: "10:30", status: "Submitted" },
    { studentName: "Jane Smith", section: "2353", startTime: "9:15", submitTime: "11:00", status: "Submitted" },
    { studentName: "John Doe", section: "3452", startTime: "9:00", submitTime: "10:30", status: "Submitted" },
    { studentName: "Jane Smith", section: "9690", startTime: "9:15", submitTime: "11:00", status: "Submitted" },
    { studentName: "John Doe", section: "2453", startTime: "9:00", submitTime: "10:30", status: "Submitted" },
    { studentName: "Jane Smith", section: "6647", startTime: "9:15", submitTime: "11:00", status: "Yet to attempt" },
  ];
  const columns = [
    { title: "Student Name", key: "studentName" },
    { title: "Section", key: "section" },
    { title: "Start Time", key: "startTime" },
    { title: "Submit Time", key: "submitTime" },
    { title: "Status", key: "status" }
  ];
  
  const skills = ['Submitted', 'Active', 'Yet to attempt'];
  const sections = ['2343', '2424', '7575', '2947'];
  return (
    <div className=' w-full h-full font-body  border border-black '>
        <MenuBar name={"Jawwad Ahmed Farid"} role={"Teacher"}/>
        <div className='w-auto md:h-full flex md:flex-row flex-col-reverse'>
            <SideBar active={"Live Monitoring"}/>
            <div className='w-full '>
                <Subheader name={"Live Monitoring"}/>
                <div className='px-4 pt-4 flex flex-col'>
                  <OverallSummary/>
                </div>
                  <LMTable data={data} columns = {columns} skills = {skills} sections = {sections} />
            </div>   
        </div>
    </div>
  );
}

export default LiveMonitoring;