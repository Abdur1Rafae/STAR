import React from 'react'

const SkillFilter = ({selectedSkill, setSelectSkill}) => {
    const skills = ['Logic', 'Problem Solving', 'Quantitative Analysis', 'Critical Thinking'];
  return (
    <div className="text-sm flex justify-between items-center h-6">
        <div className="bg-LightBlue border border-black rounded-md hover:border-gray-400 h-6">
            <select
                value={selectedSkill}
                onChange={(e) => setSelectSkill(e.target.value)}
                className='outline-none bg-LightBlue rounded-md h-5 flex'
            >
                {skills.map((skill, index) => (
                    <option key={index} value={skill} className='flex'>
                        {skill}
                    </option>
                ))}
                
            </select>

        </div>
    </div>
  )
}

export default SkillFilter