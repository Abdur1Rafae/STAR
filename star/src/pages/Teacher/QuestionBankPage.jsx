import SearchBar from '../../components/Teacher/SearchBar';
import QuestionBankCard from '../../components/Teacher/QuestionBankCard';
import React ,{ useState }from 'react';
import SubmitButton from '../../components/button/SubmitButton';
import { FaFolderOpen } from "react-icons/fa";
import MenuBar from '../../components/MenuBar'
import SideBar from '../../components/Teacher/SideBar'
import SubheaderBut from '../../components/Teacher/SubheaderBut'
import { GrStorage } from "react-icons/gr";
import TopicContainer from '../../components/Teacher/TopicContainer'
import CategoryFilter from '../../components/Teacher/CategoryFilter';
import LCSearchBar from '../../components/Teacher/LCSearchBar';



function App() {
    const [tab, setTab] = useState('Question Bank')
    const total_assessment = 4;
    const [selectedCategory, setSelectedCategory] = useState('');
    const skills = ['Logic', 'Problem Solving', 'Quantitative Analysis', 'Critical Thinking'];
    const difficulty = ['Easy', 'Medium', 'Difficult', 'Hard'];
    const topics = ['Computer History', 'Calculus', 'Assembly Language']

    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
    };
  return (
    <div className='flex flex-col h-full'>
        <MenuBar name={"Jawwad Ahmed Farid"} role={"Teacher"}/>
        <div className='w-full md:h-full flex md:flex-row flex-col-reverse'>
            <SideBar active={"Library"}/>
            <div className='w-full flex flex-col'>
                <SubheaderBut name={"Library"} button={"New Bank"}/>
                <div className='p-4 md:pl-8 md:pt-4 flex flex-col gap-4 overflow-hidden'>
                    <div className='w-full flex items-center justify-between md:justify-start md:gap-4 pb-2 border-b-2 border-grey-800'>
                        <div className=''>
                            <SubmitButton label = "Question Bank" icon = {<FaFolderOpen />} active={tab == 'Question Bank'} onClick={()=>{setTab("Question Bank")}}/>
                        </div>
                        <div>
                            <SubmitButton label = "All Questions" icon={<GrStorage/>} active={tab !== 'Question Bank'} onClick={()=>{setTab("All Questions")}}/>
                        </div>
                    </div>

                    {
                        tab == "Question Bank" ? 
                        (
                            <div className='flex flex-col gap-4'>
                                <div className='md:w-3/4 w-full'>
                                    <SearchBar/>
                                </div>
                                <div className='flex flex-wrap gap-8'>
                                    <QuestionBankCard/>
                                    <QuestionBankCard/>
                                    <QuestionBankCard/>
                                    <QuestionBankCard/>
                                </div>
                            </div>
                        ) :
                        <div className='flex flex-col gap-4 overflow-hidden'>
                             <div className='flex md:flex-row flex-col'>
                                    <LCSearchBar/>
                                    <div className='flex justify-between'>
                                        <CategoryFilter
                                        categoryName="Skill : All"
                                        categories={skills}
                                        selectedCategory={selectedCategory}
                                        onSelectCategory={handleSelectCategory}
                                        /> 
                                        <CategoryFilter
                                            categoryName="Difficulty : All"
                                            categories={difficulty}
                                            selectedCategory={selectedCategory}
                                            onSelectCategory={handleSelectCategory}
                                        />
                                        <CategoryFilter
                                            categoryName="Topic: All"
                                            categories={topics}
                                            selectedCategory={selectedCategory}
                                            onSelectCategory={handleSelectCategory}
                                        /> 
                                    </div>
                            </div>
                            <TopicContainer topic={"History of Computers"}/>
                            <TopicContainer topic={"History of Computers"}/>
                            <TopicContainer topic={"History of Computers"}/>
                        </div>
                    }

        
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
