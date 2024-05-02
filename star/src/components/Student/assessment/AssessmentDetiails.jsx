import React from 'react'

const AssessmentDetiails = ({questionCount, duration, submissionTime, skills}) => {
    console.log(skills)
  return (
    <div className='bg-LightBlue w-full mb-4 md:mb-0 md:w-72 h-auto py-2 px-4 drop-shadow-md'>
        <h3 className='font-medium text-sm font-body'>Assessment Details</h3>
        <div className='mt-2 w-full'>
            <div className='flex text-xs font-body w-full justify-between'>
                <h4 className='font-medium w-24'>Questions:</h4>
                <div className='w-40 flex justify-center'>{questionCount}</div>
            </div>
            <div className='flex text-xs mt-2 font-body justify-between'>
                <h4 className='font-medium w-24'>Duration:</h4>
                <div className='w-40 flex justify-center'>{duration} mins</div>
            </div>
            <div className='flex text-xs mt-2 font-body justify-between'>
                <h4 className='font-medium w-24'>Taken On:</h4>
                <div className='w-40 flex justify-center'>{submissionTime}</div>
            </div>
        </div>

        <div className='w-full border-[1px] border-black mt-4 mb-4'></div>

        <h3 className='font-medium text-sm font-body'>Skills Targetted</h3>
        <div className='w-full flex flex-wrap pt-2 gap-2 font-medium'>
            {
                skills.map((skill) => {
                    return (
                        <div className='w-auto h-8 bg-[#D9EBFF] text-xs p-2 rounded-lg'>
                            {skill}
                        </div>
                    )
                })
            }
        </div>

        <div className='w-full border-[1px] border-black mt-4 mb-4'></div>

        <h3 className='font-medium text-sm font-body'>Recommendation</h3>
        <div className='w-full h-auto text-xs text-gray-500'>
            Review and practice the following concepts:
            Turing Machine, Number Systems
        </div>
    </div>
  )
}

export default AssessmentDetiails