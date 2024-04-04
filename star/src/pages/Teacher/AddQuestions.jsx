import React ,{ useState , useEffect, useContext }from 'react';
import MenuBar from '../../components/MenuBar'
import SideBar from '../../components/Teacher/SideBar'
import Subheader from '../../components/Teacher/Subheader'
import { MdOutlineSettingsBackupRestore ,MdClose } from 'react-icons/md';
import { DoughnutGraph } from '../../components/Teacher/DoughnutGraph';
import questionMCQ from '../../components/MCQ.png'
import TFQuestion from '../../components/TF.png'
import SAQuestion from '../../components/shortAnswer.png'
import StoredQuestion from '../../components/Teacher/StoredQuestion';
import QuestionCreator from '../../components/Teacher/QuestionCreator';
import { QuestionContext } from '../../Context/QuestionsContext';
import SelectQuestions from '../../components/Teacher/SelectQuestions';
import SubheaderBut from '../../components/Teacher/SubheaderBut';

function AddQuestions() {
    const [topics, setTopics] = useState([{name: "Differentiation", value: 8}, {name: "Integration", value: 5}, {name: "History of Computers", value: 12}])
    const skills = ["Problem Solving", "Logic Design", "Quantitative Analysis", "Critical Thinking"]
    const [creatingQuestion, setCreateQuestion] = useState(null);
    const [reuseDialog, setReuseDialog] = useState(false);



    const { questions, setQuestions, saveQuestions, swapQuestion } = useContext(QuestionContext);

    const SaveQuestions = () => {
        saveQuestions()
        setReuseDialog(false);
    }

    const handleSubmitQuestions = () => {
        console.log(questions)
    }    

    const saveQuestionHandler = (id, newOptions, questionText, explanationText, imageUrl, skill, difficulty, point, topic, type) => {
        const index = questions.length
        const updatedQuestions = [...questions];
        updatedQuestions[index] = {
            type: type,
            options: newOptions,
            question: questionText,
            explanation: explanationText,
            imageUrl: imageUrl,
            skill: skill,
            difficulty: difficulty,
            point: point,
            topic: topic,
            reuse: false
        }
        setQuestions(updatedQuestions);
    };

    const deleteQuestion = (id) => {
        const updatedQuestions = questions.filter((_, index) => index !== id);
        setQuestions(updatedQuestions);
    };
        
    const handleCloseQuestionCreator = () => {
        setCreateQuestion(null);
    };

    const updateQuestion = (index, newOptions, questionText, explanationText, imageUrl, skill, difficulty, point, type) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index] = {
            type: type,
            options: newOptions,
            question: questionText,
            explanation: explanationText,
            imageUrl: imageUrl,
            skill: skill,
            difficulty: difficulty,
            point: point,
            reuse: false
        }
        setQuestions(updatedQuestions);
    }

    const handleOnDrag = (e, id) => {
        e.dataTransfer.setData("question", id)
    }

    const handleOnDrop = (e, id2) => {
        const id1 = e.dataTransfer.getData("question")
        swapQuestion(id1, id2)
    }


  return (
    <div className=' w-full h-full font-body border-black'>
        <MenuBar name={"Jawwad Ahmed Farid"} role={"Teacher"}/>
        <div className='w-auto md:h-full flex md:flex-row flex-col-reverse'>
            <SideBar active={"Add Questions"}/>
            <div className='w-full '>
                <SubheaderBut name={"Add Questions"} button={"Save & Close"} onClick={handleSubmitQuestions}/>
                <div className='flex flex-col-reverse md:flex-row justify-between gap-4 p-4'>
                    <div className='w-full flex flex-col items-center gap-4'>
                        <div className='w-full flex flex-wrap items-start justify-center gap-4'>
                            <div className='border-2 border-dotted border-slate-400'>
                                <button className='w-24 h-24 flex flex-col items-center justify-center gap-1 border-2 border-white hover:border-DarkBlue hover:bg-LightBlue transition-colors duration-300' onClick={()=> setCreateQuestion("Multiple Choice Question")}>
                                    <img className='w-12 mix-blend-multiply' src={questionMCQ} alt=''/>
                                    <p className='text-xs'>MCQ</p>
                                </button>
                            </div>
                            <div className='border-2 border-dotted border-slate-400'>
                                <button className='w-24 h-24 flex flex-col items-center justify-center gap-1 border-2 border-white hover:border-DarkBlue hover:bg-LightBlue transition-colors duration-300' onClick={()=>setCreateQuestion("Short Question")}>
                                    <img className='w-12 mix-blend-multiply' src={SAQuestion} alt=''/>
                                    <p className='text-xs'>Short Question</p>
                                </button>
                            </div>
                            <div className='border-2 border-dotted border-slate-400'>
                                <button className='w-24 h-24 flex flex-col items-center justify-center gap-1 border-2 border-white hover:border-DarkBlue hover:bg-LightBlue transition-colors duration-300' onClick={()=>setCreateQuestion("True/False")}>
                                    <img className='w-12 mix-blend-multiply' src={TFQuestion} alt=''/>
                                    <p className='text-xs mt-1'>True/False</p>
                                </button>
                            </div>
                            <div className='border-2 border-dotted border-slate-400'>
                                <button className='w-24 h-24 flex flex-col items-center justify-center border-2 border-white hover:border-DarkBlue hover:bg-LightBlue transition-colors duration-300' onClick={()=>setReuseDialog(true)}>
                                    <MdOutlineSettingsBackupRestore className=' w-12 h-12'/>
                                    <p className='text-xs mt-1'>Reuse</p>
                                </button>
                            </div>
                        </div>
                        {
                        reuseDialog &&
                        <div className='fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-20 z-10 overflow-y-hidden'>       
                            <div className='relative inset-x-0 mx-auto top-10 w-11/12 md:w-7/12 h-5/6 bg-LightBlue z-10 flex flex-col'>
                                <div className='sticky top-0 bg-DarkBlue h-12 w-full flex text-white justify-between z-50'>
                                    <h3 className='my-auto ml-2'>Select Questions to add</h3>
                                    <button className='mr-2' onClick={()=>setReuseDialog(false)}><MdClose className='text-lg'/></button>
                                </div>
                                <div className='overflow-y-auto no-scrollbar'>
                                    <div className='h-full flex flex-col gap-4'>
                                        <SelectQuestions/>
                                    </div>   
                                    <div className='absolute border-t-2 border-black left-0 bottom-0 w-full h-12 bg-LightBlue flex justify-center items-center text-white'>
                                        <button className='bg-DarkBlue rounded-md px-2 py-1 min-w-16' onClick={SaveQuestions}>Save ({8})</button>
                                    </div>            
                                </div>
                            </div>
                        </div>
                        }

                        {
                            creatingQuestion && (
                                <QuestionCreator
                                    type={creatingQuestion}
                                    closeHandler={handleCloseQuestionCreator}
                                    savingHandler={saveQuestionHandler}
                                />
                            )
                        }
                        <div className='w-full flex flex-col gap-2'>
                        {
                            questions ?
                            questions.map((question, index)=> {
                                return (
                                    <div onDrop={(e)=>handleOnDrop(e,index)} onDragOver={(e)=>{e.preventDefault()}} className='border-2 p-3'>
                                        <h4 className='absolute -ml-4 -mt-4 border-black border-[1px] px-1 rounded-full text-xs'>{index+1}</h4>
                                        <StoredQuestion handleDrag={handleOnDrag} deleteHandler={() => deleteQuestion(index)} savingHandler={updateQuestion} id={index} type={question.type} skill={question.skill} difficulty={question.difficulty} point={question.point} question={question.question} explanation={question.explanation} options={question.options} image={question.imageUrl}/>
                                    </div>
                                )
                            })
                            : ''
                        }
                        </div>
                    </div>
                    <div className='bg-LightBlue w-full md:min-w-72 md:w-3/12 p-4'>
                        <div className='w-full ml-1'>
                            <div className='flex text-sm font-body w-full justify-between'>
                                <h4 className='font-medium w-24'>Questions:</h4>
                                <div className='w-40 flex justify-center'>10</div>
                            </div>
                            <div className='flex text-sm mt-2 font-body justify-between'>
                                <h4 className='font-medium w-24'>Total Marks:</h4>
                                <div className='w-40 flex justify-center'>30</div>
                            </div>
                        </div>

                        <hr className= 'my-4 border-black border-[1px]'></hr>

                        <h3 className='font-medium text-sm font-body'>Skills Targetted</h3>
                        <div className='w-full flex flex-wrap pt-2 gap-2 font-medium'>
                            {skills.map((skill, index) => (
                                <div key={index} className='w-auto h-8 bg-[#D9EBFF] text-xs p-2 rounded-lg'>
                                    {skill}
                                </div>
                            ))}
                        </div>

                        <hr className= 'my-4 border-black border-[1px]'></hr>
                        
                        <h3 className='font-medium text-sm font-body'>Topics Covered</h3>

                        <div className='mt-2'>
                            <DoughnutGraph inputData={topics}/>
                        </div>
                    </div>
                </div>
            </div>    
        </div>
    </div>
  );
}

export default AddQuestions;

             