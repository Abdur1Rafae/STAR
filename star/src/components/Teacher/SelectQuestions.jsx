import React, {useState, useEffect, useContext} from 'react'
import SkillFilter from './SkillFilter'
import DifficultyFilter from './DifficultyFilter'
import CategoryFilter from './CategoryFilter'
import TypeFilter from './TypeFilter'
import DisplayOnlyQuestions from './DisplayOnlyQuestions'
import { QuestionContext } from '../../Context/QuestionsContext'
import { GetReuseQuestions, GetAllTopics } from '../../APIS/Teacher/AssessmentAPI'
import TopicFilter from './TopicFilter'

const SelectQuestions = ({topics}) => {
  const { reuseQuestions, setReuseQuestions } = useContext(QuestionContext);
  const { selectedQuestions, setSelectedQuestions } = useContext(QuestionContext);
  const [selectedSkill, setSelectedSkill] = useState(null)
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedType, setSelectedType] = useState(null)
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [topicList, setTopicList] = useState(topics)

  useEffect(() => {
    const GetQuestions = async() => {
      try {
        const res = await GetReuseQuestions({skill: selectedSkill, difficulty: selectedLevel, type: selectedType, topic: selectedTopic})
        console.log(res)
        setReuseQuestions([...res])
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
                <TypeFilter selectedType={selectedType} setSelectType={setSelectedType}/> 
            </div>
        </div>
        <div className='mb-20 flex flex-col gap-4'>
        {
          reuseQuestions.length > 0 && reuseQuestions.map((question, index)=> {
            return <button className='text-left' key={index + question.question} onClick={()=>{handleAddQuestion(question)}}><DisplayOnlyQuestions isSelected={selectedQuestions.some(item => item._id == question._id)} correctOptions={question.correctOptions} isTrue={question.isTrue} type={question.type} skill={question.skill} difficulty={question.difficulty} point={question.points} question={question.question} explanation={question.explanation} options={question.options} image={question.imageUrl}/></button>
          })
        }
        </div>
        
    </div>
  )
}

export default SelectQuestions