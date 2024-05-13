import React, { useContext, useEffect, useState } from 'react';
import QuizImage from '../Student/question/QuizImage';
import HorizontalProgressBar from '../Student/course/HorizontalProgressBar';
import { SkillBox } from './StoredQuestion';
import { DifficultyBox } from './StoredQuestion';
import { PointBox } from './StoredQuestion';
import { ReportContent } from '../../Context/ReportContext';
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'

const QuesAnswithHorBars = ({ index, question }) => {
  const {questionStats} = useContext(ReportContent)

  const [options, setOptions] = useState(questionStats.options)

  useEffect(()=>{
    setOptions(questionStats.options)
  }, [questionStats])

  const modules = {
    toolbar: false
};
  

  function findIndexByProperty(value) {
    return options.findIndex(obj => obj['option'] === value);
  }

  return (
    <div className="flex-grow w-full p-2">
      <div className='flex gap-2 m-2 w-full'>
        <SkillBox skill={question.skill} />
        <DifficultyBox difficulty={question.difficulty} />
        <PointBox point={question.points} />
      </div>
      <div className="my-1">
        <div className='flex flex-col md:flex-row items-center'>
          {/* <span className='border border-black mr-0 md:mr-4 px-4 py-2 rounded-lg text-md font-bold text-DarkBlue'> {index + 1} </span> */}
          <ReactQuill readOnly={true} modules={modules} value={question?.question} className='w-full text-md'/>
        </div>
      </div>

      <div className=' md:flex justify-around gap-4'>
        
          {
            question.type == 'MCQ' ? 
            <>
            <div className="options flex-grow ">
            {question?.options &&
            question?.options.map((option, index) => (
              <div
                key={index}
                className={`max-md:text-xs flex items-center p-2 mb-2 bg-transparent transition duration-300`}
              >
                <div
                  className={`w-full min-h-10 rounded-md mr-2 flex items-center border border-black ${
                    question.correctOptions.includes(option) ? 'bg-green-300 ' : ''
                  }`}
                >
                  <div className="ml-2">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <div className='ml-4 '>&nbsp;{option}</div>
                </div>
                <div className='w-1/3 ml-2'><HorizontalProgressBar Score={options && options.length > 0 && findIndexByProperty(option)!=-1 ? Math.round(options[findIndexByProperty(option)].count/questionStats.totalResponses * 100): 0} Color='#EC5491' /></div>
              </div>
            ))}
            </div>
              {question.image && (
                <div className='md:w-1/4 mx-auto my-auto'>
                  <QuizImage imageUrl={question.image} />
                </div>
              )}
            </>
            :
            question.type== 'True/False' ?
            <div className='w-full'>
              <div
                className={`max-md:text-xs flex items-center p-2 mb-2 bg-transparent transition duration-300`}
              >
                <div
                  className={`w-full h-10 rounded-md mr-2 flex items-center border border-black ${
                    question.isTrue ? 'bg-green-300 ' : ''
                  }`}
                >
                  <div className="relative start-5 inset-y-0 flex">
                  </div>
                  <div className='relative start-10 inset-y-0'>&nbsp;True</div>
                </div>
                <div className='w-1/3 ml-2'><HorizontalProgressBar Score={options && options.length > 0 && findIndexByProperty("True")!=-1 ? Math.round(options[findIndexByProperty('True')].count/questionStats.totalResponses * 100) : 0} Color='#EC5491' /></div>
              </div>
              <div
              className={`max-md:text-xs flex items-center p-2 mb-2 bg-transparent transition duration-300`}
            >
              <div
                className={`w-full   h-10 rounded-md mr-2 flex items-center border border-black ${
                  !question.isTrue ? 'bg-green-300 ' : ''
                }`}
              >
                <div className="relative start-5 inset-y-0 flex">
                </div>
                <div className='relative start-10 inset-y-0'>&nbsp;False</div>
              </div>
              <div className='w-1/3 ml-2'><HorizontalProgressBar Score={options && options.length > 0 && findIndexByProperty("False")!=-1 ? Math.round(options[findIndexByProperty('False')].count/questionStats.totalResponses * 100) : 0} Color='#EC5491' /></div>
            </div>
              {question.image && (
                <div className='w-64 h-64 mx-auto my-auto'>
                  <QuizImage imageUrl={question.image} />
                </div>
              )}
            </div>
            :
            (question.image && (
              <div className='w-64 h-64 mx-auto my-auto'>
                <QuizImage imageUrl={question.image} />
              </div>
            ))
          }
      </div>
    </div>
  );
};

export default QuesAnswithHorBars;
