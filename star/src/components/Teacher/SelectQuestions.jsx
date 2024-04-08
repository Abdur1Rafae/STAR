import React, {useState, useEffect, useContext} from 'react'
import SkillFilter from './SkillFilter'
import DifficultyFilter from './DifficultyFilter'
import TypeFilter from './TypeFilter'
import DisplayOnlyQuestions from './DisplayOnlyQuestions'
import { QuestionContext } from '../../Context/QuestionsContext'
import { GetReuseQuestions } from '../../APIS/Teacher/AssessmentAPI'

const SelectQuestions = () => {
    const { reuseQuestions, setReuseQuestions } = useContext(QuestionContext);
    const { selectedQuestions, setSelectedQuestions } = useContext(QuestionContext);
    const [filteredQuestions, setFilteredQuestions] = useState(reuseQuestions)
    const [selectedSkill, setSelectedSkill] = useState(null)
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [selectedType, setSelectedType] = useState(null)
    const [selectedTopic, setSelectedTopic] = useState(null)

    useEffect(() => {
      // const filtered = reuseQuestions.filter(question => {
      //   const skillMatch = selectedSkill !== '' && selectedSkill !== "All" ? question.skill === selectedSkill : true;
      //   const levelMatch = selectedLevel !== '' && selectedLevel !== "All" ? question.difficulty === selectedLevel : true;
      //   const typeMatch = selectedType !== '' && selectedType !== "All" ? question.type === selectedType : true;
      //   return skillMatch && levelMatch && typeMatch;
      // });
      //setFilteredQuestions(filtered);
      const GetQuestions = async() => {
        try {
          const res = await GetReuseQuestions({skill: selectedSkill, difficulty: selectedLevel, type: selectedType, topic: selectedTopic})
          console.log(res)
        } catch(err) {
          console.log(err)
        }
        setReuseQuestions([...AllQuestions])
      }

      GetQuestions()
    }, []);
    // reuseQuestions, selectedSkill, selectedLevel, selectedType

    //self note: useEffect will make an api call to set this array
    const AllQuestions = [{
        _id: null,
        type: "Multiple Choice Question",
        reuse: true,
        question: "Who developed the theory of relativity?",
        options: ["Isaac Newton","Albert Einstein","Stephen Hawking","Galileo Galilei"],
        correctOptions: ["Albert Einstein"],
        imageUrl: "https://scitechdaily.com/images/Theory-of-Relativity-Physics-Concept.jpg",
        explanation: "Albert Einstein developed the theory of relativity.",
        skill: "Physics",
        difficulty: "Hard",
        point: 20
      },
      {
        type: "True/False",
        reuse: true,
        question: "You are alive.",
        options: ["True", "False"],
        correctOptions: [],
        isTrue: true,
        imageUrl: null,
        explanation: "Stephen Hawking developed the theory of relativity.",
        skill: "Physics",
        difficulty: "Hard",
        point: 20
      },
      {
        type: "Short Answer",
        reuse: true,
        question: "Tell me about yourself",
        correctOptions:[],
        options: [],
        imageUrl: null,
        explanation: "",
        skill: "Physics",
        difficulty: "Hard",
        point: 20.
      }]

  const handleAddQuestion = (question) => {

    const exists = selectedQuestions.findIndex(item => item.question === question.question);
    if(exists !== -1) {
      const updatedQuestions = [...selectedQuestions];
      updatedQuestions.splice(exists, 1);
      setSelectedQuestions([...updatedQuestions]);
    }
    else {
      setSelectedQuestions([...selectedQuestions, question])
    }
  }

  return (
    <div className='p-4 flex flex-col gap-4'>
        <div className='flex flex-wrap gap-4 mb-4'>
            <div className='flex flex-col md:flex-row items-center'>
                <p className='text-xs'>Skill:&nbsp; </p>
                <SkillFilter selectedSkill={selectedSkill} setSelectSkill={setSelectedSkill}/>
            </div>
            <div className='flex flex-col md:flex-row items-center'>
                <p className='text-xs'>Difficulty:&nbsp;</p>
                <DifficultyFilter selectedLevel={selectedLevel} setSelectLevel={setSelectedLevel}/> 
            </div>
            <div className='flex flex-col md:flex-row items-center'>
                <p className='text-xs'>Topic:&nbsp;</p>
                <DifficultyFilter selectedLevel={selectedLevel} setSelectLevel={setSelectedLevel}/> 
            </div>
            <div className='flex flex-col md:flex-row items-center'>
                <p className='text-xs'>Type:&nbsp;</p>
                <TypeFilter selectedType={selectedType} setSelectType={setSelectedType}/> 
            </div>
        </div>
    
        {
            filteredQuestions.map((question, index)=> {
              return <button key={question.question} onClick={()=>{handleAddQuestion(question)}}><DisplayOnlyQuestions isSlected={selectedQuestions.some(item => item.question == question.question)} type={question.type} skill={question.skill} difficulty={question.difficulty} point={question.point} question={question.question} explanation={question.explanation} options={question.options} image={question.imageUrl}/></button>
            })
        }
        
    </div>
  )
}

export default SelectQuestions