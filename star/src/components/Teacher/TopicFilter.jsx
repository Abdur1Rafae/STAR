import React from 'react'

const TopicFilter = ({selectedTopic, setSelectTopic, topics}) => {
  return (
    <div className="text-sm flex justify-between items-center h-6">
        <div className="bg-LightBlue border border-black rounded-md hover:border-gray-400 h-6">
            <select
                value={selectedTopic}
                onChange={(e) => setSelectTopic(e.target.value)}
                className='outline-none bg-LightBlue rounded-md h-5 flex'
            >
                <option key={"All"} value={"All"} className='flex'>
                    All
                </option>
                {topics.map((topic, index) => (
                    <option key={index} value={topic} className='flex'>
                        {topic}
                    </option>
                ))}
                
            </select>

        </div>
    </div>
  )
}

export default TopicFilter