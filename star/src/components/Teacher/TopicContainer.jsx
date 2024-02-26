import React from 'react'
import { useState } from 'react';
import { MdEdit, MdOutlineSettingsBackupRestore, MdClose } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";
import StoredQuestion from './StoredQuestion';
import { LiaSaveSolid } from "react-icons/lia";
import questionMCQ from '../MCQ.png'
import TFQuestion from '../TF.png'
import SAQuestion from '../shortAnswer.png'
import QuestionCreator from './QuestionCreator';
import DisplayOnlyQuestions from './DisplayOnlyQuestions';

const TopicContainer = ({topic, topics, toBeEdited, selectFeature}) => {
    const [display, setDisplay] = useState(false);
    const [topicName, setTopicName] = useState(topic);
    const [newTopic, setNewTopic] = useState(topic);
    const [isEditing, setIsEditing] = useState(toBeEdited);
    const [creatingQuestion, setCreateQuestion] = useState(null);
    const [reuseDialog, setReuseDialog] = useState(false);
    const skills = ['Logic', 'Problem Solving', 'Quantitative Analysis', 'Critical Thinking'];
    const difficulty = ['Easy', 'Medium', 'Hard'];

    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
    }
    const [selectedCategory, setSelectedCategory] = useState('');

    const [questions, setQuestions] = useState(
        [{
            type: "MCQ",
            question: "Who developed the theory of relativity?",
            options: [
              { text: "Isaac Newton", isCorrect: false },
              { text: "Albert Einstein", isCorrect: true },
              { text: "Stephen Hawking", isCorrect: false },
              { text: "Galileo Galilei", isCorrect: false }
            ],
            imageUrl: "https://scitechdaily.com/images/Theory-of-Relativity-Physics-Concept.jpg",
            explanation: "Albert Einstein developed the theory of relativity.",
            skill: "Physics",
            difficulty: "Hard",
            point: 20
          },
          {
            type: "T/F",
            question: "The mitochondria is the powerhouse of the cell.",
            options: [
              { text: "True", isCorrect: true },
              { text: "False", isCorrect: false }
            ],
            imageUrl: null,
            explanation: "True. The mitochondria is known as the powerhouse of the cell.",
            skill: "Biology",
            difficulty: "Medium",
            point: 15
          },
          {
            type: "SA",
            question: "What is the capital of Mongolia?",
            options: [],
            imageUrl: null,
            explanation: "The capital of Mongolia is Ulaanbaatar.",
            skill: "Geography",
            difficulty: "Medium",
            point: 15
          },
          {
            type: "MCQ",
            question: "Which country has the largest population?",
            options: [
              { text: "India", isCorrect: false },
              { text: "United States", isCorrect: false },
              { text: "China", isCorrect: true },
              { text: "Russia", isCorrect: false }
            ],
            imageUrl: null,
            explanation: "China has the largest population.",
            skill: "Geography",
            difficulty: "Medium",
            point: 15
          },
          {
            type: "T/F",
            question: "The Amazon Rainforest produces 20% of the world's oxygen.",
            options: [
              { text: "True", isCorrect: true },
              { text: "False", isCorrect: false }
            ],
            imageUrl: "https://files.worldwildlife.org/wwfcmsprod/images/Amazon_River_New_Hero_Image/hero_full/96jxl0p02y_Amazon_River_Hero.jpg",
            explanation: "True. The Amazon Rainforest is often referred to as the 'lungs of the Earth' as it produces a significant amount of the world's oxygen.",
            skill: "Environmental Science",
            difficulty: "Hard",
            point: 20
          },
          {
            type: "SA",
            question: "What is the formula for calculating the area of a circle?",
            options: [],
            imageUrl: null,
            explanation: "The formula for calculating the area of a circle is A = πr^2, where 'A' is the area and 'r' is the radius of the circle.",
            skill: "Mathematics",
            difficulty: "Hard",
            point: 20
          }])

    const updateQuestion = (index, newOptions, questionText, explanationText, imageUrl, skill, difficulty, point) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].options = newOptions;
        updatedQuestions[index].question = questionText;
        updatedQuestions[index].explanation = explanationText;
        updatedQuestions[index].imageUrl = imageUrl;
        updatedQuestions[index].skill = skill;
        updatedQuestions[index].difficulty = difficulty;
        updatedQuestions[index].point = point;
        setQuestions(updatedQuestions);
    };
    

  return (
    <div className={`bg-LightBlue w-full border-[1px] border-black p-2 px-4 flex flex-col`}>
        <div className='flex justify-between'>
            <div className='flex'>
                <input type='checkbox'></input>
                {
                    isEditing ? 
                    (
                        <>                       
                            <input 
                                autoFocus
                                placeholder='Topic'
                                type='text' 
                                value={newTopic} 
                                onChange={(e) => setNewTopic(e.target.value)} 
                                className='text-sm md:text-md ml-2 bg-LightBlue border-none outline-none'
                                list='topiclist'
                            />
                            
                            <datalist id='topiclist'>
                                {
                                    topics.map(((item, index) => (
                                        <option>{item.name}</option>
                                    )))
                                }
                            </datalist>
                            <button onClick={() => {
                                setTopicName(newTopic);
                                setIsEditing(false);
                            }}><LiaSaveSolid className='text-lg text-gray-400 ml-2 md:mr-0 mr-4'/></button>
                        </>

                    ) 
                    : 
                    (
                        <>
                            <button onClick={() => setIsEditing(true)}><h1 className='text-sm md:text-md ml-2 font-body text-DarkBlue hover:underline'>{topicName}</h1></button>
                        </>
                    )
                }
            </div>
            <button onClick={()=>{setDisplay(!display)}}>
                <FaAngleDown className={`text-xl self-center transition-all duration-200 ease-in-out ${display ? 'rotate-180' : ''}`}/>
            </button>
        </div>
        <div className={`flex flex-col gap-2 transition-all ease-out duration-500 ${display ? 'pt-4' : 'opacity-0 pointer-events-none h-0'}`}>
            <div className='border-dashed border-[1px] border-black w-80 h-28 self-center p-2'>
                <h4 className='text-sm text-center'>Add a question</h4>
                <div className='w-full flex items-end justify-center gap-4 mt-2'>
                    <button className='flex flex-col items-center gap-1 hover:border-2 hover:border-DarkBlue' onClick={()=>setCreateQuestion("Multiple Choice Question")}>
                        <img className='w-12 mix-blend-multiply' src={questionMCQ}/>
                        <p className='text-xs'>MCQ</p>
                    </button>
                    <button className='flex flex-col items-center gap-1 hover:border-2 hover:border-DarkBlue' onClick={()=>setCreateQuestion("Short Question")}>
                        <img className='w-12 mix-blend-multiply' src={SAQuestion}/>
                        <p className='text-xs'>Short Question</p>
                    </button>
                    <button className='flex flex-col items-center gap-1 hover:border-2 hover:border-DarkBlue' onClick={()=>setCreateQuestion("True/False")}>
                        <img className='w-12 mix-blend-multiply' src={TFQuestion}/>
                        <p className='text-xs'>True/False</p>
                    </button>
                    <button className='flex min-w-12 flex-col items-center gap-1 hover:border-2 hover:border-DarkBlue' onClick={()=>setReuseDialog(true)}>
                        <MdOutlineSettingsBackupRestore className='w-full h-full'/>
                        <p className='text-xs'>Reuse</p>
                    </button>
                </div>

            </div>
            {creatingQuestion && 
                <div className={`mt-2`}>
                    <QuestionCreator type={creatingQuestion} closeHandler={()=>setCreateQuestion(null)}/>
                </div>
            }
            {
                questions.map((question, index)=> {
                    return <StoredQuestion savingHandler={updateQuestion} id={index} type={question.type} skill={question.skill} difficulty={question.difficulty} point={question.point} question={question.question} explanation={question.explanation} options={question.options} image={question.imageUrl}/>
                })
            }
            {reuseDialog &&
                <div className='fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-20 z-10'>
                    <div className='relative inset-x-0 mx-auto top-20 w-11/12 md:w-7/12 h-5/6 overflow-y-auto bg-LightBlue z-10'>
                        <div className='bg-DarkBlue h-12 w-full flex text-white justify-between'>
                            <h3 className='my-auto ml-2'>Select Questions to add</h3>
                            <button className='mr-2' onClick={()=>setReuseDialog(false)}><MdClose className='text-lg'/></button>
                        </div>
                        <div className='p-4 flex flex-col gap-4'>
                            <div className='flex gap-4 mb-4'>
                                <div className='flex flex-col md:flex-row items-center'>
                                    <p className='text-xs'>Skill Targeted :&nbsp; </p>
                                    <div className="md:h-6 text-xs h-12 bg-LightBlue border border-black rounded-md hover:border-gray-400 ">
                                        <select
                                            value={selectedCategory}
                                            onChange={(e) => handleSelectCategory(e.target.value)}
                                            className='outline-none bg-LightBlue rounded-md md:h-5 h-11'
                                        >
                                            {skills.map((category, index) => (
                                                <option key={index} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className='flex flex-col md:flex-row items-center'>
                                    <p className='text-xs'>Difficulty :&nbsp;</p>
                                    <div className="md:h-6 text-xs h-12 bg-LightBlue border border-black rounded-md hover:border-gray-400 ">
                                        <select
                                            value={selectedCategory}
                                            onChange={(e) => handleSelectCategory(e.target.value)}
                                            className='outline-none bg-LightBlue rounded-md md:h-5 h-11'
                                        >
                                            {difficulty.map((category, index) => (
                                                <option key={index} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                    </div>  
                                </div>
                            </div>
                            {questions.map((question, index)=> {
                            return <DisplayOnlyQuestions skill={question.skill} difficulty={question.difficulty} point={question.point} question={question.question} explanation={question.explanation} options={question.options} image={question.imageUrl}/>
                            })}
                            {questions.map((question, index)=> {
                                return <DisplayOnlyQuestions skill={question.skill} difficulty={question.difficulty} point={question.point} question={question.question} explanation={question.explanation} options={question.options} image={question.imageUrl}/>
                            })}
                        </div>
                        <div className='sticky border-t-2 border-black left-0 bottom-0 w-full h-12 bg-LightBlue flex justify-center items-center text-white'>
                            <button className='bg-DarkBlue rounded-md p-2 min-w-16'>Save ({8})</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    </div>
  )
}

export default TopicContainer