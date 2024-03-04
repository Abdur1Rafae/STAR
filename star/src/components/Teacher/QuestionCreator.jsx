import React, {useState, useEffect} from 'react'
import { IoClose } from "react-icons/io5";
import CategoryFilter from './CategoryFilter';
import MCQSetup from './MCQSetup';
import TFSetup from './TFSetup';
import SASetup from './SASetup';

const QuestionCreator = ({type, questionID, savingHandler, closeHandler, question, options, skill, difficultyLevel, point, explanation, image}) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const skills = ['Logic', 'Problem Solving', 'Quantitative Analysis', 'Critical Thinking'];
    const difficulty = ['Easy', 'Medium', 'Hard'];

    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
    }

    const [newQuestion, setNewQuestion] = useState(question);
    const [newOptions, setNewOptions] = useState(options ? JSON.parse(JSON.stringify(options)) : []);
    const [newExplanation, setNewExplanation] = useState(explanation);
    const [newPoints, setNewPoints] = useState(point);
    const [newSkill, setNewSkill] = useState(skill);
    const [newDifficulty, setNewDifficulty] = useState(difficultyLevel);
    const [newImage, setNewImage] = useState(image);

  return (
    <div className='border-black border-[1px] bg-[#EEF3F3] w-full h-auto rounded-lg p-2'>
        <div className='flex justify-between'>
            <h2 className='text-sm font-medium'>{type}</h2>
            <button onClick={closeHandler}><IoClose/></button>
        </div>

        <div className='flex flex-col md:flex-row items-start md:items-center gap-4 mt-4'>
            <div className='flex flex-col md:flex-row items-center'>
                <p className='text-xs'>Skill Targeted :&nbsp; </p>
                <CategoryFilter
                    categoryName={skill ? skill : "Logic"}
                    categories={skills}
                    selectedCategory={selectedCategory}
                    onSelectCategory={handleSelectCategory}
                /> 
            </div>
            <div className='flex flex-col md:flex-row items-center'>
                <p className='text-xs'>Difficulty :&nbsp;</p>
                <CategoryFilter
                    categoryName={difficultyLevel ? difficultyLevel : "Difficult"}
                    categories={difficulty}
                    selectedCategory={selectedCategory}
                    onSelectCategory={handleSelectCategory}
                />  
            </div>
            <div className='flex flex-col md:flex-row items-center'>
                <p className='text-xs'>Points :&nbsp;</p>
                <input value={newPoints} onChange={(e)=> setNewPoints(e.target.value)} type='number' className='bg-LightBlue border-black border-[1px] w-16 h-8 rounded-md p-2'/>
            </div>
        </div>

        <textarea value={newQuestion} onChange={(e)=> setNewQuestion(e.target.value)} className='w-full h-32 border-black border-[1px] mt-2 p-4 text-sm resize-none' placeholder='Enter your Question'></textarea>

        <div className='mt-2'>
            {type == "Multiple Choice Question" ? <MCQSetup options={newOptions} image={newImage} setImage={setNewImage}/> : (type == "True/False" ? <TFSetup options={newOptions} image={newImage}/> : <SASetup/>)}
        </div>

        <div className='mt-4'>
            <h4 className='font-medium text-sm'>Explanation</h4>
            <textarea value={newExplanation} onChange={(e)=> setNewExplanation(e.target.value)} className='w-full h-18 border-black border-[1px] mt-2 p-4 text-sm resize-none' placeholder='Enter your explanation'></textarea>
        </div>

        <div className='w-full flex'><button onClick={()=>{
            savingHandler(questionID, newOptions, newQuestion, newExplanation, newImage, newSkill, newDifficulty, newPoints)
            console.log(newImage)
            closeHandler()
        }} 
        className='bg-DarkBlue w-18 text-white text-sm p-2 rounded-md ml-auto'>Save</button></div>
    </div>
  )
}

export default QuestionCreator