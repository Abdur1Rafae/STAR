import React from 'react'

const HorizontalProgressBar = ({Skill, Score, Color}) => {
  return (
    <div className=''>
        <div className='flex w-full justify-between mb-1'>
            <h2 className='text-gray-600 text-xs'>{Skill}</h2>
            <h2 className='text-xs font-medium'>{Score}/100</h2>
        </div>
        <div class="w-full bg-gray-200 h-4 dark:bg-gray-700">
            <div class={`h-4 rounded-r-md`} style={{ width: `${Score}%`, background: `${Color}`}}></div>
        </div>
    </div>
  )
}

export default HorizontalProgressBar