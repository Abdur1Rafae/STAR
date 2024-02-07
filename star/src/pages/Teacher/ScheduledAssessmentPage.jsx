import AssessmentCard from '../../components/AssessmentCard';
import CategoryFilter from '../../components/CategoryFilter';
import React ,{ useState }from 'react';

function App() {
    const total_assessment = 4;
    const [selectedCategory, setSelectedCategory] = useState('');
    const classes = ['All', 'Technology', 'Science', 'Art', 'Sports'];
    const statuses = ['All', 'In Progress', 'Requires Grading', 'Not Started'];

    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
    };
  return (
    <div>
        <div className='md:flex items center justify-between'>
            <div className='flex'>
            <h1 className='sm:text-xl md:text-2xl  font-semibold mt-6 ml-6 mr-3 mb-2'>All Assessments | </h1>
            <p className='sm:text-xl md:text-2xl font-normal text-black-200 mt-6' >{total_assessment} in total</p>
            </div>
            <div className= 'grid gap-x-0   grid-cols-2 mr-2 '>
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
       
        
        <div className='h-fit grid gap-4 overflow-hidden sm:w-3/5  md:w-auto md:grid-cols-3 m-6'>
            <AssessmentCard status="In Progress" />
            <AssessmentCard status="Requires Grading" />
            <AssessmentCard status="Not Started" />
            <AssessmentCard status="In Progress" />
        </div>

    </div>
  );
}

export default App;
