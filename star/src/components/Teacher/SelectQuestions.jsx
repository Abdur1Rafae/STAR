import React, {useState, useEffect, useContext} from 'react'
import SkillFilter from './SkillFilter'
import DifficultyFilter from './DifficultyFilter'
import TypeFilter from './TypeFilter'
import DisplayOnlyQuestions from './DisplayOnlyQuestions'
import { QuestionContext } from '../../Context/QuestionsContext'

const SelectQuestions = () => {
    const { reuseQuestions, setReuseQuestions } = useContext(QuestionContext);
    
    const [filteredQuestions, setFilteredQuestions] = useState(reuseQuestions)
    const [selectedSkill, setSelectedSkill] = useState('')
    const [selectedLevel, setSelectedLevel] = useState('');
    const [selectedType, setSelectedType] = useState('')

    useEffect(()=> {
        setReuseQuestions([...AllQuestions])
    }, [])

    useEffect(() => {
        const filtered = reuseQuestions.filter(question => {
            const skillMatch = selectedSkill !== '' && "All" ? question.skill === selectedSkill : true;
            const levelMatch = selectedLevel !== '' && "All" ? question.difficulty === selectedLevel : true;
            const typeMatch = selectedType !== '' && "All" ? question.type === selectedType : true;
            return skillMatch && levelMatch && typeMatch;
        });
        setFilteredQuestions(filtered);
    }, [reuseQuestions, selectedSkill, selectedLevel, selectedType]);

    //self note: useEffect will make an api call to set this array
    const AllQuestions = [{
        type: "MCQ",
        reuse: true,
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
        type: "MCQ",
        reuse: true,
        question: "Who developed the theory of ACDC?",
        options: [
          { text: "Isaac Newton", isCorrect: false },
          { text: "Albert Einstein", isCorrect: true },
          { text: "Stephen Hawking", isCorrect: false },
          { text: "Galileo Galilei", isCorrect: false }
        ],
        imageUrl: null,
        explanation: "Albert Einstein developed the theory of relativity.",
        skill: "Physics",
        difficulty: "Hard",
        point: 20
      },
      {
        type: "MCQ",
        reuse: true,
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
        point: 20.
      }]

    const handleAddQuestion = (question) => {
        const exists = reuseQuestions.findIndex(item => item.question === question.question);
        if(exists !== -1) {
            const updatedQuestions = [...reuseQuestions];
            updatedQuestions.splice(exists, 1);
            setReuseQuestions(updatedQuestions);
        }
        else {
            setReuseQuestions([...reuseQuestions, question])
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
                return <button onClick={()=>{handleAddQuestion(question)}}><DisplayOnlyQuestions isSlected={reuseQuestions.some(item => item.question == question.question)} type={question.type} skill={question.skill} difficulty={question.difficulty} point={question.point} question={question.question} explanation={question.explanation} options={question.options} image={question.imageUrl}/></button>
            })
        }
        
    </div>
  )
}

export default SelectQuestions