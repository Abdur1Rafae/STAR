import React, { useState } from 'react'
import DisplayOnlyQuestions from './DisplayOnlyQuestions';

const TopicContainer = ({index ,topic, toBeEdited, selfDelete}) => {

  return (
    <div className={`flex flex-col gap-2 transition-all ease-out duration-500`}>
        {
            questions.map((question, index)=> {
                return <DisplayOnlyQuestions id={index} type={question.type} skill={question.skill} difficulty={question.difficulty} point={question.point} question={question.question} explanation={question.explanation} options={question.options} image={question.imageUrl}/>
            })
        }
    </div>
  )
}

export default TopicContainer