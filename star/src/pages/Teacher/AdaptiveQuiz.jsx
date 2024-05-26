import React ,{ useState , useEffect, useContext }from 'react';
import SideBar from '../../components/Teacher/SideBar'
import { MdOutlineSettingsBackupRestore ,MdClose } from 'react-icons/md';
import { DoughnutGraph } from '../../components/Teacher/DoughnutGraph';
import questionMCQ from '../../components/MCQ.png'
import TFQuestion from '../../components/TF.png'
import HorizontalProgressBar from '../../components/Student/course/HorizontalProgressBar';
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
import { DraftAssessment, LaunchAssessment } from '../../APIS/Student/AssessmentAPI';
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import SubmitButton from '../../components/button/SubmitButton';


const AdaptiveQuiz = () => {
    const assessmentName = useParams()
    const [creatingQuestion, setCreateQuestion] = useState(null);
    const [reuseDialog, setReuseDialog] = useState(false);
    const [topicList, setTopicList] = useState([])
    const setOrder = ToggleStore((store) => store.setOrder)
    const order = ToggleStore((store) => store.Ordering)
    
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [indexToDelete, setIndexToDelete] = useState(0)
    const [questionCount, setQuestionCount] = useState(5)
    const [totalMarks, setTotalMarks] = useState(1)
    const [easyCount, setEasyCount] = useState(0)
    const [mediumCount, setMediumCount] = useState(0)
    const [hardCount, setHardCount] = useState(0)

    const [mineasyCount, setMinEasyCount] = useState(0)
    const [minmediumCount, setMinMediumCount] = useState(0)
    const [minhardCount, setMinHardCount] = useState(0)
    const [showError, setShowError] = useState(false)
    const [error, setError] = useState('')
    const [hovered, setHovered] = useState(null);


    const { questions, setQuestions, selectedQuestions, saveQuestions, swapQuestion, topicMap, skillMap } = useContext(QuestionContext);

    useEffect(()=>{
        let easy = 0;
        let medium = 0;
        let hard = 0;

        questions.forEach((question) => {
            if(question.difficulty == 'Hard') {
                hard++;
            }
            else if(question.difficulty == 'Medium') {
                medium++;
            }
            else {
                easy++
            }
        })

        setMediumCount(medium)
        setEasyCount(easy)
        setHardCount(hard)
    }, [questions])

    useEffect(()=> {
        setMinEasyCount(questionCount)
        setMinMediumCount(questionCount - 1)
        setMinHardCount(questionCount - 2)
    }, [questionCount])

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

    const handleQuestionCountInput = (e) => {
        const inputValue = e.target.value;

        if (/^\d*$/.test(inputValue)) {
            setQuestionCount(inputValue);
        }
    }

    const handleQuestionCountBlur = () => {
        const numericValue = Number(questionCount);
        if (numericValue < 5) {
            setQuestionCount(5);
        } else {
            setQuestionCount(numericValue);
        }
    };

    const handleMarksInput = (e) => {
        if (!/^\d*$/.test(e.target.value)) return;

        setTotalMarks(e.target.value)
    }

    const handleMarksBlur = () => {
        const numericValue = Number(totalMarks);
        if (numericValue < 1) {
            setTotalMarks(1);
        } else {
            setTotalMarks(numericValue);
        }
    };

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

    const handleSaveDraft = async() => {
        try{
            const res = await DraftAssessment({id: assessmentName.assessmentId})

            window.location.assign('/teacher/home')
        } catch(err) {
            console.log(err)
        }
    }

    const handleLaunch = async() => {
        setProfileDialog(false)
        if(questionCount < 5) {
            setShowError(true)
            setError('Minimum 5 question attempts should be allowed to students to ensure unbiasness.')
            return
        }
        if(totalMarks < 1) {
            setShowError(true)
            setError('Each student final score will be scaled to be out of total mark you set. Kindly set a number greater than 1 for meaningful results.')
            return
        }
        if(mineasyCount > easyCount || minhardCount > hardCount || minmediumCount > mediumCount) {
            setShowError(true)
            setError('Kindly fulfill minimum question count requirement for each difficulty.')
            return
        }
        setError('')
        setShowError(false)
        try{
            const res = await LaunchAssessment({id: assessmentName.assessmentId})

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
                        <div className='dropdown-list w-36 md:w-48 flex flex-col items-center'>
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
                        <div className=''>
                            <p className='self-start font-medium font-body'>Number of Questions per Difficulty</p>
                            <p className='text-sm font-body'>To ensure we have enough questions to deliver an adaptive assessment experience, please add the specified number of questions or more for each difficulty level. This will allow the system to adjust the difficulty of the questions based on the user's performance.</p>
                            <div className='mt-4 flex justify-around font-body'>
                                <div className='w-1/5'>
                                    <p className='text-xs font-semibold'>Easy&nbsp;(min. {mineasyCount})</p>
                                    <div className=' flex flex-col'>
                                        <HorizontalProgressBar Score={isNaN(Math.round(easyCount/mineasyCount * 100)) ? 0 : Math.min(Math.round(easyCount/mineasyCount * 100), 100)} Color={'#62C6FF'} cond={true}/>
                                    </div>
                                </div>
                                <div className='w-1/5'>
                                    <p className='text-xs font-semibold'>Medium&nbsp;(min. {minmediumCount})</p>
                                    <div className=' flex flex-col'>
                                        <HorizontalProgressBar Score={isNaN(Math.round(mediumCount/minmediumCount * 100)) ? 0 : Math.min(Math.round(mediumCount/minmediumCount * 100), 100)} Color={'#62C6FF'} cond={true}/>
                                    </div>
                                </div>
                                <div className='w-1/5'>
                                    <p className='text-xs font-semibold'>Hard&nbsp;(min. {minhardCount})</p>
                                    <div className=' flex flex-col'>
                                        <HorizontalProgressBar Score={isNaN(Math.round(hardCount/minhardCount * 100)) ? 0 : Math.min(Math.round(hardCount/minhardCount * 100), 100)} Color={'#62C6FF'} cond={true}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex flex-wrap items-start justify-center gap-4 border-t-2 pt-2'>
                            <div className='border-2 border-dotted border-slate-400'>
                                <button className='w-24 h-24 flex flex-col items-center justify-center gap-1 border-2 border-white hover:border-DarkBlue hover:bg-LightBlue transition-colors duration-300' onClick={()=> setCreateQuestion("MCQ")}>
                                    <img className='w-12 mix-blend-multiply' src={questionMCQ} alt=''/>
                                    <p className='text-xs'>MCQ</p>
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
                            <div className='relative inset-x-0 mx-auto top-10 w-11/12 md:w-11/12 h-5/6 bg-LightBlue z-10 flex flex-col'>
                                <div className='sticky top-0 bg-DarkBlue h-12 w-full flex text-white justify-between z-50'>
                                    <h3 className='my-auto ml-2'>Select Questions to add</h3>
                                    <button className='mr-2' onClick={()=>setReuseDialog(false)}><MdClose className='text-lg'/></button>
                                </div>
                                <div className='overflow-y-auto'>
                                    <p className='ml-4 text-xs mt-2 font-bold'>Points are irrelevant. All easy questions are of 1 point, medium of 2 points and hard of 3 points.</p>
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
                                    <div key={index} className='border-2 p-1 md:p-3'>
                                        <h4 className='absolute -ml-4 -mt-4 border-black border-[1px] px-1 rounded-full text-xs'>{index+1}</h4>
                                        <StoredQuestion deleteHandler={() => {setIndexToDelete(index); setConfirmDelete(true)}} savingHandler={updateQuestion} topicList={topicList} topic={question.topic} id={index} type={question.type} skill={question.skill} difficulty={question.difficulty} points={question.points} question={question.question} explanation={question.explanation} correctOptions={question.correctOptions} options={question.options} image={question.image} isTrue={question.isTrue} reuse={question.reuse} noPoints={true}/>
                                    </div>
                                )
                            })
                            : ''
                        }
                        </div>
                    </div>
                    <div className='bg-LightBlue w-full flex-grow md:min-w-64 md:w-3/12 p-2'>
                        <div className='w-full'>
                            <div className='flex text-sm font-body w-full justify-between items-center'>
                                <h4 className='font-medium w-24'>Questions:</h4>
                                <div className='w-40 flex justify-end'><input autoFocus type='text' value={questionCount} onBlur={handleQuestionCountBlur} onChange={(e)=> handleQuestionCountInput(e)} className='px-2 w-12 border-[1px] border-black'/></div>
                            </div>
                            <p className='text-[10px] font-body mt-1'>The number of questions you want each student to attempt.(min. 5)</p>
                            <div className='flex text-sm mt-2 font-body justify-between'>
                                <h4 className='font-medium w-24'>Total Marks:</h4>
                                <div className='w-40 flex justify-end'><input type='text' value={totalMarks} onBlur={handleMarksBlur} onChange={(e) => handleMarksInput(e)} className='px-2 w-12 border-[1px] border-black'/></div>
                            </div>
                            <p className='text-[10px] font-body mt-1'>Each student's score will be scaled to match the total marks you enter.</p>
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
                {
                    showError &&
                    <div className="fixed mx-auto my-auto bg-opacity-50 inset-0 flex items-center justify-center w-full h-full bg-black font-body">
                        <div className='flex flex-col w-full mx-2 md:mx-0 md:w-1/2 bg-LightBlue overflow-y-auto'>
                            <div className='bg-DarkBlue text-white h-8 w-full px-2 flex items-center justify-between'>
                                <p>Launch Error</p>
                                <button onClick={()=>setShowError(false)}><MdClose/></button>
                            </div>
                            <div className='p-2'>
                                <p className='text-md'>Adaptive Assessment could not be launched.</p>
                                <p className='text-sm mt-2'>{error}</p>
                                <p className='text-xs text-gray-400 mt-4'>You can still save it as draft.</p>
                            </div>
                        </div>
                    </div>
                }
            </div>    
        </>
  );
}

export default AdaptiveQuiz;

             