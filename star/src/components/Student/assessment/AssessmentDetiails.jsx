import React from 'react'

const AssessmentDetiails = ({questionCount, duration, submissionTime, skills, skillMap, topicMap}) => {
    const generateFeedback = () => {
        let feedback = "\n";
        let underperformingTopics = [];
        let underperformingSkills = [];
      
        // Check topics
        for (const topic in topicMap) {
          const topicPerformance = (topicMap[topic].correct / topicMap[topic].totalCount) * 100;
          if (topicPerformance < 60) {
            underperformingTopics.push(topic);
          }
        }
      
        // Check skills
        for (const skill in skillMap) {
          const skillPerformance = (skillMap[skill].correct / skillMap[skill].totalCount) * 100;
          if (skillPerformance < 60) {
            underperformingSkills.push(skill);
          }
        }
      
        if (underperformingTopics.length > 0) {
          feedback += "You struggle in the following topics: " + underperformingTopics.join(", ") + ". Please revise them.\n";
        }
      
        if (underperformingSkills.length > 0) {
          feedback += "You need to work on the following skills: " + underperformingSkills.join(", ") + ".\n";
        }
      
        return feedback === "Feedback:\n" ? "No feedback generated" : feedback;
      };
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
            {generateFeedback()}
        </div>
    </div>
  )
}

export default AssessmentDetiails