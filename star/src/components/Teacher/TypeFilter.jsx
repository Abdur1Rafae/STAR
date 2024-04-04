import React from 'react'

const TypeFilter = ({selectedType, setSelectType}) => {
    const type = ['Multiple Choice Question', 'True/False', 'Short Anwer'];
  return (
    <div className="text-sm flex justify-between items-center h-6">
        <div className="bg-LightBlue border border-black rounded-md hover:border-gray-400 h-6">
            <select
                value={selectedType}
                onChange={(e) => setSelectType(e.target.value)}
                className='outline-none bg-LightBlue rounded-md h-5 flex'
            >
                {type.map((type, index) => (
                    <option key={index} value={type == "Multiple Choice Question" ? "MCQ" : type == "True/False" ? "TF" : "SA"} className='flex'>
                        {type}
                    </option>
                ))}
                
            </select>

        </div>
    </div>
  )
}

export default TypeFilter