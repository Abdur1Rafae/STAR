import React, {useEffect, useState} from 'react';
import MCQPanel from '../../components/Student/question/MCQPanel';
import SubmitButton from '../../components/button/SubmitButton';
import QuizNavigation from '../../components/Student/quiz/QuizNavigation';
import TrueFalse from '../../components/Student/question/TrueFalsePanel';
import TextAnswer from '../../components/Student/question/TextAnswerPanel';
import MenuBar from '../../components/MenuBar';
import QuizSubheader from '../../components/Student/quiz/QuizSubheader';
import { ToggleStore } from '../../Stores/ToggleStore';
import QuizStore from '../../Stores/QuizStore';

const QuizScreen = () => {
  const showNav = ToggleStore((store) => store.showNav);

  const quizStore = QuizStore();

  const { questions, currentQuestionIndex } = quizStore;

  const handleOptionSelect = (selectedOption) => {
    // Logic to handle option selection
  };

  const handleNextQuestion = () => {
    quizStore.nextQuestion()
  };

  const handlePrevious = () => {
    quizStore.prevQuestion()
  };

  return (
    <div className='flex flex-col w-screen lg:w-full'>
      <MenuBar name={"Maaz Shamim"} role={"Student"}/>
      <QuizSubheader/>
      <div className="flex">
        <div className="quiz-screen p-4 w-screen">
          <div className="flex justify-between mb-4">
                <MCQPanel
                  question={questions[currentQuestionIndex]}
                  onOptionSelect={handleOptionSelect}
                />
            

              {/* <TrueFalse question={questions[currentQuestion]}
                options={questions[currentQuestion]?.choices}
                onAnswerSelect={handleOptionSelect}
                currentQuestion={currentQuestion}
                totalQuestions={questions.length}/> */}

                  {/* <TextAnswer question={questions[currentQuestion]}
                options={questions[currentQuestion]?.choices}
                currentQuestion={currentQuestion}
                totalQuestions={questions.length} /> */}
          </div>

          
          <div className={`fixed sm:w-full h-12 border-black border-t-[1px] border-r-[1px] bottom-0 left-0 right-0 bg-white p-4 flex justify-between items-center transition-all ease-out duration-500 ${showNav ? 'md:w-[calc(100%_-_16rem)]' : 'w-full'}`}>
            <div className="mb-0">
              <p className="text-md md:text-lg font-semibold">
                Question {currentQuestionIndex + 1} out of {questions.length}
              </p>
            </div>

            <div className="flex items-center space-y-0 space-x-4">
                <SubmitButton label="Previous" onClick={handlePrevious} active={false} />
                <SubmitButton label="Next" onClick={handleNextQuestion} active={true}/>
            </div>
          </div>

        </div>
        <div className={`h-screen z-10 absolute md:sticky md:top-0 right-0 border-l-[1px] border-black bg-LightBlue transition-all ease-out flex-shrink duration-500 ${showNav ? 'w-[16.1rem]' : 'w-0'}`}>
          <div className={`transition-all ease-out duration-500 ${showNav ? 'sm:w-36 md:w-[15.9rem]' : 'w-0'} flex items-start justify-around`}>
            {(
              <>
                <QuizNavigation/>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
