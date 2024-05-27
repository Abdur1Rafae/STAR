import React from 'react'

const TypeFilter = ({selectedType, setSelectType, adaptive}) => {
    const type = ['Multiple Choice Question', 'True/False', 'Short Anwer'];
  return (
    <div className="text-sm flex justify-between items-center h-6">
        <div className="bg-LightBlue border border-black rounded-md hover:border-gray-400 h-6">
            <select
                value={selectedType}
                onChange={(e) => setSelectType(e.target.value)}
                className='outline-none bg-LightBlue rounded-md h-5 flex'
            >
                {
                    adaptive ? 
                    <></>
                    :
                    <option key={"All"} value={"All"} className='flex'>
                        All
                    </option>
                }
                {type.map((type, index) => (
                    (
                        index < 2 && adaptive &&
                        <option key={index} value={type == "Multiple Choice Question" ? "MCQ" : type == "True/False" ? "True/False" : "Short Answer"} className='flex'>
                            {type}
                        </option>
                    )
                ))}
                
            </select>

        </div>
    </div>
  )
}

export default TypeFilter