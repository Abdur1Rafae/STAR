import React from 'react'

const HorizontalProgressBar = ({Skill, Score, Color, cond}) => {
  return (
    <div className=''>
      <div className='flex w-full justify-between mb-1'>
        <h2 className='text-gray-600 text-xs'>{Skill}</h2>
      </div>
      <div className={`w-full bg-gray-200 ${cond ? 'h-2' : 'h-4'} dark:bg-gray-700 flex gap-2`}>
        <div className={`${cond ? 'h-2' : 'h-4'} rounded-r-md`} style={{ width: `${Score}%`, background: `${Color}`}}></div>
      </div>
      <h2 className='text-xs font-medium'>{Score}%</h2>
    </div>
  )
}

export default HorizontalProgressBar