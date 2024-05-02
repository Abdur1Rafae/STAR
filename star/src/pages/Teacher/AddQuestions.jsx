import React ,{ useState , useEffect, useContext }from 'react';
import MenuBar from '../../components/MenuBar'
import SideBar from '../../components/Teacher/SideBar'
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
import { IoIosMove } from "react-icons/io";
import { ToggleStore } from '../../Stores/ToggleStore';
import { AddQuestion, DeleteQuestion, DeleteReuseQuestion, GetStoredQuestions, UpdateReuseQuestion, UpdateQuestion, AddReuseQuestion } from '../../APIS/Teacher/AssessmentAPI';
import { useParams } from 'react-router';
import { UpdateOrder, GetAllTopics } from '../../APIS/Teacher/AssessmentAPI';


function AddQuestions() {
    const [loading, setLoading] = useState(true)
    const assessmentName = useParams()
    const [creatingQuestion, setCreateQuestion] = useState(null);
    const [reuseDialog, setReuseDialog] = useState(false);
    const [topicList, setTopicList] = useState([])
    const setOrder = ToggleStore((store) => store.setOrder)
    const order = ToggleStore((store) => store.Ordering)


    const { questions, setQuestions, selectedQuestions, saveQuestions, swapQuestion, topicMap, skillMap } = useContext(QuestionContext);

    const SaveQuestions = async() => {
        try{
            const addingQuestionIDS = selectedQuestions.map((question) => question._id)
            const res = await AddReuseQuestion({assessmentId: assessmentName.assessmentId, questions: addingQuestionIDS})
            console.log(res)
            saveQuestions()
            setReuseDialog(false);
        } catch(err) {
            console.log(err)
        }
    }

    const handleSubmitQuestions = () => {
        console.log(questions)
        window.location.assign('/teacher/home')
    }  
    
    useEffect(()=> {
        const getAllQuestions = async() => {
            try{
                const res = await GetStoredQuestions({assessmentId: assessmentName.assessmentId})
                setQuestions(res)
            } catch(err) {
                console.log(err)
                return
            }
        }

        getAllQuestions() 
    }, [])

    useEffect(()=>{
        const GetTopics = async() => {
            try {
                const res = await GetAllTopics()
                setTopicList(res)
                console.log(res)
            } catch(err) {
            console.log(err)
            }
        }

        GetTopics()
    }, [])

    const saveQuestionHandler = async(id, newOptions, questionText, explanationText, imageUrl, skill, difficulty, point, topic, type, correctOptions, isTrue) => {
        const index = questions.length
        const updatedQuestions = index > 0 ? [...questions] : []
        if(type == "MCQ") {
            updatedQuestions[index] = {
                type: type,
                options: newOptions,
                correctOptions: correctOptions,
                question: questionText,
                explanation: explanationText,
                imageUrl: imageUrl,
                skill: skill,
                difficulty: difficulty,
                points: point,
                topic: topic,
                reuse: false
            }
        }
        else if(type == "True/False") {
            updatedQuestions[index] = {
                type: type,
                options: newOptions,
                isTrue: isTrue,
                question: questionText,
                explanation: explanationText,
                imageUrl: imageUrl,
                skill: skill,
                difficulty: difficulty,
                points: point,
                topic: topic,
                reuse: false
            }
        }
        else {
            updatedQuestions[index] = {
                type: type,
                question: questionText,
                explanation: explanationText,
                imageUrl: imageUrl,
                skill: skill,
                difficulty: difficulty,
                points: point,
                topic: topic,
                reuse: false
            }
        }
        try {
            const res = await AddQuestion({assessmentId: assessmentName.assessmentId, question: updatedQuestions[index]})
            updatedQuestions[index]._id = res.insertedId
            setQuestions(updatedQuestions);
        } catch(err) {
            console.log(err)
            return
        }
    };

    const deleteQuestion = async(id) => {
        try{
            const questionToDelete = questions[id]
            if(questionToDelete.reuse) {
                const res = await DeleteReuseQuestion({questionId: questionToDelete._id, assessmentId:assessmentName.assessmentId})
            }
            else {
                const res = await DeleteQuestion({questionId: questionToDelete._id, assessmentId:assessmentName.assessmentId})
            }
            const updatedQuestions = questions.filter((_, index) => index !== id);
            setQuestions(updatedQuestions);
        } catch(err) {
            console.log(err)
        }
    };
        
    const handleCloseQuestionCreator = () => {
        setCreateQuestion(null);
    };

    const updateQuestion = async(index, newOptions, questionText, explanationText, imageUrl, skill, difficulty, point, topic, type, correctOptions, isTrue, reuse) => {
        const updatedQuestions = [...questions];
        if(type == "MCQ") {
            updatedQuestions[index] = {
                _id: updatedQuestions[index]._id,
                type: type,
                options: newOptions,
                correctOptions: correctOptions,
                question: questionText,
                explanation: explanationText,
                imageUrl: imageUrl,
                skill: skill,
                difficulty: difficulty,
                points: point,
                topic: topic,
                reuse: reuse
            }
        }
        else if(type == "True/False") {
            updatedQuestions[index] = {
                _id: updatedQuestions[index]._id,
                type: type,
                options: newOptions,
                isTrue: isTrue,
                question: questionText,
                explanation: explanationText,
                imageUrl: imageUrl,
                skill: skill,
                difficulty: difficulty,
                points: point,
                topic: topic,
                reuse: reuse
            }
        }
        else {
            updatedQuestions[index] = {
                _id: updatedQuestions[index]._id,
                type: type,
                question: questionText,
                explanation: explanationText,
                imageUrl: imageUrl,
                skill: skill,
                difficulty: difficulty,
                points: point,
                topic: topic,
                reuse: reuse
            }
        }

        try {
            if(reuse) {
                const res = await UpdateReuseQuestion({assessmentId: assessmentName.assessmentId, question: updatedQuestions[index]}) 
                updatedQuestions[index].reuse = false
                console.log(res)
            }
            else {
                const res = await UpdateQuestion({id: assessmentName.assessmentId, question: updatedQuestions[index]}) 
                console.log(res)
            }
            setQuestions(updatedQuestions);
        } catch(err) {
            console.log(err)
        }
    }

    const handleOnDrag = (e, id) => {
        e.dataTransfer.setData("question", id)
    }

    const handleOnDrop = (e, id2) => {
        const id1 = e.dataTransfer.getData("question")
        swapQuestion(id1, id2)
    }

    const handleOrdering = async() => {
        const buttons = document.querySelectorAll('.QuestionsDisplay button');
        if(!order) {
            setOrder(true)
            buttons.forEach(button => {
                button.disabled = true;
            });
            console.log(questions)
        }
        else {
            setOrder(false)
            const orderArray = questions.map((question)=>question._id)
            console.log(orderArray)
            try {
                const res = await UpdateOrder({questions: orderArray, assessmentId: assessmentName.assessmentId})
                console.log(res)
            } catch(err) {
                console.log(err)
            }
            buttons.forEach(button => {
                button.disabled = false;
            });
        }
    }


  return (
    <div className=' w-full h-full font-body border-black'>
        <MenuBar name={"Jawwad Ahmed Farid"} role={"Teacher"}/>
        <div className='w-auto md:h-full flex md:flex-row flex-col-reverse'>
            <SideBar active={"Add Questions"}/>
            <div className='w-full '>
                <SubheaderBut name={"Question Set"} button={"Save & Close"} onClick={handleSubmitQuestions}/>
                <div className='flex flex-col-reverse md:flex-row justify-between gap-4 p-4'>
                    <div className='w-full flex flex-col items-center gap-4'>
                        <div className='w-full flex flex-wrap items-start justify-center gap-4'>
                            <div className='border-2 border-dotted border-slate-400'>
                                <button className='w-24 h-24 flex flex-col items-center justify-center gap-1 border-2 border-white hover:border-DarkBlue hover:bg-LightBlue transition-colors duration-300' onClick={()=> setCreateQuestion("MCQ")}>
                                    <img className='w-12 mix-blend-multiply' src={questionMCQ} alt=''/>
                                    <p className='text-xs'>MCQ</p>
                                </button>
                            </div>
                            <div className='border-2 border-dotted border-slate-400'>
                                <button className='w-24 h-24 flex flex-col items-center justify-center gap-1 border-2 border-white hover:border-DarkBlue hover:bg-LightBlue transition-colors duration-300' onClick={()=>setCreateQuestion("Short Answer")}>
                                    <img className='w-12 mix-blend-multiply' src={SAQuestion} alt=''/>
                                    <p className='text-xs'>Short Answer</p>
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
                        <button onClick={handleOrdering} className={`hidden sm:flex self-end text-xs items-center justify-center gap-1 border-[1px] border-black  px-2 py-1 active:shadow-lg ${order ? 'bg-slate-200' : ''}`}>
                            <IoIosMove/>
                            <p>Order</p>
                        </button>
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
                                        <SelectQuestions topics={topicList}/>
                                    </div>   
                                    <div className='absolute border-t-2 border-black left-0 bottom-0 w-full h-12 bg-LightBlue flex justify-center items-center text-white'>
                                        <button className='bg-DarkBlue rounded-md px-2 py-1 min-w-16' onClick={SaveQuestions}>Select</button>
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
                                    topicList={topicList}
                                />
                            )
                        }
                        <div className='QuestionsDisplay w-full flex flex-col gap-2'>
                        {
                            questions.length > 0 ?
                            questions.map((question, index)=> {
                                return (
                                    <div onDrop={(e)=>handleOnDrop(e,index)} onDragOver={(e)=>{e.preventDefault()}} className='border-2 p-3'>
                                        <h4 className='absolute -ml-4 -mt-4 border-black border-[1px] px-1 rounded-full text-xs'>{index+1}</h4>
                                        <StoredQuestion handleDrag={handleOnDrag} deleteHandler={() => deleteQuestion(index)} savingHandler={updateQuestion} topicList={topicList} topic={question.topic} id={index} type={question.type} skill={question.skill} difficulty={question.difficulty} points={question.points} question={question.question} explanation={question.explanation} correctOptions={question.correctOptions} options={question.options} image={question.imageUrl} isTrue={question.isTrue} reuse={question.reuse}/>
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
                                <div className='w-40 flex justify-center'>{questions.length}</div>
                            </div>
                            <div className='flex text-sm mt-2 font-body justify-between'>
                                <h4 className='font-medium w-24'>Total Marks:</h4>
                                <div className='w-40 flex justify-center'>{questions.reduce((totalPoints, question) => totalPoints + question.points, 0)}</div>
                            </div>
                        </div>

                        <hr className= 'my-4 border-black border-[1px]'></hr>

                        <h3 className='font-medium text-sm font-body'>Skills Targetted</h3>
                        <div className='w-full flex flex-wrap pt-2 gap-2 font-medium'>
                            {skillMap.map((skill, index) => (
                                <div key={index} className='w-auto h-8 bg-[#D9EBFF] text-xs p-2 rounded-lg'>
                                    {skill}
                                </div>
                            ))}
                        </div>

                        <hr className= 'my-4 border-black border-[1px]'></hr>
                        
                        <h3 className='font-medium text-sm font-body'>Topics Covered</h3>

                        <div className='mt-2'>
                            <DoughnutGraph inputData={topicMap}/>
                        </div>
                    </div>
                </div>
            </div>    
        </div>
    </div>
  );
}

export default AddQuestions;

             