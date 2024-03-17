import React, {useEffect, useState} from 'react';
import MCQPanel from '../../components/Student/question/MCQPanel';
import SubmitButton from '../../components/button/SubmitButton';
import QuizNavigation from '../../components/Student/quiz/QuizNavigation';
import TrueFalse from '../../components/Student/question/TrueFalsePanel';
import TextAnswerPanel from '../../components/Student/question/TextAnswerPanel';
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
      <div className="">
        <div className="quiz-screen p-4 w-full">
          <div className="flex justify-between mb-8">
            {
              questions[currentQuestionIndex].type == "MCQ" ? 
              <MCQPanel
                  question={questions[currentQuestionIndex]}
                  onOptionSelect={handleOptionSelect}
                  Flagged={questions[currentQuestionIndex].flagged}
                />
                :
                questions[currentQuestionIndex].type == "SA" ? 
                <TextAnswerPanel
                  question={questions[currentQuestionIndex]}
                  onOptionSelect={handleOptionSelect}
                  Flagged={questions[currentQuestionIndex].flagged}
                />
                :
                <TrueFalse
                  question={questions[currentQuestionIndex]}
                  onOptionSelect={handleOptionSelect}
                  Flagged={questions[currentQuestionIndex].flagged}
                />
            }
          </div>

          
          <div className={`fixed sm:w-full h-12 border-black border-t-[1px] border-r-[1px] bottom-0 left-0 right-0 bg-white p-4 flex justify-between items-center`}>
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
        <div className={`z-10 fixed top-28 right-0 transition-all ease-out duration-500 ${showNav ? 'w-[16.1rem]' : 'w-0'}`}>
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
