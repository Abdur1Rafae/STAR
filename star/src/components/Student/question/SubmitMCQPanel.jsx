import React from 'react';
import QuizImage from './QuizImage';
import SubmitButton from '../../button/SubmitButton';

const SubmitMCQPanel = ({ question  , isexplanation = true}) => {

  return (
    <div className="bg-LightBlue flex-grow w-full mx-auto p-4 shadow-md rounded-md">
      <div className="">
        <div className="border-t border-black border-2 mt-2"></div>
      </div>
      {
        question.imageUrl !== null ? 
        <div className='w-32 h-32 mx-auto mt-4 mb-2'><QuizImage imageUrl={question?.imageUrl} /></div>
        : ''
      }
      <div className="mb-4">
        <div className='flex justify-between'>
          <p className="text-md">{question?.question}</p>
        </div>
        <div className="border-t border-black border-2 mt-2"></div>
      </div>

      <div className="options">
        {question?.options &&
          question?.options.map((option, index) => (
            <div
              key={index}
              className={`flex  items-center justify-center p-2 mb-2 bg-transparent cursor-pointer hover:bg-gray-100 transition duration-300`}
            >
              <div
                className={`w-80 h-10 rounded-md mr-2 flex items-center justify-between border-2 ${
                  question.correctOptions.includes(option) ? 'bg-green-500' : 'bg-red-400' 
                }`}
              
              >
                <div class="relative start-5 inset-y-0 flex ">
                {String.fromCharCode(65 + index)}   </div>

                <div className='relative end-32'>&nbsp;{option}</div>
              </div>
            </div>
          ))}
      </div>

      {isexplanation &&
      <div class="overflow-y-auto h-32 border-black border-[1px] p-2">
        <h2 className="text-l font-bold">Explanation</h2>

        <p className='text-sm font-light'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            tincidunt, nisl eget vestibulum rhoncus, elit elit consectetur
            lectus, quis consectetur nunc elit sed lorem. Donec euismod
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            tincidunt, nisl eget vestibulum rhoncus, elit elit consectetur
            lectus, quis consectetur nunc elit sed lorem. Donec euismod
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            tincidunt, nisl eget vestibulum rhoncus, elit elit consectetur
            lectus, quis consectetur nunc elit sed lorem. Donec euismodLorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            tincidunt, nisl eget vestibulum rhoncus, elit elit consectetur
            lectus, quis consectetur nunc elit sed lorem. Donec euismod
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            tincidunt, nisl eget vestibulum rhoncus, elit elit consectetur
            lectus, quis consectetur nunc elit sed lorem. Donec euismod
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            tincidunt, nisl eget vestibulum rhoncus, elit elit consectetur
            lectus, quis consectetur nunc elit sed lorem. Donec euismod
          </p>
        </div>
}
        <div className="flex items-center justify-between mt-2">
        <SubmitButton label="Previous" />
        <SubmitButton label="Next" />
      </div>

    </div>
  );
};

export default SubmitMCQPanel;