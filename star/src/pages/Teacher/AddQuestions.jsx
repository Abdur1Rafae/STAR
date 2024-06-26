import React ,{ useState , useEffect, useContext }from 'react';
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
import { ClickOutsideFunc } from '../../components/ClickOutsideFunc';
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import SubmitButton from '../../components/button/SubmitButton';
import { SaveAssessment } from '../../APIS/Student/AssessmentAPI';


const AddQuestions = () => {
    const assessmentName = useParams()
    const [creatingQuestion, setCreateQuestion] = useState(null);
    const [reuseDialog, setReuseDialog] = useState(false);
    const [topicList, setTopicList] = useState([])
    const setOrder = ToggleStore((store) => store.setOrder)
    const order = ToggleStore((store) => store.Ordering)
    
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [indexToDelete, setIndexToDelete] = useState(0)


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

    const modules = {
        toolbar: false
    }; 
    
    useEffect(()=> {
        const getAllQuestions = async() => {
            try{
                const res = await GetStoredQuestions({assessmentId: assessmentName.assessmentId})
                setQuestions(res.questions)
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
                image: imageUrl,
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
                image: imageUrl,
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
                image: imageUrl,
                skill: skill,
                difficulty: difficulty,
                points: point,
                topic: topic,
                reuse: false
            }
        }
        try {
            const res = await AddQuestion({assessmentId: assessmentName.assessmentId, question: updatedQuestions[index]})
            const indexOfTopic = topicList.findIndex((topic)=> topic === updatedQuestions[index].topic)
            if(indexOfTopic == -1) {
                setTopicList((prevTopicList) => [...prevTopicList, updatedQuestions[index].topic]);
            }
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
                image: imageUrl,
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
                image: imageUrl,
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
                image: imageUrl,
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
                const indexOfTopic = topicList.findIndex((topic)=> topic === updatedQuestions[index].topic)
                if(indexOfTopic == -1) {
                    setTopicList((prevTopicList) => [...prevTopicList, updatedQuestions[index].topic]);
                }
                updatedQuestions[index].reuse = false
                console.log(res)
            }
            else {
                const res = await UpdateQuestion({id: assessmentName.assessmentId, question: updatedQuestions[index]})
                const indexOfTopic = topicList.findIndex((topic)=> topic === updatedQuestions[index].topic)
                if(indexOfTopic == -1) {
                    setTopicList((prevTopicList) => [...prevTopicList, updatedQuestions[index].topic]);
                } 
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
        }
        else {
            setOrder(false)
            const orderArray = questions.map((question)=>question._id)
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

    const handleSaveDraft = async() => {
        try{
            const res = await SaveAssessment({id: assessmentName.assessmentId, status: 'Draft', stoppingCriteria: null, totalMarks: null})

            window.location.assign('/teacher/home')
        } catch(err) {
            console.log(err)
        }
    }

    const handleLaunch = async() => {
        try{
            const res = await SaveAssessment({id: assessmentName.assessmentId, status: 'Launched', stoppingCriteria: null, totalMarks: null})

            window.location.assign('/teacher/home')
        } catch(err) {
            console.log(err)
        }
    }

    const [profileDialog, setProfileDialog] = useState(false)

    let saveProfile = ClickOutsideFunc(()=>{
        setProfileDialog(false);
    })


  return (
    <>
            <SideBar/>
            <div className='w-full '>
                <SubheaderBut name={"Question Set"} button={"Save & Close"} onClick={()=>{setProfileDialog(true)}}/>
                <div ref={saveProfile} className={`dialogue top-28 md:top-28 right-4 z-20 absolute rounded-md border-2  bg-LightBlue transition-all ease-out duration-500 ${profileDialog ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}>
                    {profileDialog && (
                        <div className='dropdown-list w-36 md:w-48 flex flex-col items-center font-body'>
                            <div className='h-full w-full flex text-md transition-all duration-200 hover:bg-DarkBlue hover:text-white p-2' onClick={handleSaveDraft}>
                                <button className='text-left'>
                                    <p className='font-medium'>Save as Draft</p>
                                    <p className='text-[10px]'>If not finalized</p>
                                </button>
                            </div>
                            <div className='h-full w-full flex text-md transition-all duration-200 hover:bg-DarkBlue hover:text-white p-2' onClick={handleLaunch}>
                                <button className='text-left'>
                                    <p className='font-medium'>Launch</p>
                                    <p className='text-[10px]'>Finalized and Allow students to view it as upcoming</p>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div className='flex flex-col-reverse md:flex-row justify-between gap-4 p-2 md:p-4'>
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
                        <p className={`text-xs ${order ? '' : 'hidden'}`}>Drag and drop questions in required numbers</p>
                        <button onClick={handleOrdering} className={`${questions.length > 0 ? 'hidden lg:flex' : 'hidden'} self-end text-xs items-center justify-center gap-1 border-[1px] border-black  px-2 py-1 active:shadow-lg ${order ? 'bg-slate-200' : ''}`}>
                            <IoIosMove/>
                            <p> {order ? 'Save Order' : 'Change Order'}</p>
                        </button>
                        {
                        reuseDialog &&
                        <div className='fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-20 z-10 overflow-y-hidden'>       
                            <div className='relative inset-x-0 mx-auto top-10 w-11/12 md:w-11/12 h-5/6 bg-LightBlue z-10 flex flex-col'>
                                <div className='sticky top-0 bg-DarkBlue h-12 w-full flex text-white justify-between z-50'>
                                    <h3 className='my-auto ml-2'>Select Questions to add</h3>
                                    <button className='mr-2' onClick={()=>setReuseDialog(false)}><MdClose className='text-lg'/></button>
                                </div>
                                <div className='overflow-y-auto'>
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
                                    <div key={index} onDrop={(e)=>handleOnDrop(e,index)} onDragOver={(e)=>{e.preventDefault()}} className='border-2 p-1 md:p-3'>
                                        <h4 className='absolute -ml-4 -mt-4 border-black border-[1px] px-1 rounded-full text-xs'>{index+1}</h4>
                                        <StoredQuestion handleDrag={handleOnDrag} deleteHandler={() => {setIndexToDelete(index); setConfirmDelete(true)}} savingHandler={updateQuestion} topicList={topicList} topic={question.topic} id={index} type={question.type} skill={question.skill} difficulty={question.difficulty} points={question.points} question={question.question} explanation={question.explanation} correctOptions={question.correctOptions} options={question.options} image={question.image} isTrue={question.isTrue} reuse={question.reuse}/>
                                    </div>
                                )
                            })
                            : ''
                        }
                        </div>
                    </div>
                    <div className='bg-LightBlue w-full flex-grow md:min-w-64 md:w-3/12 p-2'>
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
                    {
                        confirmDelete &&
                        <div className="fixed mx-auto my-auto bg-opacity-50 inset-0 flex items-center justify-center w-full h-full bg-black">
                            <div className='flex flex-col w-full mx-2 md:mx-0 md:w-2/3 bg-LightBlue overflow-y-auto'>
                                <div className='bg-DarkBlue text-white h-8 w-full px-2 flex items-center justify-between'>
                                    <p>Delete Question</p>
                                    <button onClick={()=>setConfirmDelete(false)}><MdClose/></button>
                                </div>
                                <div className='p-2'>
                                    <div className='mb-4 text-md'>
                                        Are you sure you wish to delete the following Question:
                                    </div>
                                    <div>
                                        <ReactQuill readOnly={true} modules={modules} value={questions[indexToDelete].question} className='w-full text-xs font-body !border-none -p-2'/>
                                    </div>
                                    <div className='mt-2 text-xs font-bold'>
                                        <p>This action cannot be undone!</p>
                                    </div>
                                    <div className='w-full flex justify-center mt-4'>
                                        <SubmitButton label={'Delete'} active={true} onClick={()=>{deleteQuestion(indexToDelete); setConfirmDelete(false)}}/>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    }
                </div>
            </div>    
        </>
  );
}

export default AddQuestions;

             