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
import SkillFilter from '../../components/Teacher/SkillFilter';
import DisplayOnlyQuestions from '../../components/Teacher/DisplayOnlyQuestions';
import { FaFolderOpen } from "react-icons/fa";
import { GrStorage } from "react-icons/gr";
import SubmitButton from '../../components/button/SubmitButton';
import { QuestionContext } from '../../Context/QuestionsContext';
import QuestionBankSelection from '../../components/Teacher/QuestionBankSelection';

function AddQuestions({}) {
    const [topics, setTopics] = useState([{name: "Differentiation", value: 8}, {name: "Integration", value: 5}, {name: "History of Computers", value: 12}])
    const skills = ["Problem Solving", "Logic Design", "Quantitative Analysis", "Critical Thinking"]
    const difficulty = ['Easy', 'Medium', 'Hard'];
    const [creatingQuestion, setCreateQuestion] = useState(null);
    const [reuseDialog, setReuseDialog] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState("Logic")
    const [selectedCategory, setSelectedCategory] = useState('');
    const [tab, setTab] = useState('Question Bank')

    const { questions , setQuestions, saveQuestions } = useContext(QuestionContext);

    const SaveQuestions = () => {
        saveQuestions()
        console.log("hello")
        setReuseDialog(false);
    }
    
      
useEffect(() => {
    // Your code here to handle the updated questions state
    console.log("Questions updated:", questions);
}, [questions]); 

    const updateQuestion = (index, newOptions, questionText, explanationText, imageUrl, skill, difficulty, point) => {
        console.log(index)
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
    const deleteQuestion = (id) => {
        const updatedQuestions = questions.filter((_, index) => index !== id);
        setQuestions(updatedQuestions);
    };
        
    const handleCreateQuestion = (type) => {
        setCreateQuestion(type); // Set the type of question to create
    };
    const handleCloseQuestionCreator = () => {
        setCreateQuestion(null); // Close the QuestionCreator
    };
    
    const handleReuseDialog = () => {
        setReuseDialog(true); // Open the reuse dialog
    };

    const handleCloseReuseDialog = () => {
        setReuseDialog(false); // Close the reuse dialog
    };
    const deleteTopicHandler = ({ index }) => {
        const updatedTopics = [...topics];
        updatedTopics.splice(index, 1);
        setTopics(updatedTopics); 
    };
    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
    }


  return (
    <div className=' w-full h-full font-body border-black'>
        <MenuBar name={"Jawwad Ahmed Farid"} role={"Teacher"}/>
        <div className='w-auto md:h-full flex md:flex-row flex-col-reverse'>
            <SideBar active={"Add Questions"}/>
            <div className='w-full '>
                <Subheader name={"Add Questions"}/>
                <div className='flex flex-col-reverse md:flex-row justify-between gap-4 p-4'>
                    <div className='w-full flex flex-col items-center gap-4'>
                        <div className='w-full flex items-start justify-center gap-4'>
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
                                    <p className='text-xs'>True/False</p>
                                </button>
                            </div>
                        </div>
                        <div className='border-2 border-dotted border-slate-400'>
                            <button className='w-48 h-24 flex flex-col items-center justify-center border-2 border-white hover:border-DarkBlue hover:bg-LightBlue transition-colors duration-300' onClick={()=>setReuseDialog(true)}>
                                <MdOutlineSettingsBackupRestore className=' w-12 h-full'/>
                                <p className='text-xs'>Reuse Question(s) from Question Banks</p>
                            </button>
                        </div>
                        {
                        reuseDialog &&
                        <div className='fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-20 z-10 overflow-y-hidden'>       
                            <div className='relative inset-x-0 mx-auto top-10 w-11/12 md:w-7/12 h-5/6 overflow-y-auto bg-LightBlue z-10'>
                                <div className='sticky top-0 bg-DarkBlue h-12 w-full flex text-white justify-between z-50'>
                                    <h3 className='my-auto ml-2'>Select Questions to add</h3>
                                    <button className='mr-2' onClick={()=>setReuseDialog(false)}><MdClose className='text-lg'/></button>
                                </div>
                                <div>
                                    <div className='p-4 md:pl-4 md:pt-4 flex flex-col gap-4 '>
                                        <div className='w-full flex items-center justify-between md:justify-start md:gap-4 pb-2 border-b-2 border-grey-800'>
                                            <div className=''>
                                                <SubmitButton label = "All Questions" icon = {<GrStorage/>} active={tab == 'All Questions'} onClick={()=>{setTab("All Questions")}}/>
                                            </div>
                                            <div>
                                                <SubmitButton label = "Question Bank" icon={<FaFolderOpen />} active={tab !== 'All Questions'} onClick={()=>{setTab("Question Bank")}}/>
                                            </div>
                                        </div>

                                        {
                                            tab == "Question Bank" ? 
                                            <QuestionBankSelection/> :
                                            // <AllQuestions/>
                                            (<div className='overflow-y-hidden p-4 flex flex-col gap-4'>
                                            <div className='flex gap-4 mb-4'>
                                                <div className='flex flex-col md:flex-row items-center'>
                                                    <p className='text-xs'>Skill Targeted :&nbsp; </p>
                                                    <SkillFilter selectedSkill={selectedSkill} setSelectSkill={setSelectedSkill}/>
                                                </div>
                                                <div className='flex flex-col md:flex-row items-center'>
                                                    <p className='text-xs'>Difficulty :&nbsp;</p>
                                                    <div className="md:h-6 text-xs h-6 bg-LightBlue border border-black rounded-md hover:border-gray-400 ">
                                                        <select
                                                            value={selectedCategory}
                                                            onChange={(e) => handleSelectCategory(e.target.value)}
                                                            className='outline-none bg-LightBlue rounded-md h-5'
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
                                        
                                            {
                                                questions.map((question, index)=> {
                                                    return <DisplayOnlyQuestions skill={question.skill} difficulty={question.difficulty} point={question.point} question={question.question} explanation={question.explanation} options={question.options} image={question.imageUrl}/>
                                                })
                                            }
                                        </div>)
                                        }
                                    </div>               
                                </div>
                                <div className='fixed border-t-2 border-black left-0 bottom-0 w-full h-12 bg-LightBlue flex justify-center items-center text-white'>
                                    <button className='bg-DarkBlue rounded-md px-2 py-1 min-w-16' onClick={SaveQuestions}>Save ({8})</button>
                                </div>
                            </div>
                        </div>
                        }

                        {
                            creatingQuestion && (
                                <QuestionCreator
                                    type={creatingQuestion}
                                    closeHandler={handleCloseQuestionCreator}
                                    savingHandler={updateQuestion}
                                />
                            )
                        }
                        <div className='w-full flex flex-col gap-2'>
                        {
                            questions ?
                            questions.map((question, index)=> {
                                return <StoredQuestion deleteHandler={() => deleteQuestion(index)} savingHandler={updateQuestion} id={index} type={question.type} skill={question.skill} difficulty={question.difficulty} point={question.point} question={question.question} explanation={question.explanation} options={question.options} image={question.imageUrl}/>
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

             