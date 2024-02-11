import React ,{ useState }from 'react';
import MenuBar from '../../components/MenuBar'
import SideBar from '../../components/Teacher/SideBar'
import SubheaderBut from '../../components/Teacher/SubheaderBut'
import OverallSummary from '../../components/Teacher/OverallSummary'
import LCSearchBar from '../../components/Teacher/LCSearchBar';
import CategoryFilter from '../../components/Teacher/CategoryFilter';
import LMTable from '../../components/Teacher/LMTable'


function App() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const skills = ['Logic', 'Problem Solving', 'Quantitative Analysis', 'Critical Thinking'];
    const difficulty = ['Easy', 'Medium', 'Difficult', 'Hard'];
    const topics = ['Computer History', 'Calculus', 'Assembly Language']
    const data = [
        { studentName: "John Doe", section: "A", startTime: "9:00 AM", submitTime: "10:30 AM", status: "Submitted" },
        { studentName: "Jane Smith", section: "B", startTime: "9:15 AM", submitTime: "11:00 AM", status: "Submitted" },
        // Add more rows as needed
      ];
    const handleSelectCategory = (category) => {
        setSelectedCategory(category);}

  return (
    <div className='flex flex-col h-full'>
        <MenuBar name={"Jawwad Ahmed Farid"} role={"Teacher"}/>
        <div className='w-full md:h-full flex md:flex-row flex-col-reverse'>
            <SideBar active={"Live Monitoring"}/>
            <div className='w-full flex flex-col'>
                <SubheaderBut name={"Library"} button={"New Bank"}/>
                <div className='p-4 md:pl-8 md:pt-4  flex flex-col gap-4 overflow-hidden'>
                    <OverallSummary/>
                </div>
                <div className='md:flex justify-between'>
                    <div  className='w-full p-4 md:pl-8 md:pt-4'>
                        <LCSearchBar/>
                    </div>
                    <div className='flex m-4'>
                        <div className = "mr-2"> 
                            <CategoryFilter
                            categoryName="Skill : All"
                            categories={skills}
                            selectedCategory={selectedCategory}
                            onSelectCategory={handleSelectCategory}
                            
                            /> 
                        </div>
                    <div>    
                        <CategoryFilter
                            categoryName="Difficulty : All"
                            categories={difficulty}
                            selectedCategory={selectedCategory}
                            onSelectCategory={handleSelectCategory}
                        />
                    </div>    
                    </div>
                </div>
                <div className = 'm-4'>
                    <LMTable data = {data} />
                </div>
                </div>
                
        </div>
    </div>
  );
}

export default App;
