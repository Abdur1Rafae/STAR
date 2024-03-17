import React ,{ useState }from 'react';
import MenuBar from '../../components/MenuBar'
import SideBar from '../../components/Teacher/SideBar'
import Subheader from '../../components/Teacher/Subheader'
import { MdOutlineSettingsBackupRestore } from 'react-icons/md';
import { DoughnutGraph } from '../../components/Teacher/DoughnutGraph';
import questionMCQ from '../../components/MCQ.png'
import TFQuestion from '../../components/TF.png'
import SAQuestion from '../../components/shortAnswer.png'
import StoredQuestion from '../../components/Teacher/StoredQuestion';



function AddQuestions() {
    const [topics, setTopics] = useState([{name: "Differentiation", value: 8}, {name: "Integration", value: 5}, {name: "History of Computers", value: 12}])
    const skills = ["Problem Solving", "Logic Design", "Quantitative Analysis", "Critical Thinking"]
    const [creatingQuestion, setCreateQuestion] = useState(null);
    const [reuseDialog, setReuseDialog] = useState(false);
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
    <div className=' w-full h-full font-body  border border-black '>
        <MenuBar name={"Jawwad Ahmed Farid"} role={"Teacher"}/>
        <div className='w-auto md:h-full flex md:flex-row flex-col-reverse'>
            <SideBar active={"Add Questions"}/>
            <div className='w-full '>
                <Subheader name={"Add Questions"}/>
                <div className='flex flex-col-reverse md:flex-row justify-between gap-4 p-4'>
                    <div className='w-full flex flex-col items-center gap-4'>
                        <div className='w-full flex items-start justify-center gap-4'>
                            <div className='border-2 border-dotted border-slate-400'>
                            <button className='w-24 h-24 flex flex-col items-center justify-center gap-1 border-2 border-white hover:border-DarkBlue hover:bg-LightBlue transition-colors duration-300' onClick={()=>setCreateQuestion("Multiple Choice Question")}>
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
                        <div className='w-full flex flex-col gap-2'>
                        {
                            questions.map((question, index)=> {
                                return <StoredQuestion savingHandler={updateQuestion} id={index} type={question.type} skill={question.skill} difficulty={question.difficulty} point={question.point} question={question.question} explanation={question.explanation} options={question.options} image={question.imageUrl}/>
                            })
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
