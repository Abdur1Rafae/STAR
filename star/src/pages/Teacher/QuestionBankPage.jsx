import SearchBar from '../../components/SearchBar';
import QuestionBankCard from '../../components/QuestionBankCard';
import React ,{ useState }from 'react';
import SubmitButton from '../../components/button/SubmitButton';
import { BsBank2 } from "react-icons/bs";


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
        <div className='flex items-center'>
        <div className='m-4'>
            <SubmitButton label = "Question Bank" icon = {<BsBank2 />} />
        </div>
        <div>
            All Questions
        </div>
        </div>
        <hr className="px-8 mt-2 border border-#5F6368 m-2"></hr>

        <div className='w-3/4 m-4'>
        <SearchBar/>
        </div>
        <div className=' grid md:grid-cols-3 gap-x-8 gap-y-4 m-4'>
        <QuestionBankCard/>
        <QuestionBankCard/>
        <QuestionBankCard/>
        <QuestionBankCard/>


        </div>
        
    </div>
  );
}

export default App;
