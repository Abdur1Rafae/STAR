import React, {useState, useEffect, useContext} from 'react'
import SkillFilter from './SkillFilter'
import DifficultyFilter from './DifficultyFilter'
import TypeFilter from './TypeFilter'
import DisplayOnlyQuestions from './DisplayOnlyQuestions'
import { QuestionContext } from '../../Context/QuestionsContext'
import { GetReuseQuestions } from '../../APIS/Teacher/AssessmentAPI'
import TopicFilter from './TopicFilter'
import Loader from '../Loader'

const SelectQuestions = ({topics, adaptive}) => {
  const { reuseQuestions, setReuseQuestions } = useContext(QuestionContext);
  const { selectedQuestions, setSelectedQuestions } = useContext(QuestionContext);
  const [selectedSkill, setSelectedSkill] = useState('All')
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedType, setSelectedType] = useState(adaptive ? 'MCQ':'All')
  const [selectedTopic, setSelectedTopic] = useState('All')
  const [topicList, setTopicList] = useState(topics)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const GetQuestions = async() => {
      try {
        const res = await GetReuseQuestions({skill: selectedSkill, difficulty: selectedLevel, type: selectedType, topic: selectedTopic})
        console.log(res)
        setReuseQuestions([...res])
        setLoading(false)
      } catch(err) {
        console.log(err)
      }
    }

    GetQuestions()
  }, [selectedTopic, selectedSkill, selectedLevel, selectedType]);

  const handleAddQuestion = (question) => {
    const exists = selectedQuestions.findIndex(item => item._id === question._id);
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
      {
        loading ?
        <div className='w-full h-full flex justify-center items-center'>
        <Loader/>
        </div>
        :
        <>
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
                <TopicFilter topics={topicList} selectedTopic={selectedTopic} setSelectTopic={setSelectedTopic}/> 
            </div>
            <div className='flex flex-col md:flex-row items-center'>
                <p className='text-xs'>Type:&nbsp;</p>
                <TypeFilter selectedType={selectedType} setSelectType={setSelectedType} adaptive={adaptive}/> 
            </div>
        </div>
        <div className='mb-20 flex flex-col gap-4'>
        {
          reuseQuestions.length > 0 && reuseQuestions.map((question, index)=> {
            return <div key={index + question.question}><DisplayOnlyQuestions onChange={()=>handleAddQuestion(question)} isSelected={selectedQuestions.some(item => item._id == question._id)} correctOptions={question.correctOptions} isTrue={question.isTrue} type={question.type} skill={question.skill} difficulty={question.difficulty} point={question.points} question={question.question} explanation={question.explanation} options={question.options} image={question.image}/></div>
          })
        }
        </div>
        </>
      }        
    </div>
  )
}

export default SelectQuestions