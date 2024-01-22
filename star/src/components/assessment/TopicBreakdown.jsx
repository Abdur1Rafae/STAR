import React from 'react'
import TopicDropDown from './TopicDropDown'

const TopicBreakdown = () => {
  return (
    <div className='w-full h-auto bg-LightBlue md:mb-0 mb-4 drop-shadow-md px-4 py-2'>
        <h3 className='font-medium text-sm font-body mb-4 md:mb-2'>Topic Breakdown</h3>
        <TopicDropDown topic={"Number Systems kni iuefiuer uewfihru iuefiu iuefihe"} score={76}/>
        <TopicDropDown topic={"Operating Systems"} score={100}/>
    </div>
  )
}

export default TopicBreakdown