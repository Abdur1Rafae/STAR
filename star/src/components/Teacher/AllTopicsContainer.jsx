import React from 'react'
import { useState } from 'react';
import { MdEdit, MdOutlineSettingsBackupRestore, MdClose, MdOutlineDeleteOutline } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";
import StoredQuestion from './StoredQuestion';
import { LiaSaveSolid } from "react-icons/lia";
import questionMCQ from '../MCQ.png'
import TFQuestion from '../TF.png'
import SAQuestion from '../shortAnswer.png'
import QuestionCreator from './QuestionCreator';
import DisplayOnlyQuestions from './DisplayOnlyQuestions';

const AllTopicsContainer = ({topic, topics, toBeEdited}) => {
    const [display, setDisplay] = useState(false);
    const [topicName, setTopicName] = useState(topic);
    const [newTopic, setNewTopic] = useState(topic);
    const [isEditing, setIsEditing] = useState(toBeEdited);
    const [creatingQuestion, setCreateQuestion] = useState(null);

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
    <div className={`bg-LightBlue w-full md:w-9/12 border-[1px] border-black p-2 px-4 flex flex-col`}>
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
                            }}><LiaSaveSolid className='text-lg text-gray-400 ml-2 md:mr-0 mr-4 hover:text-DarkBlue'/></button>
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
            <div className='flex items-center'>
                <button onClick={()=>{}}>
                    <MdOutlineDeleteOutline className='text-lg hover:text-red-400 mr-2'/>
                </button>
                <button onClick={()=>{setDisplay(!display)}}>
                    <FaAngleDown className={`text-xl self-center transition-all duration-200 ease-in-out ${display ? 'rotate-180' : ''}`}/>
                </button>
            </div>
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
        </div>
    </div>
  )
}

export default AllTopicsContainer