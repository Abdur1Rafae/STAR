import AssessmentCard from '../../components/Teacher/AssessmentCard';
import CategoryFilter from '../../components/Teacher/CategoryFilter';
import React ,{ useState }from 'react';
import MenuBar from '../../components/MenuBar'
import SideBar from '../../components/Teacher/SideBar'
import SubheaderBut from '../../components/Teacher/SubheaderBut'

function App() {
    const total_assessment = 4;
    const [selectedCategory, setSelectedCategory] = useState('');
    const classes = ['All', 'Technology', 'Science', 'Art', 'Sports'];
    const statuses = ['All', 'In Progress', 'Requires Grading', 'Not Started'];

    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
    };
  return (
    <div className='flex flex-col h-full'>
        <MenuBar name={"Jawwad Ahmed Farid"} role={"Teacher"}/>
        <div className='w-full md:h-full flex md:flex-row flex-col-reverse'>
            <SideBar active={"Schedule"}/>
            <div className='w-full flex flex-col'>
                <SubheaderBut name={"Scheduled Assessments"} button={"New"}/>
                <div className='p-4 md:pl-8 md:pt-8 flex flex-col gap-4 overflow-hidden'>
                    <div className='md:flex items-center justify-between'>
                        <div className='flex items-center font-body'>
                            <h1 className='sm:text-xl md:text-2xl font-medium border-r-2 border-black pr-2'>All Assessments </h1>
                            <p className='sm:text-md md:text-lg font-normal text-gray-400 ml-2 h-full mt-1' >{total_assessment} in total</p>
                        </div>
                        <div className= 'flex gap-4 mt-4 md:mt-0'>
                            <p className='text-sm self-center font-normal font-body text-gray-400 h-full' >Filter by:</p>
                            <CategoryFilter
                                    categoryName="Class"
                                    categories={classes}
                                    selectedCategory={selectedCategory}
                                    onSelectCategory={handleSelectCategory}
                                /> 
                            <CategoryFilter
                                categoryName="Status"
                                categories={statuses}
                                selectedCategory={selectedCategory}
                                onSelectCategory={handleSelectCategory}
                            /> 
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-6'>
                        <AssessmentCard status="In Progress" />
                        <AssessmentCard status="Requires Grading" />
                        <AssessmentCard status="Not Started" />
                        <AssessmentCard status="In Progress" />
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
