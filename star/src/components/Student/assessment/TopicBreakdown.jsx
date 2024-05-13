import React from 'react'
import TopicDropDown from './TopicDropDown'

const TopicBreakdown = ({topics}) => {
  return (
    <div className='w-full h-auto bg-LightBlue md:mb-0 mb-4 drop-shadow-md px-4 py-2'>
        <h3 className='font-medium text-sm font-body mb-4 md:mb-2'>Topic Breakdown</h3>
        {
          Object.keys(topics).map((topic)=>{
            return (
              <TopicDropDown topic={topic} correct={topics[topic].correct} total={topics[topic].totalCount} score={Math.round(topics[topic].correct/topics[topic].totalCount * 100)}/>
            )
          })
        }
    </div>
  )
}

export default TopicBreakdown