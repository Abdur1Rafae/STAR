import React from 'react'

const DifficultyFilter = ({selectedLevel, setSelectLevel, assigning}) => {
    const difficulty = ['Easy', 'Medium', 'Hard'];
  return (
    <div className="text-sm flex justify-between items-center h-6">
        <div className="bg-LightBlue border border-black rounded-md hover:border-gray-400 h-6">
            <select
                value={selectedLevel}
                onChange={(e) => setSelectLevel(e.target.value)}
                className='outline-none bg-LightBlue rounded-md h-5 flex'
            >
                {
                    !assigning ? 
                    <option key={"All"} value={"All"} className='flex'>
                        All
                    </option>
                        :
                        ''
                }                

                {difficulty.map((level, index) => (
                    <option key={index} value={level} className='flex'>
                        {level}
                    </option>
                ))}
                
            </select>

        </div>
    </div>
  )
}

export default DifficultyFilter