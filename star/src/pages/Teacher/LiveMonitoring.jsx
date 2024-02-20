import React ,{ useState }from 'react';
import MenuBar from '../../components/MenuBar'
import SideBar from '../../components/Teacher/SideBar'
import Subheader from '../../components/Teacher/Subheader'
import OverallSummary from '../../components/Teacher/OverallSummary'
import LCSearchBar from '../../components/Teacher/LCSearchBar';
import CategoryFilter from '../../components/Teacher/CategoryFilter';
import LMTable from '../../components/Teacher/LMTable'


function LiveMonitoring() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const skills = ['Logic', 'Problem Solving', 'Quantitative Analysis', 'Critical Thinking'];
    const difficulty = ['Easy', 'Medium', 'Difficult', 'Hard'];
    const data = [
        { studentName: "Muhammad Maaz Arasalan Batla", section: "A", startTime: "9:00 AM", submitTime: "10:30 AM", status: "Submitted" },
        { studentName: "Jane Smith", section: "B", startTime: "9:15 AM", submitTime: "11:00 AM", status: "Submitted" },
        { studentName: "John Doe", section: "A", startTime: "9:00 AM", submitTime: "10:30 AM", status: "Submitted" },
        { studentName: "Jane Smith", section: "B", startTime: "9:15 AM", submitTime: "11:00 AM", status: "Submitted" },
        { studentName: "John Doe", section: "A", startTime: "9:00 AM", submitTime: "10:30 AM", status: "Submitted" },
        { studentName: "Jane Smith", section: "B", startTime: "9:15 AM", submitTime: "11:00 AM", status: "Submitted" },
        // Add more rows as needed
      ];
    const handleSelectCategory = (category) => {
        setSelectedCategory(category);}

  return (
    <div className='flex flex-col h-full font-body'>
        <MenuBar name={"Jawwad Ahmed Farid"} role={"Teacher"}/>
        <div className='w-full md:h-full flex md:flex-row flex-col-reverse'>
            <SideBar active={"Live Monitoring"}/>
            <div className='w-full flex flex-col'>
                <Subheader name={"Live Monitoring"}/>
                <div className='px-4 pt-4'>
                    <OverallSummary/>
                </div>
                <div className = 'mx-4 flex gap-2 w-11/12'>
                    <LMTable data = {data} />
                </div>
            </div>
                
        </div>
    </div>
  );
}

export default LiveMonitoring;
