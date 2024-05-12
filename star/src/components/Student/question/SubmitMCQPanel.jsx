import React from 'react';
import { GrRadialSelected } from "react-icons/gr";
import QuizImage from './QuizImage';
import SubmitButton from '../../button/SubmitButton';
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'

const SubmitMCQPanel = ({ question  , next, previous, fwd, bkd}) => {
  const modules = {
    toolbar: false
  };

  return (
    <div className="bg-LightBlue flex-grow w-full mx-auto p-4 shadow-md rounded-md">
      <div className="">
      </div>
      {
        question?.questionId.image ? 
        <div className='w-32 h-32 mx-auto mt-4 mb-2'><QuizImage imageUrl={question?.questionId.image} /></div>
        : ''
      }
      <div className="mb-4">
        <div className='flex justify-between  w-full'>
          <ReactQuill readOnly={true} modules={modules} value={question?.questionId.question} className='w-full text-md select-none'/>
        </div>
      </div>

      <div className="options">
        {
          question.questionId.type == "MCQ" ? 
          (question?.questionId.options &&
            question?.questionId.options.map((option, index) => (
              <div
                key={index}
                className={`flex  items-center justify-center p-2 mb-2 bg-transparent cursor-pointer hover:bg-gray-100 transition duration-300`}
              >
                <div
                  className={`min-h-10 rounded-md mr-2 flex items-center border-2 ${
                    question?.questionId.correctOptions.includes(option) ? 'bg-green-300' : '' 
                  }`}
                
                >
                  <div class="ml-2 ">
                  {question.answer.includes(option) ? <GrRadialSelected/> : String.fromCharCode(65 + index)}   </div>
  
                  <div className='ml-4 '>&nbsp;{option}</div>
                </div>
              </div>
            )))
            :
            question.questionId.type == "True/False" ?
            <>
            <div
                className={`flex  items-center justify-center p-2 mb-2 bg-transparent cursor-pointer hover:bg-gray-100 transition duration-300`}
              >
                <div
                  className={`w-80 h-10 rounded-md mr-2 flex items-center border-2 ${
                    question?.questionId.isTrue ? 'bg-green-300' : '' 
                  }`}
                
                >
                  <div class="ml-2 ">
                  {question.answer.includes("True") ? <GrRadialSelected/> : ''}   </div>
  
                  <div className='ml-4 '>&nbsp;True</div>
                </div>
              </div>
              <div
                className={`flex  items-center justify-center p-2 mb-2 bg-transparent cursor-pointer hover:bg-gray-100 transition duration-300`}
              >
                <div
                  className={`w-80 h-10 rounded-md mr-2 flex items-center border-2 ${
                    !question?.questionId.isTrue ? 'bg-green-300' : '' 
                  }`}
                
                >
                  <div class="ml-2 ">
                  {question.answer.includes("False") ? <GrRadialSelected/> : ''}   </div>
  
                  <div className='ml-4 '>&nbsp;False</div>
                </div>
              </div>
            </>
            :
            <p>
              {question.answer[0]}
            </p>
        }
        
      </div>

      {question.questionId.explanation &&
      <div class="overflow-y-auto h-32 border-black border-[1px] p-2">
        <h2 className="text-l font-bold">Explanation</h2>

        <p className='text-sm font-light'>
            {question.questionId.explanation}
          </p>
        </div>
}
        <div className="flex items-center justify-between mt-2">
        <SubmitButton label="Previous" onClick={previous} active={bkd}/>
        <SubmitButton label="Next" onClick={next} active={fwd}/>
      </div>

    </div>
  );
};

export default SubmitMCQPanel;