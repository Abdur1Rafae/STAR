import React, {useState, useEffect} from 'react'
import { IoClose } from "react-icons/io5";
import MCQSetup from './MCQSetup';
import TFSetup from './TFSetup';
import SASetup from './SASetup';
import SkillFilter from './SkillFilter';
import DifficultyFilter from './DifficultyFilter';
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'

const QuestionCreator = ({topicList, type, topic, questionID, savingHandler, closeHandler, question, options, skill, difficultyLevel, points, explanation, image, correctOptions, isTrue, reuse}) => {
    const [selectedSkill, setSelectedSkill] = useState(skill || 'Problem Solving');
    const [selectedDifficulty, setSelectedDifficulty] = useState(difficultyLevel || 'Medium')
    const [newQuestion, setNewQuestion] = useState(question);
    const [newOptions, setNewOptions] = useState(options ? options : []);

    const [newCorrectOptions, setNewCorrectOptions] = useState(correctOptions ? correctOptions : [])
    const [newExplanation, setNewExplanation] = useState(explanation);
    const [newPoints, setNewPoints] = useState(points);
    const [newImage, setNewImage] = useState(image);
    const [topicName, setTopicName] = useState(topic ? topic : '')
    const [isCorrect, setCorrect] = useState(isTrue ?? false)
    const [error, setError] = useState('')

    useEffect(() => {
        setNewOptions(options ? options : []);
        setNewCorrectOptions(correctOptions ? correctOptions : []);
    }, [type]);
    

    const updateOption = (index, newString) => {
        setNewOptions(prevState => {
            const newArray = [...prevState];
            newArray[index] = newString;
            return newArray;
        });
    };

  return (
    <div className='border-black border-[1px] bg-[#EEF3F3] w-full h-auto rounded-lg p-2'>
        <div className='flex justify-between'>
            <h2 className='text-sm font-medium'>{type}</h2>
            <button onClick={closeHandler}><IoClose/></button>
        </div>

        <div className='flex flex-col gap-2 mt-4'>
            <div className='flex gap-2 flex-wrap'>
                <div className='flex flex-col md:flex-row items-center'>
                    <p className='text-xs'>Skill:&nbsp; </p>
                    <SkillFilter selectedSkill={selectedSkill} setSelectSkill={setSelectedSkill} assigning={true}/> 
                </div>
                <div className='flex flex-col md:flex-row items-center'>
                    <p className='text-xs'>Difficulty :&nbsp;</p>
                    <DifficultyFilter selectedLevel={selectedDifficulty} setSelectLevel={setSelectedDifficulty} assigning={true}/>
                </div>
            </div>
            <div className='flex gap-2 flex-wrap'>
                <div className='flex flex-col md:flex-row items-center'>
                    <p className='text-xs'>Topic :&nbsp;</p>
                    <input 
                        value={topicName} 
                        onChange={(e) => setTopicName(e.target.value)} 
                        list="Topics" 
                        type='text' 
                        className='text-xs bg-LightBlue border-black border-[1px] w-44 h-6 rounded-md p-2'
                    />
                    <datalist id="Topics">
                        {topicList.map((topic) => (
                            <option key={topic} value={topic} />
                        ))}
                    </datalist>
                </div>
                <div className='flex flex-col md:flex-row items-center'>
                    <p className='text-xs'>Points :&nbsp;</p>
                    <input value={newPoints} onChange={(e)=> setNewPoints(e.target.value)} type='number' className='bg-LightBlue border-black border-[1px] w-16 h-6 rounded-md p-2'/>
                </div>
            </div>
        </div>

        <h4 className='font-medium text-sm mt-4'>Question</h4>
        <div className='w-full h-40 overflow-y-scroll bg-white border-black border-[1px] mt-2 text-sm'>
        <ReactQuill value={newQuestion}
        onChange={(value)=> setNewQuestion(value)} className='h-28'/>
        </div>
        <div className='mt-2'>
            {type == "MCQ" ? <MCQSetup updateOption={updateOption} correctOptions={newCorrectOptions} setCorrectOption={setNewCorrectOptions} addOption={setNewOptions} options={newOptions} image={newImage} setImage={setNewImage}/> : (type == "True/False" ? <TFSetup options={newOptions} setOptions={setNewOptions} image={newImage} isTrue={isTrue} setIsTrue={setCorrect}/> : <SASetup/>)}
        </div>

        <div className='mt-4'>
            <h4 className='font-medium text-sm'>Explanation</h4>
            <textarea value={newExplanation} onChange={(e)=> setNewExplanation(e.target.value)} className='w-full h-18 border-black border-[1px] mt-2 p-4 text-sm resize-none' placeholder='Enter your explanation'></textarea>
        </div>

        <div className='w-full flex'><button onClick={()=>{
            if(topicName == '') {
                setError('Question needs to be asigned a topic.')
                return
            }
            if(newPoints < 1 || !newPoints){
                setError('Invalid points')
                return
            }
            else {
                console.log("here", newPoints)
            }
            if(newQuestion == ''){
                setError('Empty Question cannot be saved.')
                return
            }
            if(type == "Multiple Choice Question" && newCorrectOptions.length == 0) {
                setError('Select atleast one correct option.')
                return
            }
            setError('')
            try {
                savingHandler(questionID, newOptions, newQuestion, newExplanation, newImage, selectedSkill, selectedDifficulty, parseInt(newPoints), topicName, type, newCorrectOptions, isCorrect, reuse)
                closeHandler()
            } catch(err) {
                console.log(err)
            }
            
        }} 
        className='bg-DarkBlue w-18 text-white text-sm p-2 rounded-md ml-auto'>Save</button></div>
        <div className='w-full flex justify-end mt-2'>
            <p className='text-red-500 text-xs'>{error}</p>
        </div>
    </div>
  )
}

export default QuestionCreator