import React, {useState} from 'react'
import AllTopicsContainer from '../../components/Teacher/AllTopicsContainer'
import CategoryFilter from '../../components/Teacher/CategoryFilter';
import LCSearchBar from '../../components/Teacher/LCSearchBar';

const AllQuestions = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const skills = ['Logic', 'Problem Solving', 'Quantitative Analysis', 'Critical Thinking'];
    const difficulty = ['Easy', 'Medium', 'Difficult', 'Hard'];
    const topics = ['Computer History', 'Calculus', 'Assembly Language']

    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
    };
  return (
    <div className='flex flex-col gap-4 overflow-hidden'>
        <div className='flex md:flex-row flex-col gap-2'>
                <LCSearchBar/>
                <div className='flex flex-wrap md:flex-nowrap gap-2'>
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
        <AllTopicsContainer topic={"History of Computers"}/>
        <AllTopicsContainer topic={"History of Computers"}/>
        <AllTopicsContainer topic={"History of Computers"}/>
    </div>
  )
}

export default AllQuestions